import React, {useEffect, useState} from 'react'
import './App.css';
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from './components/Header/Header'
import {connect} from 'react-redux'
import {getUser} from './ducks/reducers/authReducer'
import axios from 'axios';
import Footer from './components/Footer/Footer'
import Orders from './components/Orders/Orders'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


function App(props) {


  const [symbol, setSymbol ] = useState('')
  const [toggle, setToggle] = useState('false')
  
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
      <div className="header-app">
        {props.location.pathname === "/" ? null : <Header/>}
      </div>
      {routes}
      {props.location.pathname === "/" ? null :
      <div style={{position: "fixed", bottom: "10%", right: "5%"}}>
        <Fab color="primary" aria-label="add" onClick={toggle === 'false' ? () => setToggle('search') : toggle === 'search' || toggle ==='order' ? () => setToggle('false') : null}>
            <AddIcon/>
        </Fab>
      </div>
      }
      {toggle === 'false' ? null : toggle ==='search' ? 
        <div className="search-symbol">
          <input onChange={e => setSymbol(e.target.value)} type="text" placeholder="symbol"/>
          <button onClick={() => setToggle('order')}>Submit</button>
        </div>
       : 
      <div className="orders-page">
        <Orders ticker={symbol} toggle={setToggle}/> 
      </div> 
      }
      {props.location.pathname === "/" ? null : <Footer/>}
    </div>

  );
}

export default withRouter(connect(null,{getUser})(App));
