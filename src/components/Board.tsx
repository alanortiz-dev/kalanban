// Board.tsx
// Este componente representa todo el tablero Kanban: contiene las columnas, las tareas y la lógica para manipularlas.
// Desde aquí se controla qué tareas hay en cada columna, cómo se agregan, editan, eliminan o se mueven.

import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Column } from './Column';
import type { Board as BoardType, Column as ColumnType, Task } from '../types';

// Este es el estado inicial del tablero, con 3 columnas vacías
const initialBoard: BoardType = {
  columns: [
    {
      id: 'todo',
      title: 'Por hacer',
      tasks: []
    },
    {
      id: 'inProgress',
      title: 'En progreso',
      tasks: []
    },
    {
      id: 'done',
      title: 'Completado',
      tasks: []
    }
  ]
};

export function Board() {
  // Acá guardo el estado completo del tablero y lo persisto en localStorage
  const [board, setBoard] = useLocalStorage<BoardType>('board', initialBoard);

  // Función que agrega una nueva tarea en la columna indicada
  function handleAddTask(columnId: string, content: string) {
    setBoard((prev) => {
      const newColumns = prev.columns.map((column) => {
        if (column.id === columnId) {
          const newTask: Task = {
            id: crypto.randomUUID(),
            content,
            columnId,
            createdAt: new Date().toISOString()
          };
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          };
        }
        return column;
      });

      return {
        ...prev,
        columns: newColumns
      };
    });
  }

  // Función que elimina una tarea según su ID (buscándola en todas las columnas)
  function handleDeleteTask(taskId: string) {
    setBoard((prev) => {
      const newColumns = prev.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId)
      }));

      return {
        ...prev,
        columns: newColumns
      };
    });
  }

  // Función que edita el contenido de una tarea específica
  function handleEditTask(taskId: string, content: string) {
    setBoard((prev) => {
      const newColumns = prev.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId ? { ...task, content } : task
        )
      }));

      return {
        ...prev,
        columns: newColumns
      };
    });
  }

  // Función que mueve una tarea de una columna a otra (cuando haces drag and drop)
  function moveTask(taskId: string, fromColumnId: string, toColumnId: string) {
    if (fromColumnId === toColumnId) return; // No hacemos nada si la tarea ya está ahí

    setBoard((prev) => {
      const newColumns = prev.columns.map((column) => {
        // Primero saco la tarea de la columna original
        if (column.id === fromColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId)
          };
        }

        // Luego la agrego en la nueva columna
        if (column.id === toColumnId) {
          const movedTask = prev.columns
            .find((col) => col.id === fromColumnId)
            ?.tasks.find((task) => task.id === taskId);

          return {
            ...column,
            tasks: [...column.tasks, { ...movedTask!, columnId: toColumnId }]
          };
        }

        return column;
      });

      return {
        ...prev,
        columns: newColumns
      };
    });
  }

  return (
    // Acá dibujo todas las columnas del tablero
    <div className="flex gap-4 overflow-x-auto">
      {board.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          onMoveTask={moveTask} // Esta función se usa desde Column cuando haces drag
        />
      ))}
    </div>
  );
}