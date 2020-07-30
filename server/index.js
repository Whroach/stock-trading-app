require('dotenv').config() 
const express = require('express'),
    massive = require('massive'),
    {CONNECTION_STRING, SESSION_SECRET } = process.env,
    session = require('express-session'),
    apiCtrl = require('./controllers/apiController'),
    authCtrl = require('./controllers/authController'),
    mainCtrl = require('./controllers/mainController'),
    acctCtrl = require('./controllers/acctsController')



    const PORT = 3005
    const app = express()

    app.use(express.json())


    massive({
        connectionString: CONNECTION_STRING,
        ssl: {rejectUnauthorized: false}
    })
    .then(db =>{
        app.set('db',db)
        console.log('we are connected to our database')
    })


    app.use(session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 365} 
    }))


    //API endpoints
    app.get('/api/quotes', apiCtrl.getStockQuotes)
    app.get('/api/quote/:symbol', apiCtrl.getSingleQuote)
    app.get('/api/report/:symbol', apiCtrl.getCompanyReport)
    
    //Authentication endpoints
    app.get('/auth/session',authCtrl.getSession)
    app.post('/auth/register', authCtrl.register)
    app.post('/auth/login', authCtrl.login)
    app.delete('/auth/logout')

    //Trade endpoints
    app.post('/api/buy', mainCtrl.buyOrder)
    app.put('/api/sell/:id', mainCtrl.sellOrder)

    //Account endpoints
    app.post('/api/deposit/:id', acctCtrl.depositFunds )
    app.get('/api/history/:id', acctCtrl.accountHistory)



    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))