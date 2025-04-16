import React from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Board } from './components/Board';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThemeToggle />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl font-bold text-foreground mb-8">Kalanban</h1>
        <Board />
      </main>
    </div>
  );
}

export default App;
