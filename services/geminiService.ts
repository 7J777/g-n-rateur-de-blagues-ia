
import { GoogleGenAI } from "@google/genai";
import type { JokeResult, GroundingChunk } from '../types';

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY n'est pas définie. Veuillez vérifier votre fichier .env.local");
}

const ai = new GoogleGenAI({ apiKey });

export const generateJoke = async (keyword: string): Promise<JokeResult> => {
  if (!keyword.trim()) {
    throw new Error("Le mot-clé ne peut pas être vide.");
  }

  try {
    const prompt = `Agis comme un expert du "trash talk". Ton objectif est de créer une pique cinglante, audacieuse et provocatrice sur le sujet suivant : "${keyword}". La blague doit être **courte (2 phrases max), directe et sans pitié**, dans le plus pur style du "trash talk". Utilise les informations du web pour que ta pique soit pertinente et bien sentie. La réponse doit être en français.
IMPORTANT : Ne retourne QUE la blague finale. Aucune introduction, aucune explication, juste la pique.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const joke = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: GroundingChunk[] = groundingMetadata?.groundingChunks?.filter(chunk => chunk.web) ?? [];

    if (!joke) {
        throw new Error("L'IA n'a pas pu générer de blague. Essayez un autre mot-clé.");
    }
    
    return { joke, sources };
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini:", error);
    if (error instanceof Error) {
        // Enhance user-facing error messages
        if (error.message.includes('API key not valid')) {
            return Promise.reject(new Error("La clé d'API n'est pas valide. Veuillez vérifier la configuration."));
        }
        return Promise.reject(new Error(`Une erreur est survenue: ${error.message}`));
    }
    return Promise.reject(new Error("Une erreur inattendue est survenue lors de la génération de la blague."));
  }
};