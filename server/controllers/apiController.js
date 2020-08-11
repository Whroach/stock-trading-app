const { printSourceLocation } = require('graphql');

const {finnhub_token, tiingo_token} = process.env,
    axios = require('axios')

module.exports={
    getProfile: async(req,res) =>{
        const { ticker } = req.params

        let combineResults = []

        let profile = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${finnhub_token}`)
        .then(res => res.data)
        .catch(error => console.log(error))

        let peers = await axios.get(`https://finnhub.io/api/v1/stock/peers?symbol=${ticker}&token=${finnhub_token}`)
        .then(res => res.data)
        .catch(error => console.log(error))


        combineResults = [...peers,{...profile}]




        res.status(200).send(combineResults)
        
    },

    getForexRates: async(req,res)=>{

    
      let rates = await axios.get(`https://api.tiingo.com/tiingo/fx/top?tickers=EURUSD,USDJPY,GBPUSD,USDCHF,AUDUSD,USDCAD,NZDUSD,GBPEUR,EURCHF,EURJPY&token=${tiingo_token}`)
        .then(res => res.data)
        .catch(error => console.log(error))

        res.status(200).send(rates)
    },

    getFinancialReport: async(req,res)=>{
        const { ticker } = req.params


        let report = await axios.get(`https://api.tiingo.com/tiingo/fundamentals/${ticker}/statements?token=${tiingo_token}`)
        .then(res => res.data)
        .catch(error => console.log(error))

        
        res.status(200).send(report[0].statementData)




    }

};
