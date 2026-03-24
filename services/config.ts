// Frontend-safe env helpers (VITE_ prefix required for Vite)
export const CONFIG = {
  // API
  API_BASE: import.meta.env.VITE_API_BASE || '',
  POSTGRES_URL: import.meta.env.VITE_POSTGRES_URL || '',
  
  // WhatsApp vendor notification number
  VENDOR_WHATSAPP: import.meta.env.VITE_VENDOR_WHATSAPP || '233000000000',
  
  // MoMo payment numbers
  MTN_MOMO: import.meta.env.VITE_MTN_MOMO || '0531234567',
  VODAFONE_CASH: import.meta.env.VITE_VODAFONE_CASH || '0501234567',
  AIRTELTIGO_MONEY: import.meta.env.VITE_AIRTELTIGO_MONEY || '0271234567',
  
  // Admin
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123',
  
  // Gemini AI (optional)
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
};

export const log = (...args: unknown[]) => {
  if (CONFIG.DEBUG) console.log('[FlowVender]', ...args);
};
