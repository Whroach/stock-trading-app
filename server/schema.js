const { finnhub_token, tiingo_token } = process.env
const axios = require('axios');
const { dummyDataArray } = require('./dummydata')

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

const TestType = new GraphQLObjectType({
  name: 'TestData',
  fields: ()=>({
    symbol: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLFloat)},
    prev: { type: GraphQLNonNull(GraphQLFloat)},
    v: {type: GraphQLNonNull(GraphQLInt)}

  })
})


const EquityType = new GraphQLObjectType({
  name: 'EquityMarket',
  fields: () =>({
    ticker: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLFloat)},
    prevClose: { type: GraphQLNonNull(GraphQLFloat)},
    open: { type: GraphQLNonNull(GraphQLFloat)},
    high: { type: GraphQLNonNull(GraphQLFloat)},
    low: { type: GraphQLNonNull(GraphQLFloat)},
    volume: { type: GraphQLNonNull(GraphQLFloat)},
    bidPrice: { type: GraphQLFloat},
    askPrice: { type: GraphQLFloat}

  })
});


const EquityNewsType = new GraphQLObjectType({
  name: 'EquityNews',
  fields: () => ({
    headline: { type: GraphQLNonNull(GraphQLString)}
  })
});

// const ProfileType = new GraphQLObjectType({
//   name: 'Profile',
//   fields: () =>({
//     country: { type: GraphQLNonNull(GraphQLString)},
//     currency: { type: GraphQLNonNull(GraphQLString)},
//     name: { type: GraphQLNonNull(GraphQLString)},
//     exchage: { type: GraphQLNonNull(GraphQLString)},
//     finnhubIndustry: { type: GraphQLNonNull(GraphQLString)},
//     ipo: { type: GraphQLNonNull(GraphQLString)},
//     logo: { type: GraphQLNonNull(GraphQLString)},
//     marketCapitalization: { type: GraphQLNonNull(GraphQLFloat)},
//     phone: { type: GraphQLNonNull(GraphQLString)},
//     shareOutstanding: { type: GraphQLNonNull(GraphQLFloat)},
//     ticker: { type: GraphQLNonNull(GraphQLString)},
//     weburl: { type: GraphQLNonNull(GraphQLString)}
//   })
// })



const CryptoType = new GraphQLObjectType({
  name: 'CryptoMarket',
  fields: () => ({
    ticker: {type: GraphQLNonNull(GraphQLString)},
    baseCurrency: {type:GraphQLNonNull(GraphQLString)},
    quoteCurrency: {type: GraphQLNonNull(GraphQLString)},
    topOfBookData: {type: new GraphQLObjectType({
      name: 'data',
      fields: ()=>({
        askSize: {type: GraphQLFloat},
        askPrice: {type:GraphQLFloat}
      })
    })}
  })
});



const CryptoPriceType = new GraphQLObjectType({
  name: 'CryptoPrice',
  fields: () => ({
    // lastPrice: {type: GraphQLNonNull(GraphQLFloat)},
    volume: {type: GraphQLFloat},
    askPrice: {type:GraphQLFloat}

  })
})

const ForexType = new GraphQLObjectType({
  name: 'ForexData',
  fields: ()=>({
    base: {type: GraphQLString},
    quote: {type: GraphQLList}
  })
})



// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {    
    equities: {
      type: new GraphQLList(EquityType),
      resolve: async(parent, args) => {
        let newArray = []
        let gainArray = []
        let declineArray = []
        let indexArray = []
        let activeArray = []
        let n = 100

        await axios.get(`wss://api.tiingo.com/iex?token=${tiingo_token}`)
        .then(res => newArray = [...res.data])

        // && newArray[i].ticker =="dia" && newArray[i].ticker =="spy"

        for(i = 0; i < newArray.length; i++){
          if(newArray[i].ticker === "QQQ" || newArray[i].ticker === "SPY" || newArray[i].ticker === "DIA"){
              indexArray.push(newArray[i])
          };

          if(newArray[i].last > newArray[i].prevClose  && newArray[i].last > 5.00 && newArray[i].volume > 500000 && newArray[i] !== null){
            gainArray.push(newArray[i])
          }
          
          if(newArray[i].last < newArray[i].prevClose  && newArray[i].last > 5.00 && newArray[i].volume > 500000 && newArray[i] !== null){
            declineArray.push(newArray[i])
          };

          if(newArray[i].volume > 10000000 && newArray[i].last > 10.00){
            activeArray.push(newArray[i])

          }

        };

        const activeList = activeArray.sort((a,b)=>{
          return b.last / b.prevClose - a.last / a.prevClose

        })


        const positiveList = gainArray.sort((a,b)=>{
          return b.last / b.prevClose - a.last / a.prevClose

        })

        const negativeList = declineArray.sort((a,b)=>{
          return b.last / b.prevClose - a.last / a.prevClose

        })



         let result = [...positiveList.slice(0,n), ...indexArray, ...negativeList.slice(0,n), ...activeList.slice(0,200)]

         return result



      }
    },
    equity: {
      type: new GraphQLList(EquityType),
      args: {
        ticker: { type: GraphQLString }
      },
      resolve: async(parent, args) =>{
        let stockArray = []

        await axios
        .get(`https://api.tiingo.com/iex/?tickers=${args.ticker}&token=${tiingo_token}`)
        .then(res => stockArray = [...res.data])

        return stockArray
      }
    },
    companyNews: {
      type: new GraphQLList(EquityNewsType),
      args: {
        ticker: {type: GraphQLString}
      },
      resolve: async (parent, args) =>{
        let array = []
        
        await axios
        .get(`https://finnhub.io/api/v1/company-news?symbol=${args.ticker}&from=2020-08-01&to=2020-08-02&token=${finnhub_token}`)
        .then(res => array = [...res.data])

        return array
      }
    },

    crypto:{
      type: new GraphQLList(CryptoType),
      resolve: async(parent, args) =>{
        let topPairs = []
        let array = []
        let filter = []

        await axios
        .get(`https://api.tiingo.com/tiingo/crypto?token=${tiingo_token}`)
        .then(res => array = [...res.data])


        // for(i = 0; i < array.length; i++){
        //   if(array[i].ticker === "ethbtc" || array[i].ticker === "ltcbtc" || array[i].ticker === "xrpbtc"){
        //       topPairs.push(array[i])
        //   };

          // if(array[i]){
          //   gainArray.push(array[i])
          // }
          
          // if(array[i].last > array[i].prevClose  && array[i].last > 5.00 && array[i].volume > 500000 && array[i] !== null){
          //   declineArray.push(array[i])
          // };

        // };


        return array

      }
    },

    cryptoPrice: {
      type: new GraphQLList(CryptoPriceType),
      resolve: async(parent, args) =>{
        let array = []

        await axios
        .get(`https://api.tiingo.com/tiingo/crypto?&token=${tiingo_token}`)
        .then(res => array = [...res.data])
        
        return array
      }
    },


    // forex: {
    //   type: new GraphQLList(ForexType),
    //   resolve: async(parent, args)=>{
    //     let array = []

    //     await axios
    //     .get(`https://finnhub.io/api/v1/forex/rates?base=USD&token=${finnhub_token}`)
    //     .then(res => console.log(res.data))

    //     return array
    //   }
    // },

    testData: {
      type: new GraphQLList(TestType),
      resolve: (parent,args)=>{

        return dummyDataArray

      }
    }



//end
}});

module.exports = new GraphQLSchema({
  query: RootQuery
});