

const { Project, Task } = require('../models');

const createTask = async (req, res, next) => {
    const { name } = req.body;
    const { url } = req.params;

    // First at all, Get the project by url
    const project = await Project.findOne({
        where: {
            url
        }
    }); 

    // 
    const data = {
        name,
        status: false,  // MySQL show the boolean values like: true = 1 and false= 0 
        projectId: project.id
    }
    const task = await Task.create( data );

    if ( !task ) {
        return next();
    }


    res.redirect( `/projects/${ url }`);
}

const changeStatusTask = async (req, res, next) => {

    const { id } = req.params;
    
    const task = await Task.findOne({ where: { id } });
        
    task.status = (task.status) ? false : true

    const isTaskUpdated = await task.save();
    
    if ( !isTaskUpdated ) return next(); 

    res.status(200).json({
        msg: 'The status was changed'
    })
}

const deleteTask = async (req, res, next) => {
    
    const { id } = req.params;

    const taskDeleted = await Task.destroy({ where: {id} });
    if (!taskDeleted) return next();

    res.status(200).json({
        msg: 'The task was deleted successfully'
    });
} 

module.exports = {
    createTask,
    changeStatusTask,
    deleteTask
}