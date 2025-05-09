import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ResetButton() {
    const [isDark] = useLocalStorage('theme', true); // obtenemos el tema actual

    const handleReset = () => {
        if (confirm('¿Estás seguro de que quieres borrar el contenido de LocalStorage y reiniciar el tablero?')) {
            localStorage.clear();
            location.reload();
        }
    };

    return (
        <button
            onClick={handleReset}
            className="fixed top-4 right-16 p-2 rounded-full bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all"
            aria-label="Reiniciar tablero"
            title="Resetear Kalanban"
        >
            {isDark ? (
                <RotateCcw className="w-5 h-5 " />
            ) : (
                <RotateCcw className="w-5 h-5" />
            )}
        </button>
    );
}
