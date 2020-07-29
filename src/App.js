import React, {useEffect} from 'react'
import './App.css';
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from './components/Header/Header'
import {connect} from 'react-redux'
import {getUser} from './ducks/reducers/authReducer'
import axios from 'axios';
import Footer from './components/Footer/Footer'

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
    <div style={{overflowX: "hidden"}}>
      {props.location.pathname === "/" ? null : <Header/>}
      {routes}
      {props.location.pathname === "/" ? null : <Footer/>}
    </div>

  );
}

export default withRouter(connect(null,{getUser})(App));
