import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

function Profile(props) {
    const { profile } = props.profileReducer
    const [quote, setQuote] = useState([])


    useEffect(() => {
        getOneQuote()

      },[profile])
    
    // console.log(props.profileReducer.profile.ticker)
    // console.log(profile.ticker)


    const getOneQuote = () =>{
        axios.get(`/api/quote/${profile.ticker}`)
          .then(res =>{

            setQuote(res.data)})

          .catch(() => console.log('Error in profile.js'))

        }




      console.log(quote)

    return (
        <div>
            
        </div>
    )
}


const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Profile)
