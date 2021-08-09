
import axios from 'axios'
import Swal  from 'sweetalert2'
import { updateProgressBar } from '../functions/progress-bar'
const elementTasks = document.querySelector('.listado-pendientes');


if ( elementTasks ) {

    elementTasks.addEventListener('click', (e) => {

        // To get task elements 
        if ( e.target.classList.contains( 'fa-check-circle' ) ) {
            const icon = e.target;
            const idTarea = icon.parentElement.parentElement.dataset.task; 
            
            const url = `${location.origin}/tasks/${idTarea}`

            axios.patch(url, {
                id: idTarea
            })
            .then( (response)=> {

                if ( response.status === 200) {
                    icon.classList.toggle('completo');
                    updateProgressBar();
                }
            })
            .catch()
        }

        // To delete tasks from HTML Element
        if ( e.target.classList.contains( 'fa-trash' ) ) {
            
            const taskHtml = e.target.parentElement.parentElement;
            const idTaskDeleted = taskHtml.dataset.task;

            Swal.fire({
                title: 'Are you sure to delete this task?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    const url = `${location.origin}/tasks/${idTaskDeleted}`
                    
                    axios.delete(url, {id: idTaskDeleted} )
                        .then( (response) => {
                            if (response.status === 200) {
                                
                                // Delete lement task
                                taskHtml.parentElement.removeChild(taskHtml);

                                Swal.fire(
                                    'TTask Deleted!',
                                    `${response.data.msg}`,
                                    'success'
                                )    
                                updateProgressBar();
                            }
        
                        })
                        .catch( () => {
                            Swal.fire({
                                type: 'error',
                                title: 'Something went wrong!',
                                text: 'The project could not be deleted.'
                            })
                        });
                }
            });

            
        }
    });
}