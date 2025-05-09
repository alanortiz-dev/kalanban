import React, { useState, useEffect } from 'react';

export const Onboarding = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('kalanban-onboarding');
    if (!seen) setShow(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem('kalanban-onboarding', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card-light dark:bg-card-dark text-foreground dark:text-foreground-dark rounded-2xl p-8 max-w-lg w-full shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
        <h2 className="text-2xl font-bold mb-4">👋 ¡Bienvenido a Kalanban!</h2>
        <p className="mb-6">
          Este es tu tablero personal para organizar tareas al estilo kanban.
          Todo se guarda automáticamente en el navegador utilizando el localStorage.
        </p>
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg shadow-sm"
        >
          ¡Vamos allá!
        </button>
      </div>
    </div>
  );
};
