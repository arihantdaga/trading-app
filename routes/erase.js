var express = require('express');
var router = express.Router();
const tradeController = require('../controllers/trades');

// Route to delete all trades
router.delete('/', tradeController.deleteAll);
module.exports = router;
