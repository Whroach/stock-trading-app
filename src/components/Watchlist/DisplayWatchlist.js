import React from 'react'
import './Watchlist.css'

export default function DisplayWatchlist(props) {

    return (
        <div className="display-w-container">
            <div className="content-w">
                <p>{props.list.symbol}</p>
                <p>$200</p>
                <p>5%</p>
            </div>
        </div>
    )
}
