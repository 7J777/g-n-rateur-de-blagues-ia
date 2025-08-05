
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-slate-500 dark:text-slate-400">L'IA affûte ses punchlines...</p>
    </div>
  );
};

export default LoadingSpinner;
