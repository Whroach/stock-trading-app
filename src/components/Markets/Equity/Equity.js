import React from 'react'
import './Equity.css'
import { Link } from 'react-router-dom'



export default function Equity(props) {
  const  { equities }  = props.value


    const gainers = equities.splice(0,100)
    const index = equities.splice(0,3)
    const losers = equities.slice(0,100)
    const active = equities.slice(100,243)

    

    const mappedActive = active.map((element,index) =>{
      return <div key={index} >
          <ol style={{display: "flex", justifyContent:"space-evenly"}}>
            <div>
            <Link to={`/profile/${element.ticker}`}>{element.ticker}</Link>
            </div>
            <div>
            ${element.last}
            </div>
            <div>
            {element.high}
            </div>
            <div>
            {element.low}
            </div>
            {/* <div>
              {element.bidPrice}
            </div>
            <div>
              {element.askPrice}
            </div> */}
            <div>
              {element.volume}
            </div>
          </ol>
      </div>
    })





    const mappedGainers = gainers.map((element, index) =>{
      return <div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element.ticker}`}>{element.ticker}</Link>
          </div>
          <div>
            {element.last}
          </div>
        </div>
      </div>
    })

    const mappedLosers = losers.map((element, index) =>{
      return <div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element.ticker}`}>{element.ticker}</Link>
          </div>
          <div>
            {element.last}
          </div>
        </div>
      </div>
    })

    const mappedIndex = index.map((element,index)=>{
      // point change
      let pointChange = element.last / element.prev
      //percentage change
      let difference = element.last - element.prev
      let percentChange = (difference / element.prev * 100)

      return <div key={index} >
        <div >
        <Link to={`/profile/${element.ticker}`}>{element.ticker}</Link>
          {element.last.toFixed(2)}
        </div>
      </div>
    })



    return (

      <div  className="body">
        <div id="img-container">
          <img id="img-b"style={{height: "15vh" ,width: "90vw"}}src="https://biltmorecap.com/wp-content/uploads/2017/05/Equity.jpg"/>
        </div>
          <h1 style={{fontWeight: "bold",color:"white", position: "relative", left: "45%", bottom: "8%"}}>Equity Market</h1>
          <div style={{height: "20vh" ,width: "90vw", display: "flex", justifyContent: "space-evenly", backgroundColor: "red"}}>
            {mappedIndex}
          </div>
          <div style={{height: "30vh", display: "flex", justifyContent: "space-evenly"}}>
            <div className="gainers-container">
                {mappedGainers}
            </div>
            <div className="losers-container">
                {mappedLosers}
            </div>
          </div>
          <h1 style={{display: "flex", justifyContent: "center", fontWeight: "bold"}}>Most Active</h1>
          <div className="active-heading" style={{width: "100vw"}}>
            <div style={{width: "100vw",display: "flex", justifyContent: "space-around"}}>
              <p id="symbol-e">Symbol</p>
              <p id="last-e">Last</p>
              <p id="high-e">High</p>
              <p id="low-e">Low</p>
              <p id="vol-e">Volume</p> 
            </div>
          </div>
            <div className="active-container">
              {mappedActive}
            </div>
        </div>
    )}
