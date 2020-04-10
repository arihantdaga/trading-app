const Trade = require('../models/Trade');
const User = require('../models/User');
const Stock = require('../models/Stock');


async function addTrade(req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                id: req.body.user.id
            }
        });
        if (!user) {
            // Create New User
            await User.create({
                id: req.body.user.id,
                name: req.body.user.name
            });
        }
        const stock = await Stock.findOne({
            where: {symbol: req.body.symbol}
        });
        if(!stock){
            // Create New Stock
            await Stock.create({
                symbol: req.body.symbol
            })
        }
        const trade = await Trade.create({
            id: req.body.id,
            type: req.body.type,
            user_id: req.body.user.id,
            symbol: req.body.symbol,
            shares: req.body.shares,
            price: req.body.price,
            timestamp: req.body.timestamp
        });
        return res.status(201).json(trade);
    } catch (err) {
        if(err.message == "Validation error"){
            return next({status: 400, message: "Validation error"})
        }
        return next(err);
    }
}

async function getAllTrades(req, res, next) {
    try {
        const trades = await Trade.findAll({
            where: {},
            order: [
                ['id', 'ASC']
            ],
            include: [{model : User, as : 'user'}],
            attributes: { exclude: ['user_id'] }
        });
        res.json(trades);
    } catch (err) {
        next(err);
    }

}

async function getUserTrade(req, res, next) {
    try{
        const user = await User.findOne({
            where: { id: req.params.userID }
        });
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }
        const trades = await Trade.findAll({
            where: {
                user_id: req.params.userID
            },
            order: [
                ['id', 'ASC']
            ],
            include: [{model : User, as : 'user'}],
            attributes: { exclude: ['user_id'] }
        });
        trades.map(trade=>{
            delete trade.user_id
        })
        res.json(trades)
    }catch(err){
        return next(err);
    }

}

async function deleteAll(req, res, next) {
    try {
        const results = await Trade.destroy({
            truncate: true
        });
        res.json(results);
    } catch (err) {
        next(err);
    }

}

module.exports = { addTrade, getAllTrades, getUserTrade, deleteAll }
