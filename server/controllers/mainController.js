const { getNodeText } = require("@testing-library/react");

module.exports = {

    buyOrder: async(req,res) =>{
        const db = req.app.get('db')
        const { symbol, quantity, bid_price, ask_price, order_type, id } = req.body
        // let newNum = parseInt(quantity)
        // console.log(quantity)

        /*will add logic to determine if users account balance is >= the ask_price * quantity.
        If(TRUE) = send the axios request to the server. else{reject the order and send an alert saying "You do not have enough funds for this purchase."}
        */


        console.log(req.body)

        await db.orders.buy_order({symbol, quantity, bid_price, ask_price, order_type, id})

        res.status(200).send('Success')

        
    },

    sellOrder: async(req,res) => {
        const db = req.app.get('db'),
            id = req.params,
            {symbol, quantity, bid_price, ask_price} = req.body

        let findPosition = await db.orders.find_position({quantity, id, symbol})
        
        console.log(findPosition)


        if(findPosition[0]){
            findPosition.map((element,index) => {
                if(element.quantity > 0){
                    return next()
                }
                else{
                    return res.status(400).send('Unable to process your request. Please reduce quantity amount.')
                }
                 
            })

        }

        // let tradeSize = findPosition.map((element,index) => {
        //     if(quantity === element.quantity){

        //     }
        // })




        

    },




};