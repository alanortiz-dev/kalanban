import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export function ThemeToggle() {
  const [isDark, setIsDark] = useLocalStorage('theme', true);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 md:right-8 z-50 p-2 rounded-full 
                   bg-card-light dark:bg-card-dark 
                   border border-gray-300 dark:border-gray-600 
                   shadow-md hover:shadow-lg transition-all"
        aria-label="Cambiar tema"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content="Cambiar tema"
        data-tooltip-place="bottom" 
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      {/* Tooltip global para este botón */}
      <ReactTooltip
        id="theme-tooltip"
        offset={6}
        positionStrategy="fixed"
        className="!bg-gray-700 !text-white !text-xs !px-2 !py-1 !rounded-lg !shadow-lg !backdrop-blur-sm !border !border-gray-500"
      />
    </>
  );
}