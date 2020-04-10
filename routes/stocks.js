var express = require('express');
var router = express.Router();
const stocksController = require('../controllers/stocks');

// Routes related to stocks
router.get('/:stockSymbol/trades', stocksController.getStockTrades);
router.get('/:stockSymbol/price',stocksController.getStockPriceRange);

module.exports = router;