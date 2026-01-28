
import { GoogleGenAI, Type } from "@google/genai";
import { KnowledgeEntry, Language } from "../types";

const API_KEY = process.env.API_KEY || '';

export const processTranscriptToKnowledge = async (transcript: string, language: Language = 'en'): Promise<Partial<KnowledgeEntry>> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const systemInstruction = language === 'zh' 
    ? `你是一位 Audlis.com 的首席知识架构师。你的任务是将这段非结构化的语音转录稿转化为极高价值的结构化情报资产。`
    : `As the Chief Knowledge Architect for Audlis.com, transform this unstructured transcript into a high-value, structured intelligence asset.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${systemInstruction}\n\nTranscript: "${transcript}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          type: { 
            type: Type.STRING, 
            enum: ['strategy', 'training', 'operations', 'client']
          },
          valueScore: { type: Type.INTEGER },
          actionItems: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['title', 'summary', 'tags', 'type', 'valueScore', 'actionItems']
      }
    }
  });

  try {
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return { title: "Audlis.com Asset", summary: transcript.substring(0, 150), tags: ["unindexed"], type: "operations", valueScore: 50, actionItems: [] };
  }
};

/**
 * Nano Banana (Gemini 2.5 Flash Image) - Monolith-A Visual Engine
 * Inspired by the 3D metallic glass 'A' logo chosen by the user.
 */
export const generateBrandImage = async (context: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // The prompt is now centered around the 'Glass-Metal-Geometric' aesthetic
  const basePrompt = `Professional premium 3D brand motif. 
    Aesthetic: Monolith-A architecture, layered glass facets, brushed silver metal, deep navy depth. 
    Strictly NO text, NO letters. 
    Visual: Studio lighting, sharp edges, refractive glass surfaces, dramatic soft shadows, centered composition.
    Specific Aesthetic Context: ${context}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: basePrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Nano Banana generation failed", e);
    return null;
  }
};
