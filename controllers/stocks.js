const Trade = require('../models/Trade');
const Stock = require('../models/Stock');
const User = require('../models/User');
const { Op } = require("sequelize");

async function getStockTrades(req,res,next){
    try{
        const stock = await Stock.findOne({
            where: {symbol: req.params.stockSymbol}
        });
        if(!stock){
            return next({status: 404, message: "Stock not found"})
        }
        const startDate = new Date(req.query.start);
        let endDate = new Date(req.query.end);
        endDate.setDate(endDate.getDate() + 1); // Because the outer limit should be on the end of the day (which is beginning of the next day). 
        const trades = await Trade.findAll({
            where: {symbol: req.params.stockSymbol, type: req.query.type, timestamp: {[Op.gte]: startDate, [Op.lte]: endDate}},
            order: [
                ['id', 'ASC']
            ],
            include: [{model : User, as : 'user'}],
            attributes: { exclude: ['user_id'] }
        });
        trades.map(trade=>{
            delete trade.user_id
        })
        return res.json(trades);

    }catch(err){
        next(err);
    }
    
}

async function getStockPriceRange(req,res,next){
    const stock = await Stock.findOne({
        where: {symbol: req.params.stockSymbol}
    });
    if(!stock){
        return next({status: 404, message: "Stock not found"})
    }

    const startDate = new Date(req.query.start);
    let endDate = new Date(req.query.end);
    endDate.setDate(endDate.getDate() + 1); // Because the outer limit should be on the end of the day (which is beginning of the next day).  
    const HighestPriceTrade = await Trade.findOne({
        attributes: ['price'],
        where: {symbol: req.params.stockSymbol, timestamp: {[Op.gte]: startDate, [Op.lte]: endDate}},
        order: [
            ['price', 'DESC']
        ],
    })

    const LowestPriceTrade = await Trade.findOne({
        attributes: ['price'],
        where: {symbol: req.params.stockSymbol, timestamp: {[Op.gte]: startDate, [Op.lte]: endDate}},
        order: [
            ['price', 'ASC']
        ],
    }) 

    if(!HighestPriceTrade || !LowestPriceTrade){
        return res.json({message: "There are no trades in the given date range"})
    }

    return res.json({
        symbol: req.params.stockSymbol,
        highest: HighestPriceTrade.price,
        lowset: LowestPriceTrade.price
    })

}

module.exports = { getStockTrades, getStockPriceRange}