import React from 'react';
import { useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Board } from './components/Board';
import { Onboarding } from './components/Onboarding';
import { ResetButton } from './components/ResetButton';
import { startTutorial } from './lib/startTour';




function App() {
  useEffect(() => {
    const shouldStartTour = localStorage.getItem('start-tour');
    if (shouldStartTour === 'true') {
      localStorage.removeItem('start-tour');
      setTimeout(() => startTutorial(), 500); // ⏳ espera medio segundo para asegurar render
    }
  }, []);

  return (
    <div className="min-h-screen text-foreground dark:text-foreground-dark transition-colors bg-gradient-to-br from-slate-100 via-fuchsia-200 to-violet-400 dark:from-slate-900 dark:via-red-900 dark:to-yellow-800">
      <ThemeToggle />
      <ResetButton />
      <Onboarding />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1
          className="inline-block text-4xl font-extrabold mb-8
             bg-gradient-to-r from-zinc-500 to-red-700
             dark:from-neutral-300 dark:to-yellow-800
             bg-clip-text text-transparent
             transition-transform duration-300 ease-in-out
             hover:scale-[1.02]
             hover:drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]
             dark:hover:drop-shadow-[0_1px_12px_rgba(255,191,0,0.35)]"
        >
          Kalanban
        </h1>


        <Board />
      </main>
    </div>
  );
}

export default App;
