import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {getStockQuotes} from '../../ducks/reducers/quotesReducer'
import axios from 'axios'


function Quotes(props) {

    const [quotes, setQuote] = useState([])

    useEffect(() => {
        getQuote()

      },[])
    

    const getQuote = () =>{
        axios.get('/api/quotes')
            .then(response =>{
                setQuote(response.data)
                props.getStockQuotes(response.data)
            })
            .catch(error => console.log(error))

    }

   
    const {askPrice, bidPrice, last, volume} = quotes



    return (
        <div>
            <ul>
                <p>Previous Close:</p><h1>{bidPrice}</h1>
                <p>Open:</p><h2>{askPrice}</h2>
                <p>High:</p><h2>{last}</h2>
                <p>Low:</p><h2>{volume}</h2>
            </ul>
        </div>
    )
}


const mappedStateToProps = state => state.quotesReducer

export default connect(mappedStateToProps, {getStockQuotes})(Quotes)