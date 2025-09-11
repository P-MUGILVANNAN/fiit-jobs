
import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

function Alert({ type, message, onClose }: AlertProps): React.JSX.Element | null {
  if (!message) return null;

  const baseClasses = 'p-4 rounded-md flex justify-between items-center';
  const typeClasses = {
    success: 'bg-green-100 border border-green-400 text-green-700',
    error: 'bg-red-100 border border-red-400 text-red-700',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold">X</button>
      )}
    </div>
  );
}

export default Alert;
