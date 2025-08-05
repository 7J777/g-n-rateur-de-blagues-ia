
import React from 'react';

interface ErrorAlertProps {
  message: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-md relative my-4" role="alert">
      <div className="flex">
        <div className="py-1"><i className="fa-solid fa-circle-exclamation text-red-500 mr-3"></i></div>
        <div>
          <p className="font-bold">Erreur de Génération</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
