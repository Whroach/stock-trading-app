
module.exports = {

    buyOrder: async(req,res) =>{
        const db = req.app.get('db')
        const { price } = req.body
        let newValue = parseInt(price)

        console.log(newValue)

        // await db.query("INSERT INTO users_positions VALUES $1", [`${newValue}`])

        await db.accounts.buy_order({newValue})

        res.status(200).send('Success')

        
    },

    sellOrder: async(req,res) => {

    },




};