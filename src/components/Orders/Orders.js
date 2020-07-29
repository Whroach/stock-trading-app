import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function Orders(props) {
    const {quotes, auth } = props

    const order = {
        symbol: quotes.stockQuotes.ticker,
        quantity: useFormInput(''),
        bid_price: quotes.stockQuotes.bidPrice,
        ask_price: quotes.stockQuotes.askPrice,
        id: auth.user.account_id,
        // bid_price: quotes.stockQuotes.high,
        // ask_price: quotes.stockQuotes.low,
        order_type: 'Market',
        action_type: 'Buy',
        asset_type: 'Equity',
        date: quotes.stockQuotes.timestamp
        

    }
    const {symbol, quantity, bid_price, ask_price, id, order_type, action_type, asset_type, date} = order
    



    // console.log(props)


    function useFormInput (initialValue) {
        const [value, setValue] = useState(initialValue);
        const handleChange = event => {
            setValue(event.target.value);
            
        };

        return { value, onChange: handleChange };
    };


    function sendBuyOrder(){
        // const {symbol, quantity, bid_price, ask_price, id} = order
        const { value } = order.quantity
        
      axios.post('/api/buy', {symbol, quantity: parseInt(value), bid_price: parseInt(bid_price), ask_price: parseInt(ask_price), id, order_type, action_type, asset_type, date})
        .then(() =>{
            console.log('Successs!!!')
            
        })
        .catch(() => console.log('error with sendOrder'))

    }

    function sendSellOrder(){
        
        
    }

    console.log(props.quotes)



    return (
        <div>
            <form>
                <ul>
                    {/* <p>Symbol:</p><input type='text' placeholder='symbol' {...symbol}/> */}
                    <p>Symbol:</p>{quotes.stockQuotes.ticker}
                    <p>Quantity:</p><input type='text' placeholder='quantity' {...quantity}/>
                    <p>Bid Price:</p>{quotes.stockQuotes.bidPrice}
                    <p>Ask Price:</p>{quotes.stockQuotes.askPrice}
                    {/* <input type='submit' /> */}
                </ul>
            </form>
            <div>
                <button onClick={sendBuyOrder}>Buy Order</button>
                <button>Sell Order</button>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        quotes: state.quotesReducer,
        auth: state.authReducer

    }
}

export default connect(mapStateToProps)(Orders)



