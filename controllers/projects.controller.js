

const getHomePage = (req, res) => {
    res.render('index', {
        title: 'Projects'
    });
}

const showProjectForm = (req, res) => {
    res.render('new-project', {
        namePage: 'New Project',
    });
}

const createProject = (req, res) => {
    console.log('data', req.body)
    res.json({
        msg: 'holla'
    })
}

module.exports = {
    getHomePage,
    showProjectForm,
    createProject,
}