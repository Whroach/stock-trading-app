const { finnhub_token, tiingo_token } = process.env
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat
} = require('graphql');



const EquityType = new GraphQLObjectType({
  name: 'EquityMarket',
  fields: () =>({
    ticker: { type: GraphQLNonNull(GraphQLString) },
    last: { type: GraphQLNonNull(GraphQLFloat)},
    prevClose: { type: GraphQLFloat},
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



const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () =>({
    ticker: { type: GraphQLNonNull(GraphQLString)},
    name: { type: GraphQLNonNull(GraphQLString)},
    exchangeCode: { type: GraphQLNonNull(GraphQLString)},
    description: { type: GraphQLNonNull(GraphQLString)}
  })
})



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
        const n = 100

        await axios.get(`wss://api.tiingo.com/iex?token=${tiingo_token}`)
        .then(res => newArray = [...res.data])

        // var today = new Date();

        let date = '2020-08'


        for(i = 0; i < newArray.length; i++){

          if(newArray[i].ticker === "QQQ" || newArray[i].ticker === "SPY" || newArray[i].ticker === "DIA"){
              indexArray.push(newArray[i])
          }

          if(newArray[i].last > newArray[i].prevClose && newArray[i].prevClose > .50 && newArray[i].volume > 500000 && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            gainArray.push(newArray[i])

          }
          
          if(newArray[i].last < newArray[i].prevClose && newArray[i].last > 5.00 && newArray[i].volume > 1000000 && newArray[i] !== null && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            declineArray.push(newArray[i])
          };

          if(newArray[i].volume > 10000000 && newArray[i].last > 1 && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            activeArray.push(newArray[i])

          }

        };


        var newGain = gainArray.map(function(el) {
          var newObj = Object.assign({}, el);

          newObj.percentChange = 100 * Math.abs((el.last - el.prevClose) / el.prevClose)
      
          return newObj;
        
        })

        

        var newDecline = declineArray.map(function(el) {
          var newObj = Object.assign({}, el);
          newObj.percentChange = 100 * Math.abs((el.last - el.prevClose) / el.prevClose)
      
          return newObj;
        
        })
        
        const positiveList = newGain.sort(function(a,b){
          return b.percentChange - a.percentChange
        })




        const activeList = activeArray.sort((a,b)=>{
          return b.volume - a.volume

        })



        const negativeList = newDecline.sort((a,b)=>{
          return a.last / a.prevClose -b.last / b.prevClose

        })


        let result = [...indexArray,...positiveList.slice(0,n), ...negativeList.slice(0,n), ...activeList.slice(0,200)]


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

    profile: {
      type: new GraphQLList(ProfileType),
      args: {
        ticker: {type: GraphQLString}
      },
      resolve: async(parent, args)=>{

        let array = []

        await axios
        .get(`https://api.tiingo.com/tiingo/daily/${args.ticker}?token=${tiingo_token}`)
        .then(res => array.push(res.data))

        return array


      }
    }

//end
}});

module.exports = new GraphQLSchema({
  query: RootQuery
});