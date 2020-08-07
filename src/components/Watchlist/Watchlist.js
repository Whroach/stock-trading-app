import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Watchlist.css'
import { connect } from 'react-redux'

function Watchlist(props) {
    const [watchlist, setWatchlist] = useState([])
    const [ symbol, addSymbol ] = useState('')

    useEffect(() =>{
        getWatchlist()
   
     }, [watchlist])

     const addWatchlist = () =>{
         const id = props.user.account_id

         axios.post(`/api/watchlist/${id}`, {symbol})
         .then(() => console.log('success'))
         .catch(error => console.log(error))
     }

     const getWatchlist = () =>{
         const id = props.user.account_id

         axios.get(`/api/watchlist/${id}`)
         .then(res =>{
             setWatchlist(res.data)
         })
         .catch(error => console.log(error))
     }

     const removeSymbol = (value) =>{
         const id = props.user.account_id
         const symbol = value

         axios.put(`/api/symbol/${id}`, {symbol: symbol})
         .then(()=>console.log('success'))
         .catch(() => console.log('we got an error'))
     }

     const mappedWatch = watchlist.map((element,index)=>{
         return <div key={index} style={{display: "flex", justifyContent:"space-evenly"}}>
             <div>
                 {element.symbol}
             </div>
             <div>
                <button onClick={() => removeSymbol(element.symbol)}>X</button>
             </div>
         </div>
     })


    return (
        <div style={{height: "30px", width: "30px", backgroundColor: "red"}}>
            <div style={{display: "flex", justifyContent: "space-evenly", backgroundColor: "purple", width: "14.6vw"}}>
                <p>Symbol</p>
                <p>Price</p>
                <p>% Change</p>
            </div>
            <div>
                <form onSubmit={addWatchlist}>
                    <input style={{width: "14vw", height: "3vh"}} onChange={e => addSymbol(e.target.value)} type="text" placeholder="Got your eyes on the prize?"/>
                </form>
            </div>
            <div className="watchlist-container">
                {mappedWatch}
            </div>
        </div>
    )
}


const mappedStateToProps = state => state.authReducer

export default connect(mappedStateToProps)(Watchlist)