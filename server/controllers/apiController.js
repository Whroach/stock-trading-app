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

    getFinancialReport: async(req,res)=>{
        const { ticker } = req.params

        let result = await axios.get(`https://api.tiingo.com/tiingo/fundamentals/${ticker}/statements?token=${tiingo_token}`)
        .then(res => {return res.data})
        .catch(error => console.log(error))

        res.status(200).send(result[0].statementData)

    },

    getAllQuotes: async(req,res)=>{

        let finalData =[] 

        await axios.get(`https://api.tiingo.com/iex?token=${tiingo_token}`)
        .then(res => {
          let newArray = [...res.data]
          let gainArray = []
          let declineArray = []
          let indexArray = []
          let activeArray = []
          const n = 100

          const date = '2020-09'


          for(let i = 0; i < newArray.length; i++){

          if(newArray[i].ticker === "QQQ" || newArray[i].ticker === "SPY" || newArray[i].ticker === "DIA"){
              indexArray.push(newArray[i])
          }

          if(newArray[i].last > newArray[i].prevClose && newArray[i].prevClose > .50 && newArray[i].volume > 500000 && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            gainArray.push(newArray[i])

          }
          
          if(newArray[i].last < newArray[i].prevClose && newArray[i].last > .50 && newArray[i].volume > 500000 && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            declineArray.push(newArray[i])
          };

          if(newArray[i].volume > 10000000 && newArray[i].last > 1 && newArray[i].lastSaleTimestamp.slice(0,7) === date){
            activeArray.push(newArray[i])

          }

        };

        const newGain = gainArray.map(function(el) {
          var newObj = Object.assign({}, el);

          newObj.percentChange = 100 * Math.abs((el.last - el.prevClose) / el.prevClose)
      
          return newObj;
        
        })
        

        const newDecline = declineArray.map(function(el) {
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
          return a.last / a.prevClose - b.last / b.prevClose 

        })

        const newIndex = [...indexArray]
        const newGainer = [...positiveList.splice(0,n)]
        const newLoser = [...negativeList.splice(0,n)]
        const newActive = [...activeList.splice(0,200)]

        // const result = [...indexArray,...positiveList.slice(0,n), ...negativeList.slice(0,n), ...activeList.slice(0,200)]
        
        
        finalData = newIndex.concat(newGainer, newLoser, newActive)

        })
        .catch(error => console.log(error))

        res.status(200).send(finalData)




    }

};
