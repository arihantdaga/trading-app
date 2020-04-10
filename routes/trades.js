var express = require('express');
var router = express.Router();
const tradeController = require('../controllers/trades');
// Routes related to trades
router.post('/', tradeController.addTrade);
router.get('/', tradeController.getAllTrades);
router.get('/users/:userID', tradeController.getUserTrade);


module.exports = router;