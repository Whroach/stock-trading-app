// const request = require('request'),
//     {finnhub_token, tiingo_token} = process.env;

// module.exports = {
//     getStockQuotes: async(req,res) =>{

//         var requestOptions = {
//             'url': `https://api.tiingo.com/iex/?tickers=dia,spy,qqq&token=${tiingo_token}`,
//             'headers': {
//                 'Content-Type': 'application/json'
//                 }
//         };
        
//         const result = new Promise((resolve, reject) =>{
//             request(requestOptions,
//                 function(error, response) {
//                     if(error) return reject(error);

//                     return resolve(JSON.parse(response.body))
//                 }
//             )

//         });

//         var quotesApi = await result

//         res.status(200).send(quotesApi)

//     },

//     getSingleQuote: async(req,res) =>{
//         const { symbol } = req.params

//         var requestOptions = {
//             'url': `https://api.tiingo.com/iex/?tickers=${symbol}&token=${tiingo_token}`,
//             'headers': {
//                 'Content-Type': 'application/json'
//                 }
//         };
        
//         const result = new Promise((resolve, reject) =>{
//             request(requestOptions,
//                 function(error, response) {
//                     if(error) return reject(error);

//                     return resolve(JSON.parse(response.body))
//                 }
//             )

//         });

//         var oneQuoteApi = await result
//         res.status(200).send(oneQuoteApi[0])

//     },

//     getCompanyReport: async(req,res) =>{
//         const { symbol } = req.params


//         var requestOptions = {
//             'url': `https://api.tiingo.com/tiingo/fundamentals/${symbol}/daily?token=${tiingo_token}`,
//             'headers': {
//                 'Content-Type': 'application/json'

//                 },

//         };
            
//         const result = new Promise((resolve, reject) =>{
//             request(requestOptions,
//                 function(error, response) {
//                     if(error) return reject(error);

//                     return resolve(JSON.parse(response.body))
//                 }
//             )

//         });

        

//         var companyReportApi = await result

//         res.status(200).send(companyReportApi[0])


//     },

//     getDowQuotes: async(req,res) =>{
        
//         var requestOptions = {
//             'url': `https://api.tiingo.com/iex/?tickers=mmm,axp,aapl,ba,cat,cvx,csco,ko,dis,dow,xom,gs,hd,ibm,intc,jnj,jpm,mcd,mrk,msft,nke,pfe,pg,rtx,trv,unh,vz,v,wmt,wba&token=${tiingo_token}`,
//             'headers': {
//                 'Content-Type': 'application/json'
//                 }
//         };
        
//         const result = new Promise((resolve, reject) =>{
//             request(requestOptions,
//                 function(error, response) {
//                     if(error) return reject(error);

//                     return resolve(JSON.parse(response.body))
//                 }
//             )

//         });

//         var dowIndex = await result

//         res.status(200).send(dowIndex)
//     }




// };