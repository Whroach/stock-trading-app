const { finnhub_token, tiingo_token } = process.env
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');


const EquityType = new GraphQLObjectType({
  name: 'EquityMarket',
  fields: () =>({
    ticker: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLFloat)},
    prevClose: { type: GraphQLNonNull(GraphQLFloat)}

  })
});


const CryptoType = new GraphQLObjectType({
  name: 'CryptoMarket',
  fields: () => ({
    ticker: {type: GraphQLNonNull(GraphQLString)},
    baseCurrency: {type:GraphQLNonNull(GraphQLString)},
    quoteCurrency: {type: GraphQLNonNull(GraphQLString)},
    priceData: {type: CryptoPriceType}

  })
});

const CryptoPriceType = new GraphQLObjectType({
  name: 'CryptoPrice',
  fields: () => ({
    open: {type: GraphQLNonNull(GraphQLFloat)},
    high: {type: GraphQLNonNull(GraphQLFloat)},
    low: {type:GraphQLNonNull(GraphQLFloat)},
    volume: {type: GraphQLNonNull(GraphQLFloat)}

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
        let gArray = []
        let bArray= []
        let n = 20

        await axios.get(`https://api.tiingo.com/iex/?tickers=aapl,spy&token=${tiingo_token}`)
        .then(res => newArray = [...res.data])

        
        for(i = 0; i < newArray.length; i++){
          if(newArray[i].last > newArray[i].prevClose){
          gArray.push(newArray[i])
          }
          else{
            bArray.push(newArray[i])
          }
        
        };

        return gArray.slice(0,n)


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
    // crypto: {
    //   type: new GraphQLList(CryptoType),
    //   resolve: async(parent, args) => {
    //     let cryptoArray = []

    //     await axios
    //     .get(`https://api.tiingo.com/tiingo/crypto?&token=${tiingo_token}`)
    //     .then(res => cryptoArray.push(res.data))

    //     return cryptoArray


    //   }
    // },










    // finnApi: {
    //   type: new GraphQLList(FinType),
    //   args: {
    //     ticker: {type: GraphQLString}
    //   },
    //   resolve: async (parent, args) =>{

    //     let array = []
        
    //     await axios
    //     .get(`https://finnhub.io/api/v1/stock/profile2?symbol=${args.ticker}&token=${finnhub_token}`)
    //     .then(res => {
    //       array.push(res.data)
    //     })


    //     return array
    //   }

    // },



  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});