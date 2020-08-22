
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
        await db.orders.record_buy({symbol, quantity, bid_price, ask_price, order_type, id, action_type, asset_type})

        let total = quantity * ask_price
        await db.accounts.reduce_cash(total, id)
        .catch(error => console.log(error))


        res.status(200).send('Success')

        
    },

    sellOrder: async(req,res) => {

        const db = req.app.get('db'),
            value = req.params.id,
            {symbol, quantity, bid_price, ask_price} = req.body,
            id = parseInt(value)





        const findPosition = await db.orders.find_position({id, symbol, quantity})


        
            findPosition.forEach( async(element) => {
                // console.log(element.quantity)
                if(element.quantity <= 0 || element.quantity < quantity){
                    console.log('hit bad')
                    return res.status(400).send('Unable to process your request as the position may not exist in your holdings.')
                }
                else{
                    // await db.query("WITH order_history AS ( UPDATE account_assets SET quantity = quantity - $1 WHERE client_id = $2 AND symbol = $3 RETURNING symbol, $4, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) INSERT INTO order_history(symbol, quantity, bid_price, ask_price, action_type, order_type, asset_type, timestamp, transaction_id, client_id) SELECT symbol, quantity, $5, $6, $7, $8, asset_type, timestamp, transaction_id,client_id FROM order_history", [`${quantity}`,`${id}`, `${symbol}`, `${quantity}`,`${bid_price}`, `${ask_price}`, `SELL`, `MARKET`])
                    await db.orders.reduce_position({symbol, quantity, id, bid_price, ask_price})

                    let total = quantity * bid_price
                    await db.accounts.add_cash(total, id)
                    .catch(error => console.log(error))
                    
                    return res.sendStatus(200)
            }})
         
        },




};