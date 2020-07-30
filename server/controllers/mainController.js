
module.exports = {

    buyOrder: async(req,res) =>{
        const db = req.app.get('db')
        const { symbol, quantity, bid_price, ask_price, order_type, action_type, asset_type, id } = req.body
        // let newNum = parseInt(quantity)
        // console.log(quantity)

        /*will add logic to determine if users account balance is >= the ask_price * quantity.
        If(TRUE) = send the axios request to the server. else{reject the order and send an alert saying "You do not have enough funds for this purchase."}
        */


        console.log(req.body)

        await db.orders.buy_order({symbol, quantity, bid_price, ask_price, order_type, id, action_type, asset_type})


        res.status(200).send('Success')

        
    },

    sellOrder: async(req,res) => {

        const db = req.app.get('db'),
            value = req.params.id,
            {symbol, quantity} = req.body,
            id = parseInt(value)


        const findPosition = await db.orders.find_position({id, symbol})
        
        // console.log(findPosition)
        console.log(findPosition)


        if(findPosition[0]){
            findPosition.map((element) => {
                // console.log(element.quantity)
                if(element.quantity < 0 ){
                    console.log('hit bad')
                    return res.status(400).send('Unable to process your request as the position may not exist in your holdings.')
                }
            })

        };


        //FIFO method

        let t_id = findPosition[0].transaction_id
        // console.log(t_id)
        const savedArray = findPosition.map(obj => ({...obj}));



        if(findPosition[0].quantity === quantity){
          await db.orders.sell_order({t_id, c_id, quantity})

        }


        function count(findPosition){
          findPosition.filter((value) => {
            while(value.quantity > 0 && number > 0) {

            value.quantity--;
            number--;
            }})
          };
          
        
        
        findPosition.forEach(function(item) {
          var ItemIndex = savedArray.findIndex(e => e.quantity <= item.quantity);
        
          findPosition.splice(ItemIndex, 0)
        
        })
        
        await db.orders.reduce_position({quantity, t_id})







        res.status(200).send(tradeSize)



        

    },




};