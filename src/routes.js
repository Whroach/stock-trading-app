import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Search from './components/Search'
import Dashboard from './components/Dashboard'
import Authentication from './components/Authentication'
import Profile from './components/Profile'
import Orders from './components/Orders'
import Quotes from './components/Quotes'


export default (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/auth" component={Authentication} />
        <Route path="/search" component={Search}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/quotes" component={Quotes} />
    </Switch>
)