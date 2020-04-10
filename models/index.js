const sequelize = require('sequelize');
const User = require('./User');
const Trade = require('./Trade');
const Stock = require('./Stock');
const init = ()=>{
    Trade.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
}

init();

module.exports = {User, Trade};