// src/lib/startTour.ts

import { createDriver } from './driver';

export function startTutorial() {
    const driver = createDriver({
        showProgress: true,
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: 'Comenzar',
        steps: [
            {
                element: '#board',
                popover: {
                    title: 'Tu tablero',
                    description: 'Aquí se organizan todas tus tareas por columnas. Es el corazón de Kalanban.',
                    side: 'right',
                    align: 'center'
                }
            },
            {
                element: '#column-todo',
                popover: {
                    title: 'Columna: Por hacer',
                    description: 'Aquí se listan las tareas pendientes. Es el punto de partida para todo lo que tienes que completar.',
                    side: 'right'
                }
            },
            {
                element: '#column-inProgress',
                popover: {
                    title: 'Columna: En progreso',
                    description: 'Cuando empieces a trabajar en una tarea, muévela a esta columna. Así sabrás en qué estás enfocado.',
                    side: 'right'
                }
            },
            {
                element: '#column-done',
                popover: {
                    title: 'Columna: Completado',
                    description: 'Una vez que termines una tarea, arrástrala aquí para llevar un control visual de tus logros.',
                    side: 'right'
                }
            },
            {
                element: '#add-task',
                popover: {
                    title: 'Agregar tarea',
                    description: 'Haz clic aquí para crear una nueva tarea dentro de esta columna.',
                    side: 'right'
                }
            },
            {
                element: '#edit-task',
                popover: {
                    title: 'Editar tarea',
                    description: 'Haz clic sobre una tarjeta para editar su contenido.',
                    side: 'top'
                }
            },
            {
                element: '#delete-task',
                popover: {
                    title: 'Eliminar tarea',
                    description: 'Haz clic en el ícono de eliminar dentro de la tarjeta para borrarla.',
                    side: 'left'
                }
            },
            {
                element: '#theme-toggle',
                popover: {
                    title: 'Cambiar tema',
                    description: 'Puedes alternar entre tema claro y oscuro según tu estilo.',
                    side: 'left'
                }
            },
            {
                element: '#reset-button',
                popover: {
                    title: 'Reiniciar tablero',
                    description: 'Este botón elimina todas las columnas y tareas. Úsalo con cuidado.',
                    side: 'left'
                }
            }
        ]
    });

    driver.drive(); // 👈 Este es el nuevo método para iniciar el tour
}
