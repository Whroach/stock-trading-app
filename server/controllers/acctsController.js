module.exports = {

    depositFunds: async (req,res) =>{
        const db = req.app.get('db'),
            { deposit } = req.body,
            { id } = req.params

            console.log(deposit)
        
        let result = await db.accounts.deposits({deposit, id})

        res.status(200).send(result[0])


    },



};