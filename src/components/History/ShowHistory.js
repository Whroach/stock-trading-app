import React, {useState,useEffect} from 'react'
import './History.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ShowHistory(props) {
    const { id } = props.match.params
    const [list, setList] = useState([])
    const [edit, setEdit] = useState('')
    const [toggle, setToggle] = useState('false')


    useEffect(() => {
        axios.get(`/api/historylist/${id}`)
        .then(res => setList(res.data))
        .catch(error => console.log(error))

    }, [])


    const mappedList = list.map((element,index)=>{

        return <div id="timestamp-h" key={index} style={{borderBottom: "solid black 1px"}}>
            {/* style={{margin: 0, position: "relative",display: "flex", justifyContent:"space-evenly", verticalAlign: "middle"}} */}
            <div className="content-container-sh">
                    <p>{element.timestamp.slice(0,10)}</p>
                    <p>{element.action_type}</p>
                    <p id="symbolxQ">{element.symbol} x {element.quantity}s</p>
                    {/* <div id="desc">
                        <p id="p-desc">{element.description}</p>
                    </div>
                    <div>
                        <Link to={`/post/${element.history_id}`}><button>Edit</button></Link>
                    </div> */}
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
