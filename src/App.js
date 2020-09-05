import React, {useEffect, useState} from 'react'
import './App.css';
import routes from "./routes";
import { withRouter, Link } from "react-router-dom";
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
  
  axios.post(`/api/deposit/${props.authReducer.user.account_id}`, {deposit: parseInt(amount)})
  .then( () => {
    setForm('false')
  })
  .catch(() => console.log('error in sendDeposit'))
}



  return (
    <div style={{overflowX: "hidden"}}>
      {props.location.pathname === "/" || props.location.pathname ==="/confirmation" || props.location.pathname==="/deposit" ? null :
      <div className="header-app">
        <Header walletFn={handleToggle} />  
      </div>}
      <div>
      {form === 'true' ? 
          <div className = "deposit-container-a">
              <form className="deposit-form-a">
                  <ul className="input-a">
                      <p style={{fontSize: "20px"}}>Deposit Amount</p><input placeholder="USD" {...deposit}/>
                  </ul>
                  <div style={{bottom: 0, width: "20vw"}}>
                    <Link to={'/deposit'}><button className="form-input-a" onClick={sendDeposit}>Deposit</button></Link>
                  </div>
              </form>
          </div>  
          :null}
      </div>
      {routes}
      {props.location.pathname === "/" || props.location.pathname ==="/confirmation" || props.location.pathname==="/deposit" ? null :
      <div style={{position: "fixed", bottom: "10%", right: "5%"}}>
        <Fab color="primary" style={{maxWidth: '100px', maxHeight: '100px', minWidth: '100px', minHeight: '100px'}}  aria-label="add" onClick={toggle === 'false' ? () => setToggle('search') : toggle === 'search' || toggle ==='order' ? () => setToggle('false') : null}>
            <p >Trade</p>
        </Fab>
      </div>
      }
      {toggle === 'false' ? null : toggle ==='search' ? 
        <div className="search-symbol">
          <div className="search-a-container">
            <input onChange={e => setSymbol(e.target.value)} type="text" placeholder="symbol"/>
            <button disabled={symbol.length === 0} style={{backgroundColor:"green", color:"white"}} onClick={() => setToggle('order')}>Search</button>
          </div>
        </div>
       : 
      <div className="orders-page">
        <Orders ticker={symbol} toggle={setToggle}/> 
      </div> 
      }
      {props.location.pathname === "/" || props.location.pathname ==="/confirmation" || props.location.pathname==="/deposit" ? null : <Footer/>}
    </div>

  );
}

const mappedStateToProps = state => state

export default withRouter(connect(mappedStateToProps,{getUser})(App));
