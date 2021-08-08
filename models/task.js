const Sequelize = require('sequelize');
const connectToDatabase = require('../config/db');
const Project = require('./project');


const Task = connectToDatabase.define('tasks', {

    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
});

Task.belongsTo(Project);

module.exports = Task;