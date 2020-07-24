require('dotenv').config() 
const express = require('express'),
    massive = require('massive'),
    {CONNECTION_STRING, SESSION_SECRET } = process.env,
    session = require('express-session'),
    finCtrl = require('./controllers/apiController'),
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
        secret: SESSION_SECRET
    }))


    //API endpoints
    app.get('/api/quotes', finCtrl.getStockQuotes)
    app.get('/api/profile/:symbol', finCtrl.getCompanyProfile)
    
    //Authentication endpoints
    app.post('/auth/register', authCtrl.register)
    app.post('/auth/login', authCtrl.login)
    app.delete('/auth/logout')

    //Database endpoints
    app.post('/api/buy', mainCtrl.buyOrder)
    app.delete('/api/sell/:id')



    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))