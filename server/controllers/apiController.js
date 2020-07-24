const axios = require('axios'),
    request = require('request'),
    {finnhub_token, tiingo_token} = process.env

module.exports = {

    getStockQuotes: async(req,res) =>{

        var requestOptions = {
            'url': `https://api.tiingo.com/iex/?tickers=spy&token=${tiingo_token}`,
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

        // console.log(stockApi[0])

        res.status(200).send(stockApi[0])

    },

    getCompanyProfile: async(req,res) =>{
        const string = req.params.symbol
        let newStr = string.toString()

        console.log(newStr)

        let result = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${newStr}&token=${finnhub_token}`)

        if(!result[0]){
            return res.status(404).send('Unable to process your search request, please try again.')
        }
        else{
            res.status(200).send(result)
        }


    
    }





};