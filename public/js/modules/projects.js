import Swal from 'sweetalert2'
import axios from 'axios'

const btnDelete = document.querySelector('#eliminar-proyecto');

if ( btnDelete ) {
    
    btnDelete.addEventListener('click', (e) => {
        
        const urlProject = e.target.dataset.urlProject; // urlPoejct comes from data-url-project
         
        Swal.fire({
            title: 'Are you sure to delete the project?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                
                const url = `${location.origin}/projects/${urlProject}`
                axios.delete(url, {
                    params: { urlProject }
                })
                .then( (response) => {

                    Swal.fire(
                        'Deleted!',
                        `${response.data.msg}`,
                        'success'
                    )
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000);

                })
                .catch( () => {
                    Swal.fire({
                        type: 'error',
                        title: 'Something went wrong!',
                        text: 'The project could not be deleted.'
                    })
                })
            }
        });
        
    });

}