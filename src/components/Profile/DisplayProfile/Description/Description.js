import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function Description(props) {

    const data = props.profileF.pop()
    // const num = data.marketCapitalization

    // console.log(num)


    // console.log(data.shareOutstanding)


    // country: "US"
    // currency: "USD"
    // exchange: "NASDAQ NMS - GLOBAL MARKET"
    // finnhubIndustry: "Automobiles"
    // ipo: "2010-06-29"
    // logo: "https://static.finnhub.io/logo/2dd96524-80c9-11ea-aaac-00000000092a.png"
    // marketCapitalization: 277119.9
    // name: "Tesla Inc"
    // phone: "16506815000"
    // shareOutstanding: 186.361726
    // ticker: "TSLA"
    // weburl: "https://www.tesla.com/"


    let mappedCompetitiors = props.profileF.map((element,index) =>{
        return <div key={index}>
            <p>{element}</p>
        </div>
    })





    return (
        <div>
            <div style={{margin: "50px", fontSize:"20px", lineHeight: "1.6"}}>{props.info[0].description}</div>
            <div>
            </div>
            <div>
                <h2>Main Competitors</h2>
                {mappedCompetitiors}
            </div>
        </div>
    )
}

