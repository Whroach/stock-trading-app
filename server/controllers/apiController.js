    
    const request = require('request'),
        {finnhub_token, tiingo_token} = process.env

module.exports = {

    getStockQuotes: async(req,res) =>{

        var requestOptions = {
            'url': `https://api.tiingo.com/iex/?tickers=NKE&token=${tiingo_token}`,
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

    getSingleQuote: async(req,res) =>{
        const { symbol } = req.params
        console.log(symbol)

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

    // getCompanyProfile: async(req,res) =>{
    //     const { symbol } = req.params

    //         var findProfile = {
    //             'url': `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${finnhub_token}`
    //         }
    //         const companysProfile = new Promise((resolve, reject) =>{ request(findProfile, (error,res)=>{
    //             if(error) return reject(error);

    //             return resolve(JSON.parse(res.body))

    //             })
    //         }); 


            
    //     var profileApi = await companysProfile
    //     // console.log(profileApi)

    //     res.status(200).send(profileApi)



    // },





};