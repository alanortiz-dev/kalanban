import React from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Board } from './components/Board';
import { Onboarding } from './components/Onboarding';

function App() {
  return (
    <div className="min-h-screen text-foreground dark:text-foreground-dark transition-colors bg-gradient-to-br from-slate-100 via-fuchsia-200 to-violet-400 dark:from-slate-900 dark:via-red-900 dark:to-yellow-800">
      <ThemeToggle />
      <Onboarding />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-slate-900 to-slate-50 dark:from-slate-50 dark:to-zinc-300 bg-clip-text text-transparent">
          Kalanban
        </h1>

        <Board />
      </main>
    </div>
  );
}

export default App;
