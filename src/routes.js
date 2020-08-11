import React from 'react'
import {Switch, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Authentication from './components/Authentication/Authentication'
import Profile from './components/Profile/Profile'
import Markets from './components/Markets/Markets'
import ShowHistory from './components/History/ShowHistory'
import Post from './components/History/Note'



export default (
    <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile/:ticker" component={Profile}/>
        <Route path="/markets" component={Markets} />
        <Route path="/history/:id" component={ShowHistory}/>
        <Route path="/post/:id" component={Post}/>
    </Switch>
)