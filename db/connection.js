const Sequelize = require('sequelize');
const path = require('path');
const connection = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'db', 'tradingapp.sqlite')
});


module.exports =  connection;