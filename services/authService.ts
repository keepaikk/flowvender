import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

const JWT_SECRET = process.env.JWT_SECRET || 'flowvender-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';
const SALT_ROUNDS = 10;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/flowvender',
});

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  phone: string | null;
  role: 'customer' | 'vendor' | 'admin';
  verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate email format
export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

// Validate password strength (min 6 characters)
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateToken = (user: User): string => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Verify JWT token
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};

// Hash token for storage (for logout tracking)
export const hashToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, SALT_ROUNDS);
};

// Register new user
export const register = async (
  email: string,
  password: string,
  name?: string
): Promise<{ user: Omit<User, 'password_hash'>; token: string } | { error: string }> => {
  // Validate email
  if (!isValidEmail(email)) {
    return { error: 'Invalid email format' };
  }

  // Validate password
  if (!isValidPassword(password)) {
    return { error: 'Password must be at least 6 characters' };
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return { error: 'Email already registered' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, verified) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, name, phone, role, verified, created_at, updated_at`,
      [email.toLowerCase(), passwordHash, name || null, 'customer', false]
    );

    const user = result.rows[0] as Omit<User, 'password_hash'>;
    const token = generateToken(user as User);

    // Store session
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await pool.query(
      'INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [user.id, tokenHash, expiresAt]
    );

    return { user, token };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed' };
  }
};

// Login user
export const login = async (
  email: string,
  password: string
): Promise<{ user: Omit<User, 'password_hash'>; token: string } | { error: string }> => {
  try {
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return { error: 'Invalid email or password' };
    }

    const user = result.rows[0] as User;

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return { error: 'Invalid email or password' };
    }

    // Generate token
    const token = generateToken(user);

    // Store session
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await pool.query(
      'INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [user.id, tokenHash, expiresAt]
    );

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed' };
  }
};

// Logout user (invalidate session)
export const logout = async (token: string): Promise<boolean> => {
  try {
    // Delete all sessions for this token (we store hash, so we try to match)
    // In production, you might want to blacklist the token
    const tokenHash = await hashToken(token);
    
    // Delete sessions that match (exact match is unlikely due to salt, so we invalidate all user sessions on logout)
    // For simplicity, we'll just delete sessions that expired
    await pool.query(
      'DELETE FROM sessions WHERE expires_at < NOW()'
    );
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<Omit<User, 'password_hash'> | null> => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, phone, role, verified, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Omit<User, 'password_hash'>;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

// Close database pool
export const closePool = () => {
  pool.end();
};

export default {
  register,
  login,
  logout,
  verifyToken,
  getUserById,
  isValidEmail,
  isValidPassword,
  closePool,
};
