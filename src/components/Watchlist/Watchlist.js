import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Watchlist.css'
import { connect } from 'react-redux'
import DisplayWatchlist from './DisplayWatchlist'

function Watchlist(props) {

    const [ symbol, addSymbol ] = useState('')



     const addWatchlist = () =>{
         const id = props.user.account_id

         axios.post(`/api/watchlist/${id}`, {symbol})
         .then(() =>{
            props.getWatchFn()
            addSymbol('');

         } )
         .catch(error => console.log(error))
     }


    //  const removeSymbol = (value) =>{
    //      const id = props.user.account_id
    //      const symbol = value

    //      axios.put(`/api/symbol/${id}`, {symbol: symbol})
    //      .then(()=> props.getWatchFn())
    //      .catch(() => console.log('we got an error'))
    //  }



    return (
        <div style={{height: "40px", width: "15.5vw", color:"white"}}>
            <h1 style={{display: "flex", justifyContent:"center", margin: "0"}}>Watchlist</h1>
                <div style={{display: "flex", justifyContent: "space-evenly", borderTop: "solid black 2px", width: "15.5vw", fontSize: "18px"}}>
                    <p>Symbol</p>
                    {/* <p>Last</p>
                    <p>% Change</p> */}
                </div>
                <div>
                    <form onSubmit={addWatchlist}>
                        <input style={{width: "15.1vw", height: "3vh"}} value={symbol} onChange={e => addSymbol(e.target.value)} type="text" placeholder="Which security would you like to add?"/>
                    </form>
                </div>
                <div className="watchlist-container">
                    <div>
                        {props.list.map((element, index) =>(
                            <DisplayWatchlist list={element} key={index}/>
                        ))}
                    <div>
                        {/* <button onClick={() => removeSymbol(element.symbol)}></button> */}

                    </div>
                    </div>
                </div>
        </div>
    )
}


const mappedStateToProps = state => state.authReducer

export default connect(mappedStateToProps)(Watchlist)