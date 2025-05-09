import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion } from 'framer-motion';

export function ResetButton() {
  const [isDark] = useLocalStorage('theme', true);
  const [resetConfirmed, setResetConfirmed] = useState(false);

  const handleClick = () => {
    const confirmReset = confirm('¿Estás seguro de que quieres borrar el contenido de LocalStorage y reiniciar el tablero?');
    if (confirmReset) {
      setResetConfirmed(true);
    }
  };

  const handleAnimationComplete = () => {
    if (resetConfirmed) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed top-4 right-16 p-2 rounded-full bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all"
      aria-label="Reiniciar tablero"
      title="Resetear Kalanban"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...(resetConfirmed && { rotate: -360 })
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
        scale: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {isDark ? (
        <RotateCcw className="w-5 h-5" />
      ) : (
        <RotateCcw className="w-5 h-5 text-accent" />
      )}
    </motion.button>
  );
}
