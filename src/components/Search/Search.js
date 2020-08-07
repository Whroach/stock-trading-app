import React, {useState, useHistory} from 'react'
import { Link } from 'react-router-dom'
import './Search.css'





export default function Search(props) {
    const [symbol, setSymbol] = useState('')


    return (
        <>
        <div class="container">
            <form>
                <input
                onChange={ e => setSymbol(e.target.value)}
                type="text"
                placeholder="symbol lookup"
                />
                <div class="search"></div>
            </form>
            <Link to={`/profile/${symbol}`}><button style={{width: "9.2vw"}}>Send</button></Link>
            </div>
            <div>
        </div>
        </>
    )
}
