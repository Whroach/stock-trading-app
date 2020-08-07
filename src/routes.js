import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Search from './components/Search/Search'
import Dashboard from './components/Dashboard/Dashboard'
import Authentication from './components/Authentication/Authentication'
import Profile from './components/Profile/Profile'
import Orders from './components/Orders/Orders'
import Quotes from './components/Quotes/Quotes'
import Markets from './components/Markets/Markets'
import Accounts from './components/Accounts/Accounts'
import History from './components/History/History'
import ChartDisplay from '../src/components/Chart/ChartDisplay'


export default (
    <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search" component={Search}/>
        <Route path="/profile/:ticker" component={Profile}/>
        <Route path="/trade" component={Orders}/>
        {/* <Route path="/quotes" component={Quotes} /> */}
        <Route path="/markets" component={Markets} />
        <Route path="/account" component={Accounts}/>
        <Route path="/history" component={History}/>
        <Route path="/chart" component={ChartDisplay} />
        
    </Switch>
)