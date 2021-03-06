import React, {useState,useEffect} from 'react'
import './History.css'
import axios from 'axios'


export default function ShowHistory(props) {
    const { id } = props.match.params
    const [list, setList] = useState([])


    useEffect(() => {
        axios.get(`/api/historylist/${id}`)
        .then(res => setList(res.data))
        .catch(error => console.log(error))

    }, [])


    const mappedList = list.map((element,index)=>{

        return <div id="timestamp-h" key={index} style={{borderBottom: "solid black 1px"}}>
            <div className="content-container-sh">
                    <p>{element.timestamp.slice(0,10)}</p>
                    <p>{element.action_type}</p>
                    <p id="symbolxQ">{element.symbol} x {element.quantity}s</p>
            </div>
        </div>
    })




    return (
        <div className="history-d-body">
            <div className="content-container">
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1 style={{color:"blue"}}>Transaction History</h1>

                </div>
                <div className="column-names">
                    <p>Date</p>
                    <p>Type</p>
                    <p>Details</p>
                </div>
                <div className="history-rows">
                    {mappedList}
                </div>
            </div>
        </div>
    )
}
