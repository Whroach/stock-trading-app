require('dotenv').config() 
const express = require('express'),
    massive = require('massive'),
    {CONNECTION_STRING, SESSION_SECRET } = process.env,
    session = require('express-session'),
    apiCtrl = require('./controllers/apiController'),
    authCtrl = require('./controllers/authController'),
    mainCtrl = require('./controllers/mainController')



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
    // app.get('/api/profile/:symbol', apiCtrl.getCompanyProfile)
    
    //Authentication endpoints
    app.get('/auth/session',authCtrl.getSession)
    app.post('/auth/register', authCtrl.register)
    app.post('/auth/login', authCtrl.login)
    app.delete('/auth/logout')

    //Database endpoints
    app.post('/api/buy', mainCtrl.buyOrder)
    app.put('/api/sell/:id', mainCtrl.sellOrder)



    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))