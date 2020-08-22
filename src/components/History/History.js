import React, {useState, useEffect} from 'react'
import './History.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom'
import axios from 'axios'
 
function History(props) {
    // const [history, setHistory] = useState([])


    // useEffect(() => {
    //     getAccountHistory()


    //   },[])


    // const getAccountHistory = () =>{
    //     const id = props.id
    //     axios.get(`/api/history/${id}`)
    //     .then(res => {
    //         if(res.data && res.data.length !== history.length){
    //             setHistory(res.data)
    //         }

    //     })
    //     .catch(() => console.log('error in getAccountHistory'))

    // }

    // history.reverse()

    const mappedHistory = props.history.map((element,index) => {
        return <div key={index} >
            <div style={{position: "relative", marginTop: 20}}>
                <div style={{display: "flex", justifyContent: "space-around", color: "white", borderBottom: "solid white 1px"}}>
                    <p>{element.action_type}</p>
                    <p>{element.symbol}</p>
                    <p>{element.quantity} shares</p>
                </div>

            </div>
        </div>
    })

    
    return (
        <div  >
            <div style={{display: "flex", justifyContent: "center", height: "100%"}} >
                <div >
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                        <p style={{position: "relative", right:"20px",color: "white", fontWeight: "bold"}}>Recent Activity</p>
                        <Link to={`/history/${props.id}`}><div style={{display: "flex", justifyContent:"space-evenly", position: "relative",left:"20px"}}>
                            <p style={{color: "white"}}>More</p><ArrowForwardIcon style={{position:"relative", left:"10px",top:"12px", color:"white"}}/>
                        </div></Link>
                    </div>
                    <div className="history-container">
                        {mappedHistory}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default History
