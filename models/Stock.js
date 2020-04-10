const sequelize = require('sequelize');
const Connection = require('../db/connection');

const Stock = Connection.define('stock', {
    symbol: {
        type: sequelize.STRING,
        allowNull: false
    }
})

module.exports = Stock