// TaskCard.tsx
// Este componente representa una tarea individual dentro de una columna.
// Aquí muestro el contenido de la tarea, y también dejo botones para editarla o eliminarla. Además, la configuro como "draggable" para poder moverla entre columnas.

import React, { useRef, useState, useEffect } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Trash2, Pencil, Save, X } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  index: number;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, content: string) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const dragRef = useRef<HTMLDivElement>(null); // Referencia al elemento para hacerlo draggable
  const [isEditing, setIsEditing] = useState(false); // Controla si estamos editando
  const [editedContent, setEditedContent] = useState(task.content); // Contenido del input cuando se edita

  // Hago que la tarjeta sea arrastrable
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

  // Cuando se guarda una edición
  const handleSave = () => {
    if (editedContent.trim()) {
      onEdit(task.id, editedContent.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={dragRef} // Esto es lo que hace que esta tarjeta se pueda arrastrar
      className="bg-card-light dark:bg-card-dark text-foreground dark:text-foreground-dark rounded-xl p-3 shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
    >
      {isEditing ? (
        // Modo edición: muestro un input para cambiar el texto
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
              onClick={handleSave}
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
        // Modo normal: muestro el contenido de la tarea y los íconos de acción
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
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}