const sequelize = require('sequelize');
const Connection = require('../db/connection');

const User = Connection.define('user', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false})

module.exports = User