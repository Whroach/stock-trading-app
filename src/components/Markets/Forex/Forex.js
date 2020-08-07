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
        .then(res => setCurrency(res.data))
        .catch(error => console.log(error))

    }

    console.log(currency.quote)





    return (
        <div  className="body">
            <div id="img-container">
                <img id="img-b"style={{height: "15vh" ,width: "90vw"}}src="https://shared.gighl.com/FXLift/Redesign/FXL-Introducing-Brokers-Banner.png"/>
            </div>
            <h1 style={{fontWeight: "bold",color:"white", position: "relative", left: "45%", bottom: "8%"}}>Forex Market</h1>
            <div>
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