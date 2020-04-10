const sequelize = require('sequelize');
const Connection = require('../db/connection');


const Trade = Connection.define('trade', {
    id: {
        type: sequelize.INTEGER,
        unique: true,
        primaryKey: true
    },
    type: {
        type: sequelize.ENUM,
        values: ['buy', 'sell']
    },
    
    symbol: {
        type: sequelize.STRING,
        allowNull: false
    },
    shares: {
        type: sequelize.INTEGER,
        // validate: {
        //     min:10,
        //     max:30
        // }
    },
    price: {
        type: sequelize.FLOAT,
        // validate:{
        //     min: 130.42,
        //     max: 195.65
        // }
    },
    timestamp: {
        type: sequelize.TIME
    }
}, {timestamps: false})

module.exports = Trade