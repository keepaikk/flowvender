
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProductDescription(productName: string, features: string[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a compelling, professional e-commerce product description for a product named "${productName}" with these features: ${features.join(', ')}. Highlight that it is a high-quality product suitable for the Flow Vendor Market platform, with an emphasis on "Made in Ghana" excellence if applicable.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Failed to generate description. Please try again later.";
  }
}

export async function getRecommendedProducts(category: string) {
    // This would typically involve sending user history/context to Gemini
    // For MVP, we return a structured prompt-based suggestion logic
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `List 3 trending product types for the ${category} category in a West African e-commerce market context.`,
    });
    return response.text;
  } catch (error) {
    return "Check our latest arrivals!";
  }
}
