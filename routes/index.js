const express = require("express");
const { getHomePage, showProjectForm, createProject,  } = require('../controllers/projects.controller');

const router = express.Router();


router.get( '/', getHomePage );
router.get( '/new-project', showProjectForm );
router.post( '/new-project', createProject );

module.exports = router;


