import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function Orders(props) {

    const [buyOrder, setBuy] = useState({})
    const [sellOrder, setSell] = useState({})

    function sendOrder(price){
        axios.post('/api/buy', {price})
        .then(() =>{
            console.log('Successs!!!')
        })
        .catch(() => console.log('error with sendOrder'))

    }






    const {high, low, prevClose, open} = props.stockQuotes

    

    return (
        <div>
            <div>
                <form>
                    <ul>
                        <p>Symbol:</p><input/>
                        <p>Quantity:</p><input/>
                        <p>Action:</p><input/>
                        <p>Order Type:</p><input/>
                    </ul>
                </form>
            </div>
            <div>
                <button onClick={sendOrder}>Buy Order</button>
                <button>Sell Order</button>
            </div>
        </div>

    )
}

const mapStateToProps = state => state.quotesReducer

export default connect(mapStateToProps)(Orders)


