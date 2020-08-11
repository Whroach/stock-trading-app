import React from 'react'
import { Link } from 'react-router-dom'


export default function Description(props) {

    const data = props.profileF.pop()
    const newObj = {...data}


    let mappedCompetitiors = props.profileF.map((element,index) =>{
        return <div key={index}>
            <Link to={`/profile/${element}`}><p>{element}</p></Link>
        </div>
    })


    return (
        <div>
            <div style={{margin: "50px", fontSize:"20px", lineHeight: "1.6"}}>{props.info[0].description}</div>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <div>
                    <h2>Quick Facts</h2>
                    <p>{newObj.finnhubIndustry}</p>
                    <p>{newObj.exchange}</p>
                    <p>IPO: {newObj.ipo}</p>
                    <p>{newObj.shareOutstanding}</p>
                    <p>${newObj.marketCapitalization}B</p>
                </div>
                <div>
                    <h2>Main Competitors</h2>
                    {mappedCompetitiors}
                </div>
            </div>
        </div>
    )
}

