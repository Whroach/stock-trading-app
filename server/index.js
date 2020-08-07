require('dotenv').config() 
const express = require('express'),
    massive = require('massive'),
    app = express(),
    {CONNECTION_STRING, SESSION_SECRET } = process.env,
    session = require('express-session'),
    authCtrl = require('./controllers/authController'),
    orderCtrl = require('./controllers/ordersController'),
    acctCtrl = require('./controllers/acctsController'),
    apiCtrl = require('./controllers/apiController'),
    { graphqlHTTP } = require('express-graphql'),
    schema = require('./schema'),
    cors = require('cors'),
    server = app.listen(3005),
    io = require('socket.io').listen(server);


    io.on('connection', (client) => {
        client.on('whatTimeIsIt', (interval) => {
          console.log('client is subscribing to timer with interval ', interval);
          setInterval(() => {
            client.emit('timer', new Date());
          }, interval);
        });
      });

    app.use(cors());

    
    app.use(cors())
    app.use(express.json())
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))


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
    

    //API endpoint
    app.get('/api/profile/:ticker', apiCtrl.getProfile)
    app.get('/api/rates', apiCtrl.getForexRates)
    app.get('/api/report/:ticker', apiCtrl.getFinancialReport)
    //Authentication endpoints
    app.get('/auth/session',authCtrl.getSession)
    app.post('/auth/register', authCtrl.register)
    app.post('/auth/login', authCtrl.login)
    app.get('/auth/logout', authCtrl.logout)
    //Trade endpoints
    app.post('/api/buy', orderCtrl.buyOrder)
    app.put('/api/sell/:id', orderCtrl.sellOrder)
    //Account endpoints
    app.post('/api/deposit/:id', acctCtrl.depositFunds )
    app.get('/api/history/:id', acctCtrl.accountHistory)
    app.get('/api/watchlist/:id', acctCtrl.getWatchlist)
    app.post('/api/watchlist/:id', acctCtrl.addToWatchlist)
    app.get('/api/positions/:id', acctCtrl.getPositions)
    app.put('/api/symbol/:id', acctCtrl.deleteSymbol)
    app.get('/api/chart/:id', acctCtrl.getChartData)
 
