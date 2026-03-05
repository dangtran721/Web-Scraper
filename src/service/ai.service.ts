import { GoogleGenAI } from "@google/genai";
import { aiConfig } from "~/config";
import config from "~/config/config";

const ai = new GoogleGenAI({
  apiKey: config.ai.apiKey,
});

const getSelectorByAI = async (
  cleanHtml: string,
  userRequirement: string,
): Promise<string> => {
  for (const modelName of aiConfig.MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: aiConfig.contentsInput(cleanHtml, userRequirement),
      });
      console.log(`Using: ${modelName}`);

      return response.text;
    } catch (error) {
      //Check error from model:
      if (error.status === 429 || error.status === 503) {
        console.warn(`Model ${modelName} blocked/overload. continue...`);
        continue;
      }
      // Check for wrong model code
      console.error(` Model ${modelName} is not exits (404).`);
      continue;
    }
  }
};

export default { getSelectorByAI };
