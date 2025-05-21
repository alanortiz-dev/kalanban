import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { ConfirmModal } from './ConfirmModal';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export function ResetButton() {
  const [isDark] = useLocalStorage('theme', true);
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleConfirmReset = () => {
    setAnimate(true); // dispara la animación

    setTimeout(() => {
      localStorage.clear();
      location.reload();
    }, 600); // esperar a que se vea la animación
  };

  return (
    <>
      <motion.button
        id="reset-button" // ID necesario para el onboarding tour
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-20 z-50 p-2 rounded-full 
         bg-card-light dark:bg-card-dark 
         border border-gray-300 dark:border-gray-600 
         shadow-md hover:shadow-lg transition-all"
        aria-label="Reiniciar tablero"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: animate ? -360 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        data-tooltip-id="reset-tooltip"
        data-tooltip-content="Reiniciar tablero"        
      >
        <RotateCcw className="w-5 h-5" />
      </motion.button>
      <ReactTooltip
        id="reset-tooltip"
        delayShow={100}
        className="!bg-gray-700 !text-white !text-xs !px-2 !py-1 !rounded-lg !shadow-lg !backdrop-blur-sm !border !border-gray-500"
      />
      <ConfirmModal
        isOpen={showModal}
        title="¿Reiniciar tablero?"
        message="Esto eliminará todas tus tareas guardadas en localStorage. ¿Estás seguro de que quieres comenzar desde cero?"
        confirmText="Reiniciar"
        cancelText="Cancelar"
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          handleConfirmReset();
        }}
      />
    </>
  );
}
