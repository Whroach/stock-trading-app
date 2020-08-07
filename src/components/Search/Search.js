import React, {useState, useHistory} from 'react'
import { Link } from 'react-router-dom'





export default function Search(props) {
    const [symbol, setSymbol] = useState('')


    return (
        <>
        <div>
            <form>
                <input
                onChange={ e => setSymbol(e.target.value)}
                type="text"
                placeholder="Which stock do you want to look up"
                />
            </form>
            <Link to={`/profile/${symbol}`}><button>Submit</button></Link>
            </div>
            <div>
        </div>
        </>
    )
}
