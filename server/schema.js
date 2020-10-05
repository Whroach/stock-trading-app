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
    askPrice: { type: GraphQLFloat},
    lastSaleTimestamp: {type: GraphQLFloat}

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




// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {    
    equities: {
      type: new GraphQLList(EquityType),
      resolve: async(parent, args) => {

        return await axios.get(`https://api.tiingo.com/iex?token=${tiingo_token}`)
        .then(res => {
          const date = '2020-10'
          let newArray = [...res.data]
          let gainArray = []
          let declineArray = []
          let indexArray = []
          let activeArray = []
          const n = 100

          for(let i = 0; i < newArray.length; i++){
          if(newArray[i].ticker === "QQQ" || newArray[i].ticker === "SPY" || newArray[i].ticker === "DIA"){
              indexArray.push(newArray[i])
          }

          if(newArray[i].last > newArray[i].prevClose && newArray[i].last > .50){
            gainArray.push(newArray[i])

          }
          
          if(newArray[i].last < newArray[i].prevClose && newArray[i].last > .50){
            declineArray.push(newArray[i])
          };

          if(newArray[i].volume > 1000000 && newArray[i].last > 1){
              activeArray.push(newArray[i])
          }

        };


        const newGain = gainArray.filter(function(el) {
          if(el.timestamp.includes(date)){
            let newObj = Object.assign({}, el);

            newObj.percentChange = 100 * Math.abs((el.last - el.prevClose) / el.prevClose)

            return newObj;
            
          }
        })
                
        const positiveList = newGain.sort(function(a,b){
          return b.percentChange - a.percentChange
        })


        const newDecline = declineArray.filter(function(el) {
          if(el.timestamp.includes(date)){
          let newObj = Object.assign({}, el);
          newObj.percentChange = 100 * Math.abs((el.last - el.prevClose) / el.prevClose)
      
          return newObj;
          }
        
        })

        const negativeList = newDecline.sort((a,b)=>{
          return a.last / a.prevClose - b.last / b.prevClose 

        })



        const filterActive = activeArray.filter(function(el){
          if(el.timestamp.includes(date)){
            return el
          }
        })


        

        const activeList = filterActive.sort((a,b)=>{
          return b.volume - a.volume

        })

        const newIndex = [...indexArray]
        const newGainer = [...positiveList.splice(0,n)]
        const newLoser = [...negativeList.splice(0,n)]
        const newActive = [...activeList.splice(0,200)]

        return finalData = newIndex.concat(newGainer, newLoser, newActive)

        })
        .catch(error => console.log(error))

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
        .catch(error => console.log(error))

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
        .catch(error => console.log(error))

        return array
      }
    },


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
        .catch(error => console.log(error))

        return array


      }
    }

//end
}});

module.exports = new GraphQLSchema({
  query: RootQuery
});