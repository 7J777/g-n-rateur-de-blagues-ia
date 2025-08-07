import React, { useState, useCallback } from 'react';
import { generateJoke } from './services/groqService';
import type { JokeResult } from './types';
import Header from './components/Header';
import JokeCard from './components/JokeCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

const App: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [jokeResult, setJokeResult] = useState<JokeResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateJoke = useCallback(async () => {
    if (!keyword.trim()) {
      setError("Veuillez entrer un mot-clé.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setJokeResult(null);

    try {
      const result = await generateJoke(keyword);
      setJokeResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGenerateJoke();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col items-center p-4 selection:bg-purple-300">
      <div className="w-full max-w-2xl mx-auto py-8">
        <Header />

        <main className="mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Ex: un chat, la politique, le café..."
              className="flex-grow w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !keyword}
              className="flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
              {isLoading ? "Génération..." : "Générer la blague"}
            </button>
          </form>

          <div className="mt-8 min-h-[150px]">
            {isLoading && <LoadingSpinner />}
            <ErrorAlert message={error} />
            {jokeResult && !isLoading && (
              <JokeCard joke={jokeResult.joke} sources={jokeResult.sources} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
