import React from 'react'
import './Watchlist.css'
import { Link } from 'react-router-dom'
 
export default function DisplayWatchlist(props) {

    return (
        <div className="display-w-container">
            <div className="content-w">
                <Link style={{textDecoration: "none"}} to={`/profile/${props.list.symbol}`}><p className="watch-symbol">{props.list.symbol.toUpperCase()}</p></Link>
            </div>
        </div>
    )
}
