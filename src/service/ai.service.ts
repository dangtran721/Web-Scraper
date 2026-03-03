import { GoogleGenAI } from "@google/genai";
import config from "../config/config";

const ai = new GoogleGenAI({
  apiKey: config.ai.apiKey,
});

const getSelectorByAI = async (
  cleanHtml: string,
  userRequirement: string,
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `You are a web scraping expert. 
           Based on this HTML structure: ${cleanHtml}
           Identify the specific CSS selector needed to extract the information for: "${userRequirement}".
           
           Rules:
           1. Return ONLY the CSS selector string (e.g., "h3.title", "div.price > span").
           2. Do not include any explanations, markdown, or extra text.
           3. If you cannot find a clear selector, return "NOT_FOUND".`,
  });

  return response.text;
};

export default { getSelectorByAI };
