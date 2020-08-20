import React, {useState} from 'react'
import {connect} from 'react-redux'
import gql from 'graphql-tag';
import axios from 'axios'
import './Orders.css'
import CloseIcon from '@material-ui/icons/Close'
import { useQuery } from 'react-apollo'
import './Orders.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {withRouter, useHistory} from 'react-router-dom'

const EQUITY_QUERY = gql`
  query($ticker: String!){
    equity(ticker: $ticker){
      ticker
      last
      bidPrice
      askPrice
      volume
    }

  }

`;


function Orders(props) {
    const { auth } = props
    const history = useHistory()


    const order = {
        symbol: props.ticker.toString().toUpperCase(),
        quantity: useFormInput(''),
        bid_price: 0,
        ask_price: 0,
        volume: 0,
        id: auth.user.account_id,
        order_type: 'Market'
    }
    const {symbol, quantity} = order

    const [errorMessage, setError] = useState('')


    const {loading, error, data} = useQuery(EQUITY_QUERY, {
        variables: { ticker: symbol }

    });

    if(loading) return null;
    if(error) return console.log(error)

    order.bid_price = data.equity[0].bidPrice
    order.ask_price = data.equity[0].askPrice
    order.volume = data.equity[0].volume


    
    function useFormInput (initialValue) {
        const [value, setValue] = useState(initialValue);
        const handleChange = event => {
            setValue(event.target.value);
            
        };

        return { value, onChange: handleChange };
    };

    function sendBuyOrder(){
        const {symbol, bid_price, ask_price, id} = order
        const { value } = order.quantity

        if(auth.user.cash_balance >= value * ask_price){

            axios.post('/api/buy', {symbol, quantity: parseInt(value), bid_price: parseInt(bid_price), ask_price: parseInt(ask_price), id})
            .then(() =>{
                props.toggle('false')
                props.history.push('/confirmation')
            })
            .catch(() => { setError('Unable to process order, try again');
            })
        }
        else{
            setError('Insufficient amount of funds. Please reduce share amount or deposit more money')
        }
    }

    function sendSellOrder(){
        // const {symbol, quantity, bid_price, ask_price, id, asset_type, order_type,} = order
        const {symbol, id, bid_price, ask_price} = order
        const { value } = order.quantity

        
        axios.put(`/api/sell/${id}`, {symbol, quantity: value, bid_price: parseInt(bid_price), ask_price: parseInt(ask_price)})
        .then( () => {
            props.toggle('false')
            props.history.push('/confirmation')

        })
        .catch(() => { setError('Unable to process order, try again');
        })

    }

    


    return (
            <div className="order-body">
                <div style={{width:"78vw", position:"relative", top:"3%",right:"37%",display: "flex", justifyContent: "space-around"}}>
                    <ArrowBackIcon style={{color:"white"}} onClick={()=>props.toggle('search')}/>
                    <CloseIcon style={{color: "white"}}onClick={() => props.toggle('false')}/>
                </div>
                <div className="orders-container">
                    <div>
                        <form className="form-container">
                            <ul>
                                <p>Symbol: {symbol}</p>
                                <p>Quantity:</p><input type='text' placeholder='quantity' {...quantity}/>
                                <p>Bid Price: ${order.bid_price} </p>
                                <p>Ask Price: ${order.ask_price}</p>
                                <p>Market Order</p>
                            </ul>
                        </form>
                        {errorMessage &&
                        <h3 style={{color:"red"}}> {errorMessage} </h3> }
                        <div className="button-containter-o">
                            <button className="buttons-o" style={{backgroundColor: "green", color:"white"}}onClick={sendBuyOrder}>Buy</button>
                            <button  className="buttons-o" style={{backgroundColor: "red", color:"white"}} onClick={sendSellOrder}>Sell</button>
                        </div>
                    </div>
            </div>
        </div>
    )
  
}

const mapStateToProps = state => {
    return {
        quotes: state.quoteReducer,
        auth: state.authReducer

    }
}

export default withRouter(connect(mapStateToProps)(Orders))



