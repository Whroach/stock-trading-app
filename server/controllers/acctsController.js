module.exports = {

    depositFunds: async (req,res) =>{
        const db = req.app.get('db'),
            { deposit } = req.body,
            { id } = req.params

            console.log(date)
        
        let result = await db.accounts.deposits({deposit, id})

        res.status(200).send(result[0])


    },

    accountHistory: async(req,res) =>{
        const db = req.app.get('db'),
            { id } = req.params

            // let history = await db.query("SELECT DISTINCT(aa.timestamp), aa.symbol, aa.quantity, aa.action_type from accounts AS a JOIN account_assets AS aa ON a.account_id = aa.client_id WHERE a.account_id = $1", [`${id}`])
        
            let result = await db.accounts.history({id})
        
            res.status(200).send(result)

    }



};