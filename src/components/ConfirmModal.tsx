import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ConfirmModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  title,
  message,
  isOpen,
  onCancel,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter') {
        onConfirm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card-light dark:bg-card-dark text-foreground dark:text-foreground-dark rounded-2xl p-8 max-w-lg w-full shadow-xl border border-gray-200 dark:border-gray-700 transition-all">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
