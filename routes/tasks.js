const { Router } = require('express');
const router = Router();

const { createTask, changeStatusTask, deleteTask } = require('../controllers/tasks.controller');

//  To create ptoject 
router.post( '/projects/:url', createTask );
// To change task status
router.patch( '/tasks/:id', changeStatusTask );
// To delete a project's task
router.delete( '/tasks/:id', deleteTask );


module.exports = router;