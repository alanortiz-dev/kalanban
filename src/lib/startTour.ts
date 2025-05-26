import { createDriver } from './driver';

export function startTutorial() {
  const driver = createDriver({
    showProgress: true,
    nextBtnText: 'Siguiente →',
    prevBtnText: '← Anterior',
    doneBtnText: 'Finalizar recorrido',
    steps: [
      {
        element: '#board',
        popover: {
          title: 'Tablero general',
          description:
            'Aquí se organizan todas tus tareas agrupadas por columna. Es el espacio central para visualizar y gestionar tu flujo de trabajo.',
          side: 'right',
          align: 'center',
        },
      },
      {
        element: '#column-todo',
        popover: {
          title: 'Columna: Por hacer',
          description:
            'Aquí se muestran las tareas pendientes. Es el punto de partida para organizar lo que necesitas realizar.',
          side: 'right',
        },
      },
      {
        element: '#column-inProgress',
        popover: {
          title: 'Columna: En progreso',
          description:
            'Coloca aquí las tareas en las que estás trabajando actualmente. Te ayuda a mantener el enfoque y visualizar tu avance.',
          side: 'right',
        },
      },
      {
        element: '#column-done',
        popover: {
          title: 'Columna: Completado',
          description:
            'Una vez que finalices una tarea, muévela a esta columna. Verás cómo tu progreso se refleja de forma clara.',
          side: 'right',
        },
      },
      {
        element: '#add-task',
        popover: {
          title: 'Agregar nueva tarea',
          description:
            'Haz clic aquí para crear una nueva tarea dentro de la columna "Por hacer". Puedes añadir tantas como necesites.',
          side: 'right',
        },
      },
      {
        element: '#edit-task',
        popover: {
          title: 'Editar tarea',
          description:
            'Haz clic sobre una tarjeta para modificar su contenido. Ideal para actualizar detalles o hacer correcciones.',
          side: 'top',
        },
      },
      {
        element: '#delete-task',
        popover: {
          title: 'Eliminar tarea',
          description:
            'Haz clic en el icono de eliminar para quitar una tarea del tablero. Esta acción es permanente.',
          side: 'left',
        },
      },
      {
        element: '#task-draggable',
        popover: {
          title: 'Mover tareas entre columnas',
          description:
            'Arrastra y suelta cualquier tarjeta para cambiarla de columna. Esto te permite reflejar el estado actual de cada tarea.',
          side: 'top',
        },
      },
      {
        element: '#theme-toggle',
        popover: {
          title: 'Cambiar tema',
          description:
            'Puedes alternar entre el modo claro y oscuro según tu preferencia visual. El diseño se adapta automáticamente.',
          side: 'left',
        },
      },
      {
        element: '#reset-button',
        popover: {
          title: 'Reiniciar tablero',
          description:
            'Este botón borra todas las tareas y columnas. Úsalo si deseas comenzar desde cero.',
          side: 'left',
        },
      },
      {
        popover: {
          title: 'Todo listo para comenzar',
          description:
            'Ya conoces las funciones principales de Kalanban. Ahora puedes empezar a organizar tus tareas de forma simple y eficiente.',
          align: 'center',
        },
      },
    ],
  });

  driver.drive();
}
