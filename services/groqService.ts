import type { JokeResult, GroundingChunk } from '../types';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("La clé API Groq n'est pas définie dans les variables d'environnement.");
}

export const generateJoke = async (keyword: string): Promise<JokeResult> => {
  if (!keyword.trim()) {
    throw new Error("Le mot-clé ne peut pas être vide.");
  }

  try {
    const prompt = `Agis comme un expert du "trash talk". Ton objectif est de créer une pique cinglante, audacieuse et provocatrice sur le sujet suivant : "${keyword}". La blague doit être **courte (2 phrases max), directe et sans pitié**, dans le plus pur style du "trash talk". La réponse doit être en français.
IMPORTANT : Ne retourne QUE la blague finale. Aucune introduction, aucune explication, juste la pique.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: prompt
        }],
        max_tokens: 150,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Réponse invalide de l'API Groq");
    }

    const joke = data.choices[0].message.content.trim();
    
    if (!joke) {
      throw new Error("L'IA n'a pas pu générer de blague. Essayez un autre mot-clé.");
    }
    
    // Groq ne fournit pas de sources web comme Gemini, donc on retourne un tableau vide
    const sources: GroundingChunk[] = [];
    
    return { joke, sources };
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Groq:", error);
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return Promise.reject(new Error("La clé d'API Groq n'est pas valide."));
      }
      if (error.message.includes('429')) {
        return Promise.reject(new Error("Limite de requêtes atteinte. Veuillez réessayer plus tard."));
      }
      return Promise.reject(new Error(`Une erreur est survenue: ${error.message}`));
    }
    return Promise.reject(new Error("Une erreur inattendue est survenue lors de la génération de la blague."));
  }
};