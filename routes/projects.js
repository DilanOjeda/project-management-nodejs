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

const router = express.Router();


router.get( '/', getHomePage );

router.get( '/new-project', showProjectForm );

router.post( '/new-project', [
    check('name', 'The name is required.').not().isEmpty().trim().escape()
], createProject );

router.get( '/projects/:url', getProjectByUrl );

//  UPDATE
router.get( '/projects/update/:id', showFormDelete );

router.post( '/new-project/:id', [
    check('name', 'The name is required.').not().isEmpty().trim().escape()
], updateProject );

//  DELETE
router.delete( '/projects/:url', deleteProject );

module.exports = router;


