const request = require('request'),
    {finnhub_token, tiingo_token} = process.env

module.exports = {
    getStockQuotes: async(req,res) =>{

        var requestOptions = {
            'url': `https://api.tiingo.com/iex/?tickers=dia,spy,qqq&token=${tiingo_token}`,
            'headers': {
                'Content-Type': 'application/json'
                }
        };
        
        const result = new Promise((resolve, reject) =>{
            request(requestOptions,
                function(error, response) {
                    if(error) return reject(error);

                    return resolve(JSON.parse(response.body))
                }
            )

        });

        var stockApi = await result

        res.status(200).send(stockApi)

    },

    getSingleQuote: async(req,res) =>{
        const { symbol } = req.params

        var requestOptions = {
            'url': `https://api.tiingo.com/iex/?tickers=${symbol}&token=${tiingo_token}`,
            'headers': {
                'Content-Type': 'application/json'
                }
        };
        
        const result = new Promise((resolve, reject) =>{
            request(requestOptions,
                function(error, response) {
                    if(error) return reject(error);

                    return resolve(JSON.parse(response.body))
                }
            )

        });

        var stockApi = await result
        res.status(200).send(stockApi[0])

    },

    getCompanyReport: async(req,res) =>{
        const { symbol } = req.params


        var requestOptions = {
            'url': `https://api.tiingo.com/tiingo/fundamentals/${symbol}/daily?token=${tiingo_token}`,
            'headers': {
                'Content-Type': 'application/json'

                },

        };
            
        const result = new Promise((resolve, reject) =>{
            request(requestOptions,
                function(error, response) {
                    if(error) return reject(error);

                    return resolve(JSON.parse(response.body))
                }
            )

        });

        

        var stockApi = await result

        res.status(200).send(stockApi[0])


    },





};