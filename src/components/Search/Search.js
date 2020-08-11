import React, {useState, useHistory} from 'react'
import { Link } from 'react-router-dom'
import './Search.css'





export default function Search(props) {
    const [symbol, setSymbol] = useState('')


    return (
        <>
        <div>
            <form>
                <input
                onChange={ e => setSymbol(e.target.value)}
                type="text"
                placeholder="symbol lookup"
                />
                <div className="search"></div>
            </form>
            <Link to={`/profile/${symbol}`}><button style={{width: "9.2vw"}}>Search</button></Link>
            </div>
            <div>
        </div>
        </>
    )
}
