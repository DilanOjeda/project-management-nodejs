const express = require("express");
const { check } = require('express-validator');
const { 
    getHomePage, 
    showProjectForm, 
    createProject, 
    getProjectByUrl,
    showFormDelete,
    updateProject,
    deleteProject
     } = require('../controllers/projects.controller');
const { verifyUserAuthentication } = require('../controllers/authentication.controller');

const router = express.Router();


router.get( '/', verifyUserAuthentication, getHomePage );

router.get( '/new-project', verifyUserAuthentication, showProjectForm );

router.post( '/new-project', [
    verifyUserAuthentication,
    check('name', 'The name is required.').not().isEmpty().trim().escape()
], createProject );

router.get( '/projects/:url', verifyUserAuthentication, getProjectByUrl );

//  UPDATE
router.get( '/projects/update/:id', verifyUserAuthentication, showFormDelete );

router.post( '/new-project/:id', [
    verifyUserAuthentication,
    check('name', 'The name is required.').not().isEmpty().trim().escape()
], updateProject );

//  DELETE
router.delete( '/projects/:url', verifyUserAuthentication, deleteProject );

module.exports = router;


