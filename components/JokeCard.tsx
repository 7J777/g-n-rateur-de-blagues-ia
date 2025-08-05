import React from 'react';
import type { GroundingChunk } from '../types';

interface JokeCardProps {
  joke: string;
  sources: GroundingChunk[];
}

const JokeCard: React.FC<JokeCardProps> = ({ joke, sources }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 md:p-8 w-full">
      <div className="text-center">
        <p className="text-lg md:text-xl text-slate-800 dark:text-slate-100 whitespace-pre-wrap font-sans font-bold">
          {joke}
        </p>
      </div>
      {sources.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider text-center">
            Sources du Web
          </h3>
          <ul className="space-y-2">
            {sources
              .filter(source => source.web && source.web.uri)
              .map((source, index) => (
              <li key={index} className="truncate text-center sm:text-left">
                <a
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                >
                  <i className="fa-solid fa-link fa-xs text-slate-400 group-hover:text-blue-500 transition-colors"></i>
                  <span className="underline decoration-dotted underline-offset-2">{source.web.title || source.web.uri}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JokeCard;