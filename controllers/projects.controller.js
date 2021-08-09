
const { Task } = require('../models');
const Project = require('../models/project');

const getHomePage = async (req, res) => {

    const userId = res.locals.user.id;

    const projects = await Project.findAll({ where: { userId } });
    
    res.render('index', {
        title: 'Projects',
        projects
    });
}

const showProjectForm = async (req, res) => {

    const userId = res.locals.user.id;

    const projects = await Project.findAll({ where: { userId } });
    
    res.render('new-project', {
        namePage: 'New Project',
        projects
    });
}

const createProject = async (req, res) => {

    const { name } = req.body;
    const errors = [];

    // Get all the projects
    const userId = res.locals.user.id;

    const projects = await Project.findAll({ where: { userId } });

    // Validate the name
    if ( !name ) {
        errors.push({ msg: 'The name is required.' });
    }

    // If there are errors
    if ( errors.length > 0 ) {
        res.render('new-project', {
            namePage: 'New Porject',
            errors,
            projects
        });
    } else{
        const userId = res.locals.user.id;
        const project = await Project.create({ name, userId });
        res.redirect('/');
    }
}

const getProjectByUrl = async (req, res, next) => {
    
    try {
        const { url } = req.params;
        
        // Get all the projects
        const userId = res.locals.user.id;
        const projectsPromise = Project.findAll({ where: { userId } });

        // Get one project
        const projectPromise = Project.findOne({
            where: {
                url
            }
        });

        const [project, projects] = await Promise.all([ projectPromise, projectsPromise ]);

        if ( !project ) return next();
        
        // Get all the tasks by Project's url

        const tasks = await Task.findAll({
            where: {
                projectId: project.id
            },
        });

        // console.log( 'TASKS => ', tasks )

        res.render('tasks', {
            namePage: 'Project Tasks',
            project,
            projects,
            tasks
        });
    } catch (error) {
        console.log('ERROR => ', error)
    }
}
const showFormDelete = async (req, res) => {
    
    const { id } = req.params;
    
    const userId = res.locals.user.id;
    const projectsPromise = Project.findAll({ where: { userId } });
    
    const projectPromise = Project.findOne({ 
        where: {
            id
        }
    });
    const [project, projects] = await Promise.all([ projectPromise, projectsPromise ]);
    
    res.render('new-project',{
        namePage: 'Update Project',
        project,
        projects
    });
}

const updateProject = async (req, res) => {

    const { id } = req.params;
    const { name } = req.body;
    const errors = [];

    // Get all the projects
    const userId = res.locals.user.id;
    const projects = await Project.findAll({ where: { userId } });

    // Validate the name
    if ( !name ) {
        errors.push({ msg: 'The name is required.' });
    }

    // I there are errors
    if ( errors.length > 0 ) {
        res.render('new-project', {
            namePage: 'New Porject',
            errors,
            projects
        });
    } else{
        await Project.update(
            { name: name },
            { where: {
                id
            }}
        );
        res.redirect('/');
    }
}

const deleteProject = async (req, res, next) => {

    const { urlProject } = req.query;

    const projectDeleted = await Project.destroy({
        where: {
            url: urlProject
        }
    }); // return 1=deleted  or 0=not_delete
    if ( !projectDeleted ) {
        return next();
    }
    res.status(200).json({
        msg: 'The project was deleted successfully.'
    });

    return     
}
module.exports = {
    getHomePage,
    showProjectForm,
    createProject,
    getProjectByUrl,
    showFormDelete,
    updateProject,
    deleteProject
}