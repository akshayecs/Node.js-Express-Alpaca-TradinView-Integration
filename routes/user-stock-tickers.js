const router = require('express').Router();
const axios = require('axios');
const { response } = require('express');
const fetch = require('node-fetch');
// const Alpaca = require('@alpacahq/alpaca-trade-api');
// const sdk = require('api')('@testalpacadocs/v1#ehawgls1rwbpk');



router.get('/preferences', (req, res) => {
    try {
        res.render('apiCredentials');
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
  

router.get('/get-account',async(req,res) => {
  try {
    // Extract API key and API secret from request body
    const { api_key, api_secret } = req.body;

    const sdk = require('api')('@testalpacadocs/v1#600zhmmls1qtvmf');

    // sdk.auth(api_key);
    // sdk.auth(api_secret);
    // sdk.getV2Assets({attributes: ''})
    //   .then(({ data }) => console.log(data))
    //   .catch(err => console.error(err));
  
      const options = {
        method: 'GET',
        url: 'https://paper-api.alpaca.markets/v2/assets?attributes=',
        headers: {
          accept: 'application/json',
          'APCA-API-KEY-ID': api_key,
          'APCA-API-SECRET-KEY': api_secret
        }
      };

      axios.request(options).then(function (response) {
          console.log(response.data);
          res.status(200).send({message:"Success",data:response.data})
        }).catch(function (error) {
          throw new Error
        });
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get('/get-stocks',async (req,res) => {
    try {
        // Extract API key and API secret from request body
        const { api_key, api_secret } = req.body;

        async function createAlpacaInstance() {
          return new Promise((resolve, reject) => {
              const alpaca = new this.Alpaca({
                  keyId: api_key,
                  secretKey: api_secret,
                  paper: true // Set to true if you are using the Alpaca paper trading API
              });
  
              // Resolve the promise with the Alpaca instance
              resolve(alpaca);
          });
      }
      
      const alpaca = await createAlpacaInstance();
      //   console.log("Hello");

        const assets = await alpaca.getAccount();

        if (!response.ok) {
            throw new Error('Failed to fetch stocks details from Alpaca API');
        }

        const data = await response.json();
        const stocks = data.filter(asset => asset.class === 'us_equity').map(asset => ({
            symbol: asset.symbol,
            name: asset.name
        }));
        
        // Render the preference.ejs template and pass the list of stocks as data so that 
        // user can choose the stocks by there preference and save it
        res.render('preference', { stocks });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for adding ticker preferences
router.post('/add-stocks', async (req, res) => {
    try {
      const { email, stocks } = req.body;
  
      // Find user by userId and update preferences
      const user = await User.findOne({Email:email});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      // Create user in the database
      const stock = new Stocks({uuid:uuidv4(), Username:username, Email:email, Stocks:stocks });
      const response = await stock.save();
      
      res.status(200).send({ message: 'Preferences updated successfully' ,data:response});
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  //         const url = 'https://paper-api.alpaca.markets/v2/account';;
        
//         const options = {
//           method: 'GET',
//           headers: {
//             accept: 'application/json',
//             authorization: 'Basic YWtzaGF5ZGV2ZWxvcGVyOnRlc3QxQEFwbGFjYV9icm9rZXJfYXBp'
//           }
//         };

//         const data = await fetch(url, options)
//         .then(res => res.json(), console.log("res>>>>>",res))
//         .then(json => console.log(json))
//         .catch(err => console.error('error:' + err));
        
// // const stocks = await sdk.getAssets({status: 'all', asset_class: 'us_equity', attributes: ''})
// // .then(({ data }) => console.log(data))
// // .catch(err => console.error(err));

        // console.log("stocks>>>>>>",stocks);
                // const alpaca = new Alpaca({
                //   keyId: api_key,
                //   secretKey: api_secret,
                //   paper: true // Set to true if you are using the Alpaca paper trading API
                // });

  // Assets API
  // Get All Assets
  // Calls GET /assets and returns assets matching your parameters.
  
  // getAssets({
  //   status: 'active' | 'inactive',
  //   asset_class: string
  // }) => Promise<Asset[]>
  // Get information about an asset
  // Calls GET /assets/{symbol} and returns an asset entity.
  
  // getAsset(symbol) => Promise<Asset>

module.exports = router;