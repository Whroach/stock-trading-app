import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './History.css'



function History(props) {

    const [history, setHistory] = useState([])

    useEffect(() => {
        getAccountHistory()

      },[history])


    const getAccountHistory = () =>{
        const id = props.user.account_id
        axios.get(`/api/history/${id}`)
        .then(res => {
            setHistory(res.data)
        })
        .catch(() => console.log('error in getAccountHistory'))

    }

    history.reverse()

    const mappedHistory = history.map((element,index) => {
        return <div key={index} >
            <div style={{position: "relative", marginTop: 20}}>
                <div style={{display: "flex", justifyContent: "space-around", backgroundColor: "red"}}>
                    {element.action_type} 
                    {element.symbol}
                    {element.quantity}   
                    {element.timestamp}
                </div>

            </div>
        </div>
    })

    
    return (
        <div  >
            <div style={{display: "flex", justifyContent: "center", height: "100%"}} >
                <div >
                    <p style={{color: "white", fontWeight: "bold"}}>Recent Activity</p>
                    <div className="history-container">
                        {mappedHistory}
                    </div>
                </div>
            </div>
        </div>

    )
}

const mappedStateToProps = state => state.authReducer

export default connect(mappedStateToProps)(History)
