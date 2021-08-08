
const Sequelize = require('sequelize');
const connectToDatabase = require('../config/db');

const slug = require('slug');
const shortid = require('shortid');

const Project = connectToDatabase.define('projects', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100)
    },
    url: {
        type: Sequelize.STRING(150)
    }
}, {
    hooks: {
        beforeCreate(project){
            const url = slug(project.name, '-').toLowerCase();
            project.url = `${url}-${shortid.generate()}`;
        }
    }
});
    
module.exports = Project;