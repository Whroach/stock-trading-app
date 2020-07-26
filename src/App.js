import React, {useEffect} from 'react'
import './App.css';
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from './components/Header/Header'
import {connect} from 'react-redux'
import {getUser} from './ducks/reducers/authReducer'
import axios from 'axios';

function App(props) {
  
  useEffect(() => {

    axios.get('/auth/session')
    .then(res => {
      if(res.data.username){
        props.getUser(res.data);
      }
    })
  }, [])





  return (
    <>
      {props.location.pathname === "/" ? null : <Header/>}
      {routes}
    </>
  );
}

export default withRouter(connect(null,{getUser})(App));
