import Swal from "sweetalert2";


export const updateProgressBar = () => {

    // Get all the tasks
    const tasks = document.querySelectorAll('li.tarea');

    if ( tasks.length ) {
        
        // Get all the completed tasks
        const tasksCompleted = document.querySelectorAll('i.completo');

        // Calculate the project progress
        const projectProgress = Math.round( ( tasksCompleted.length / tasks.length ) * 100 );
        
        // Show the project progress
        const percentBar = document.querySelector('#porcentaje');
        percentBar.style.width = projectProgress + '%';

        if ( projectProgress === 100 ) {
            Swal.fire(
                'Project completed',
                'Congratulations! You completed the project.',
                'success'
            )
        }
    }
} 

