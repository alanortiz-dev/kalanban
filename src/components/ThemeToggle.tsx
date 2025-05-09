import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ThemeToggle() {
  const [isDark, setIsDark] = useLocalStorage('theme', true);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-2 rounded-full bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all"
      aria-label="Cambiar tema"
    >
      {isDark ? (
        <Sun className="w-5 h-5 " />
      ) : (
        <Moon className="w-5 h-5 text-accent" />
      )}
    </button>
  );
}