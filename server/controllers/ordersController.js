
module.exports = {

    buyOrder: async(req,res) =>{
        const db = req.app.get('db')
        const { symbol, quantity, bid_price, ask_price, id } = req.body
        const action_type = 'BUY'
        const asset_type = 'EQUITY'
        const order_type = 'MARKET'
 

        /*will add logic to determine if users account balance is >= the ask_price * quantity.
        If(TRUE) = send the axios request to the server. else{reject the order and send an alert saying "You do not have enough funds for this purchase."}
        */

        await db.orders.buy_order({symbol, quantity, bid_price, ask_price, order_type, id, action_type, asset_type})


        res.status(200).send('Success')

        
    },

    sellOrder: async(req,res) => {

        const db = req.app.get('db'),
            value = req.params.id,
            {symbol, quantity, bid_price, ask_price} = req.body,
            id = parseInt(value)




        const findPosition = await db.orders.find_position({id, symbol, quantity})
        
        if(findPosition[0]){
            findPosition.map((element) => {
                // console.log(element.quantity)
                if(element.quantity <= 0 ){
                    console.log('hit bad')
                    return res.status(400).send('Unable to process your request as the position may not exist in your holdings.')
                }
                else{
                    db.query("WITH order_history AS ( UPDATE account_assets SET quantity = quantity - $1 WHERE client_id = $2 AND symbol = $3 RETURNING symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) INSERT INTO order_history(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) SELECT symbol, quantity, $4, $5, $6, $7, asset_type, timestamp, transaction_id,client_id FROM order_history", [`${quantity}`,`${id}`, `${symbol}`, `${bid_price}`, `${ask_price}`, `SELL`, `MARKET`])
                    res.sendStatus(200)

                }
            })
        }
        else{
            res.status(400).send('Bad Request')
        };

        // if(element.quantity > 0){
        //     db.query("WITH order_history AS ( UPDATE account_assets SET quantity = quantity - $1 WHERE client_id = $2 AND symbol = $3 RETURNING symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) INSERT INTO order_history(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) SELECT * FROM order_history", [`${quantity}`,`${id}`, `${symbol}`])

        // }


        // await db.orders.sell_order({quantity, id, symbol})

        // res.sendStatus(200)


        //FIFO method

        // let t_id = findPosition[0].transaction_id
        // // console.log(t_id)
        // const savedArray = findPosition.map(obj => ({...obj}));


        // if(findPosition[0].quantity === quantity){
        //   await db.orders.sell_order({t_id, c_id, quantity})

        // }


        // function count(findPosition){
        //   findPosition.filter((value) => {
        //     while(value.quantity > 0 && number > 0) {

        //     value.quantity--;
        //     number--;
        //     }})
        //   };
          
        
        
        // findPosition.forEach(function(item) {
        //   var ItemIndex = savedArray.findIndex(e => e.quantity <= item.quantity);
        
        //   findPosition.splice(ItemIndex, 0)
        
        // })
        
        // await db.orders.reduce_position({quantity, t_id})

    },




};