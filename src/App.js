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
import Fab from '@material-ui/core/Fab';


function App(props) {
  const [symbol, setSymbol ] = useState('')
  const [toggle, setToggle] = useState('false')
  const deposit = useFormInput('')
  const [form, setForm] = useState('false')
  
  useEffect(() => {

    axios.get('/auth/session')
    .then(res => {
      if(res.data.username){
        props.getUser(res.data);
      }
    })
  }, [])

  function useFormInput(initialValue){
    const [amount, setAmount] = useState(initialValue);
    const handleChange = event =>{
        setAmount(event.target.value);
    }
    return {amount, onChange: handleChange}
};

function handleToggle(){
  setForm(form === 'true' ? 'false' : 'true')
};



const sendDeposit = () =>{
  const { amount } = deposit

  axios.post(`/api/deposit/${12}`, {deposit: parseInt(amount)})
  .then( () => {
      setForm(form === 'false')

  })
  .catch(() => console.log('error in sendDeposit'))
}



  return (
    <div style={{overflowX: "hidden"}}>
      <div className="header-app">
        {props.location.pathname === "/" || props.location.pathname ==="/confirmation" ? null : <Header/>}
        {props.location.pathname ==="/" ? null : 
        <div style={{position:"relative",right:"14.5%", top:"-10px"}}><button id ="wallet-id"onClick={handleToggle} style={{height: 50, width: 130, position: "absolute", bottom: 0, fontSize: 20, backgroundColor: "mediumblue", color: "white"}}>Wallet</button></div>}        
      </div>
      <div>
      {form === 'true' ? 
          <div className = "deposit-container-a">
              <form className="deposit-form-a">
                  <ul className="input-a">
                      <p style={{fontSize: "20px"}}>Deposit Amount</p><input placeholder="USD" {...deposit}/>
                  </ul>
                  <div style={{bottom: 0, width: "20vw"}}>
                      <input className="form-input-a" type="submit" onClick={sendDeposit}/>
                  </div>
              </form>
          </div>  
          :null}
      </div>
      {routes}
      {props.location.pathname === "/" || props.location.pathname ==="/confirmation" ? null :
      <div style={{position: "fixed", bottom: "10%", right: "5%"}}>
        <Fab color="primary" aria-label="add" onClick={toggle === 'false' ? () => setToggle('search') : toggle === 'search' || toggle ==='order' ? () => setToggle('false') : null}>
            <p>Trade</p>
        </Fab>
      </div>
      }
      {toggle === 'false' ? null : toggle ==='search' ? 
        <div className="search-symbol">
          <div className="search-a-container">
            <input onChange={e => setSymbol(e.target.value)} type="text" placeholder="symbol"/>
            <button style={{backgroundColor:"green", color:"white"}} onClick={() => setToggle('order')}>Search</button>
          </div>
        </div>
       : 
      <div className="orders-page">
        <Orders ticker={symbol} toggle={setToggle}/> 
      </div> 
      }
      {props.location.pathname === "/" || props.location.pathname ==="/confirmation" ? null : <Footer/>}
    </div>

  );
}

export default withRouter(connect(null,{getUser})(App));
