const { Router } = require('express');
const router = Router();

const { createTask, changeStatusTask, deleteTask } = require('../controllers/tasks.controller');
const { verifyUserAuthentication } = require('../controllers/authentication.controller');
//  To create ptoject 
router.post( '/projects/:url', verifyUserAuthentication, createTask );
// To change task status
router.patch( '/tasks/:id', verifyUserAuthentication, changeStatusTask );
// To delete a project's task
router.delete( '/tasks/:id', verifyUserAuthentication, deleteTask );


module.exports = router;