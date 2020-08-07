module.exports = {

    depositFunds: async (req,res) =>{
        const db = req.app.get('db'),
            { deposit } = req.body,
            { id } = req.params

        
        let result = await db.accounts.deposits({deposit, id})

        res.status(200).send(result[0])


    },

    accountHistory: async(req,res) =>{
        const db = req.app.get('db'),
            { id } = req.params

            // let history = await db.query("SELECT DISTINCT(aa.timestamp), aa.symbol, aa.quantity, aa.action_type from accounts AS a JOIN account_assets AS aa ON a.account_id = aa.client_id WHERE a.account_id = $1", [`${id}`])
        
            let result = await db.accounts.history({id})
        
            res.status(200).send(result)

    },

    addToWatchlist: async(req,res) =>{
        const db = req.app.get('db'),
            { id } = req.params,
             { symbol }  = req.body

            let result = await db.accounts.add_watchlist({symbol, id})

            res.status(200).send(result)

    },

    getWatchlist: async(req,res)=>{
        const db = req.app.get('db'),
            { id } = req.params

            let result = await db.query("SELECT * FROM users_watchlist WHERE client_id = $1", [`${id}`])

            res.status(200).send(result)
    },

    getPositions: async(req,res)=>{
        const db = req.app.get('db'),
        {id } = req.params

        let result = await db.accounts.get_cash(id)

        res.status(200).send(result)
    },

    deleteSymbol: async(req,res) =>{
        const db = req.app.get('db'),
        { id } = req.params,
        { symbol } = req.body
        

  

        let result = await db.accounts.delete_symbol({id, symbol})

        res.status(200).send(result)

    },

    getChartData: async(req,res)=>{
        
        const db = req.app.get('db'),
        { id } = req.params

        console.log(id)
        
        let result = await db.query("SELECT SUM(quantity) AS shares, symbol FROM account_assets WHERE client_id = $1 GROUP BY symbol", [`${id}`])

        res.status(200).send(result)


    }



};