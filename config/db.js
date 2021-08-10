const Sequelize = require('sequelize');

const connectToDatabase = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD , {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = connectToDatabase;