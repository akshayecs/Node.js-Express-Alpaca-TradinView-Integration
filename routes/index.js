const express = require('express');

const userRoutes = require('./user');
const tradingRoutes = require('./alpaca-tradingview-webhook');
const stocksRoutes = require('../routes/user-stock-tickers')
const router = express.Router();

router.use('/user',userRoutes);
router.use('/trading',tradingRoutes);
router.use('/stocks',stocksRoutes)

module.exports = router;