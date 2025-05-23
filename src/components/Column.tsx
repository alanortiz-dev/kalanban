// Column.tsx
// Este componente representa una columna del tablero (como "Por hacer", "En progreso", etc.)
// Aquí muestro las tareas de esa columna, y también dejo que se creen nuevas, se editen, se eliminen y se pueda hacer drag and drop

import React, { useState, useEffect, useRef } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import type { Column as ColumnType, Task } from '../types';
import { AnimatePresence } from 'framer-motion';

// Las props que recibe esta columna: la info de la columna y las funciones para manipular tareas
interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string, content: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, content: string) => void;
  onMoveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
}

// Componente principal de la columna
export function Column({ column, onAddTask, onDeleteTask, onEditTask, onMoveTask }: ColumnProps) {
  // Estado para manejar el input de nueva tarea y si se está mostrando o no
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Referencia al div principal de la columna (para drag and drop)
  const columnRef = useRef<HTMLDivElement>(null);

  // Acá conecto la columna como un área donde puedo soltar tareas arrastradas desde otras columnas
  useEffect(() => {
    if (!columnRef.current) return;

    return dropTargetForElements({
      element: columnRef.current,
      getData: () => ({
        type: 'column',
        columnId: column.id,
      }),
      onDrop: ({ source }) => {
        if (!source?.data) return;

        // Extraigo la info que mandó la tarjeta cuando fue arrastrada
        const { taskId, fromColumnId } = source.data as {
          taskId: string;
          fromColumnId: string;
        };

        // Si la columna de origen y la de destino son distintas, entonces muevo la tarea
        const toColumnId = column.id;
        if (fromColumnId !== toColumnId) {
          onMoveTask(taskId, fromColumnId, toColumnId);
        }
      },
    });
  }, [column.id, onMoveTask]);

  // Cuando se envía el formulario para crear una nueva tarea
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskContent.trim()) {
      onAddTask(column.id, newTaskContent.trim());
      setNewTaskContent(''); // Limpiar input
      setIsAddingTask(false); // Cerrar formulario
    }
  };

  return (
    <div
      id={`column-${column.id}`} // ✅ ID necesario para el onboarding
      ref={columnRef} // Esto permite que esta columna reciba tareas por drag and drop
      className="flex flex-col min-w-[300px] bg-card-light dark:bg-card-dark text-foreground dark:text-foreground-dark rounded-2xl p-4 shadow-md backdrop-blur-sm transition-colors duration-300"
    >
      {/* Título de la columna con el conteo de tareas */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {column.title} ({column.tasks.length})
        </h3>
      </div>

      {/* Aquí muestro las tareas de esta columna usando el componente TaskCard */}
      <AnimatePresence mode="popLayout">
        {column.tasks.map((task: Task, index: number) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            isFirstTaskInTodo={column.id === 'todo' && index === 0} //Esta propiedad va a revisar si es la primera tarea en la columna "Por hacer" para el onboarding tour
          />
        ))}
      </AnimatePresence>


      {/* Esto es lo que se muestra cuando quiero agregar una nueva tarea */}
      {isAddingTask ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsAddingTask(false);
                setNewTaskContent('');
              }
            }}
            placeholder="Nueva tarea..."
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            autoFocus
          />

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Añadir
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        // Botón para mostrar el formulario de nueva tarea
        <button
          id={column.id === 'todo' ? 'add-task' : undefined} // Solo la columna 'todo' lo tendrá
          onClick={() => setIsAddingTask(true)}
          className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 
                   text-sm font-medium
                   text-black dark:text-white 
                   bg-[#d943be1c] dark:bg-[#7297c71f] 
                   hover:brightness-110 hover:-translate-y-[1px] hover:shadow-md
                   transition-all duration-200 ease-in-out"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir tarea</span>
        </button>
      )}
    </div>
  );
}