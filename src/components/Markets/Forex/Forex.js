import React, {useState, useEffect} from 'react'
import './Forex.css'
import axios from 'axios'

export default function Forex(props) {
    const [currency, setCurrency] = useState([])
 
    useEffect(() => {
        getRates()

    }, [])

    const getRates = () =>{
        axios.get('/api/rates')
        .then(res => {
            setCurrency(res.data)
        })
        .catch(error => console.log(error))

    }

    // "ticker":"audusd",
    // "quoteTimestamp":"2019-07-01T21:00:01.289000+00:00",
    // "bidPrice":0.6963,
    // "bidSize":100000.0,
    // "askPrice":0.69645,
    // "askSize":1200000.0,
    // "midPrice":0.696375

    const mappedForex = currency.map((element, index)=>{
        console.log(element)
        return <div key={index}>
            <ol style={{display: "flex", justifyContent:"space-evenly"}}>
                <p>{element.index.toUpperCase()}</p>
                <p>${element.bidPrice}</p>
                <p>${element.askPrice}</p>
            </ol>
        </div>
    })






    return (
        <div  className="body">
            <div id="img-container">
                <img id="img-b"style={{height: "15vh" ,width: "90vw"}}src="https://shared.gighl.com/FXLift/Redesign/FXL-Introducing-Brokers-Banner.png"/>
            </div>
            <h1 style={{fontWeight: "bold",color:"white", position: "relative", left: "45%", bottom: "8%"}}>Forex Market</h1>
            <div style={{display: "flex", justifyContent:"center"}}>
                <div className="active-container">
                    {mappedForex}
                </div>
            </div>
        </div>
    )
}


// return (
//     <div>
//     {
//        Object.keys(ObjectTest).map((value,index)=>{
//           <p>id is {ObjectTest[value].id} ; name is {ObjectTest[value].name}</p>
//        });
//     }
//     </div>
//  );