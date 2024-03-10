const router = require('express').Router();


router.post('/webhook/tradingview',(req,res) => {
    try {
        // Extract relevant data from the webhook payload
    const { signal, symbol, exchange, strategy } = req.body;

    // Log the received trading signal
    console.log(`Received signal from TradingView: ${signal} for ${symbol} on ${exchange} using strategy ${strategy}`);

    // Further actions based on the trading signal
    // For example: execute trades, update database, etc.

    // Send a response to acknowledge receipt of the webhook
    res.status(200).send('Webhook received successfully');
    } catch (error) {
        res.status(501).json({message:'Internal Server Error'});
    }
});

module.exports = router;