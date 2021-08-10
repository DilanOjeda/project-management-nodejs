const Sequelize = require('sequelize');
const connectToDatabase = require('../config/db');
const bcrypt = require('bcryptjs')


const Project = require('./project')

const User = connectToDatabase.define('users', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'The email has to be an myEmail@email.com'
            },
            notEmpty: {
                msg: `The email can not be empty.`
            } 

        },
        unique: {
            args: true,
            msg: 'The email is already registered.'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: `The password can not be empty.`
            } 
        }
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE
        
}, {
    hooks: {
        beforeCreate(user) {
            
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync( user.password, salt );
        }
    }
});

// Custom methods
User.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync( password, this.password ); //(receive, from this model)
}

User.hasMany(Project);

module.exports = User