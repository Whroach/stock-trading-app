import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {getStockQuotes} from '../ducks/reducers/quotesReducer'
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

   
    const {high, low, prevClose, open} = quotes



    return (
        <div>
            <ul>
                <p>Previous Close:</p><h1>{prevClose}</h1>
                <p>Open:</p><h2>{open}</h2>
                <p>High:</p><h2>{high}</h2>
                <p>Low:</p><h2>{low}</h2>
            </ul>
        </div>
    )
}


const mappedStateToProps = state => state.quotesReducer

export default connect(mappedStateToProps, {getStockQuotes})(Quotes)