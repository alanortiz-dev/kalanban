import React, { useState, useEffect } from 'react';


export const Onboarding = () => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const visto = localStorage.getItem('kalanban-onboarding');
    if (!visto) setMostrar(true);
  }, []);

  const generarTarea = (contenido: string, columnaId: string) => ({
    id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2),
    content: contenido,
    columnId: columnaId,
    createdAt: new Date().toISOString(),
  });

  const tableroDemo = {
    columns: [
      {
        id: 'todo',
        title: 'Por hacer',
        tasks: [
          generarTarea('Diseñar la pantalla de login', 'todo'),
          generarTarea('Escribir la documentación de la API', 'todo'),
          generarTarea('Crear wireframes para móvil', 'todo'),
          generarTarea('Investigar librerías de drag and drop', 'todo'),
          generarTarea('Configurar CI/CD', 'todo'),
        ],
      },
      {
        id: 'inProgress',
        title: 'En progreso',
        tasks: [
          generarTarea('Construir componentes reutilizables', 'inProgress'),
          generarTarea('Implementar modo oscuro/claro', 'inProgress'),
          generarTarea('Diseñar íconos para el dashboard', 'inProgress'),
        ],
      },
      {
        id: 'done',
        title: 'Completado',
        tasks: [
          generarTarea('Estructura inicial del proyecto', 'done'),
          generarTarea('Configurar ESLint y Prettier', 'done'),
          generarTarea('Deploy en Vercel', 'done'),
          generarTarea('Hero del landing page', 'done'),
          generarTarea('Paleta de colores y tipografía', 'done'),
          generarTarea('Instalar y configurar Framer Motion', 'done'),
          generarTarea('Estilos responsivos', 'done'),
          generarTarea('Pruebas en móvil y tablet', 'done'),
        ],
      },
    ],
  };

  const manejarSaltar = () => {
    localStorage.setItem('kalanban-onboarding', 'true');
    setMostrar(false);
  };

  const manejarEmpezar = () => {
    localStorage.setItem('board', JSON.stringify(tableroDemo));
    localStorage.setItem('kalanban-onboarding', 'true');
    localStorage.setItem('start-tour', 'true');
    setMostrar(false);
    window.location.reload();
  };

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl p-8 max-w-lg w-full shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
        <h2 className="text-2xl font-bold mb-4">👋 ¡Bienvenido a Kalanban!</h2>
        <p className="mb-6">
          Este es tu tablero personal para organizar tareas al estilo kanban. Todo se guarda automáticamente en tu navegador.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={manejarSaltar}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-zinc-800 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
          >
            Saltar tutorial
          </button>
          <button
            onClick={manejarEmpezar}
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg shadow-sm"
          >
            ¡Vamos allá!
          </button>
        </div>
      </div>
    </div>
  );
};
