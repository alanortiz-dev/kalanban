import React, { useRef, useState, useEffect } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Trash2, Pencil, Save, X } from 'lucide-react';
import type { Task } from '../types';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmModal } from './ConfirmModal';

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, content: string) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);
  const [isVisible, setIsVisible] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!dragRef.current) return;
    return draggable({
      element: dragRef.current,
      getInitialData: () => ({
        type: 'task',
        taskId: task.id,
        fromColumnId: task.columnId
      }),
    });
  }, [task]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onDelete(task.id);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={dragRef}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
              layout: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }
            }}
            onAnimationComplete={handleAnimationComplete}
            className={clsx(
              'mb-2 relative rounded shadow p-3 transition-all',
              {
                // 🌙 Modo oscuro
                'dark:bg-gradient-to-r dark:from-red-500 dark:to-slate-700 dark:text-white': task.columnId === 'todo',
                'dark:bg-gradient-to-r dark:from-blue-500 dark:to-slate-700 dark:text-white': task.columnId === 'inProgress',
                'dark:bg-gradient-to-r dark:from-lime-500 dark:to-slate-500 dark:text-white': task.columnId === 'done',
                // ☀️ Modo claro
                'bg-gradient-to-r from-red-400 to-pink-400 text-black': task.columnId === 'todo',
                'bg-gradient-to-r from-cyan-500 to-blue-300 text-black': task.columnId === 'inProgress',
                'bg-gradient-to-r from-teal-300 to-green-300 text-black': task.columnId === 'done',
              }
            )}
          >
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      if (editedContent.trim()) {
                        onEdit(task.id, editedContent.trim());
                        setIsEditing(false);
                      }
                    }}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <span className="flex-1 break-words">{task.content}</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showConfirm}
        title="¿Eliminar tarea?"
        message="¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          setIsVisible(false); // dispara la animación de salida
        }}
        confirmText="Eliminar"
      />
    </>
  );
}
