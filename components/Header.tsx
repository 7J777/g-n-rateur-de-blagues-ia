
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Générateur de Blagues IA
        </span>
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
        Entrez un mot-clé et laissez l'IA vous faire rire !
      </p>
    </header>
  );
};

export default Header;
