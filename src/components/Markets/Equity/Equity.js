import React from 'react'
import './Equity.css'
import { Link } from 'react-router-dom'



export default function Equity(props) {
  const  { equities }  = props.value

    const index = equities.splice(0,3)
    const gainers = equities.splice(0,100)
    const losers = equities.slice(0,100)
    const active = equities.slice(100,243)

    

    const mappedActive = active.map((element,index) =>{
      let ask;
      let bid;

      if(element.bidPrice != null || element.askPrice != null){
        bid = element.bidPrice
        ask = element.askPrice

     }


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
            <div>
              {element.volume}
            </div>
          </ol>
      </div>
    })





    const mappedGainers = gainers.map((element, index) =>{
      let finalChange;

      // let pointChange = element.last / element.prev
      //percentage change
       if(element.last / element.prevClose != null){
         let difference = element.last - element.prevClose
         finalChange = (difference / element.prevClose * 100)

      }

      return <div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element.ticker}`}><p>{element.ticker}</p></Link>
          </div>
            <p style={{color:"green"}}>{element.last}</p>
            <p style={{color:"green"}}>+{finalChange.toFixed(2)}%</p>
        </div>
      </div>
    })

    const mappedLosers = losers.map((element, index) =>{
      let finalChange;

      // let pointChange = element.last / element.prev
      //percentage change
       if(element.last / element.prevClose != null){
         let difference = element.prevClose - element.last
         finalChange = (difference / element.prevClose * 100)

      }
      return <div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element.ticker}`}><p>{element.ticker}</p></Link>
          </div>
            <p style={{color:"red"}}>{element.last}</p>
            <p style={{color:"red"}}>-{finalChange.toFixed(2)}%</p>
        </div>
      </div>
    })

    const mappedIndex = index.map((element,index)=>{
      // point change
      let pointChange = element.last / element.prevClose
      //percentage change
      let difference = element.last - element.prevClose
      let percentChange = (difference / element.prevClose * 100)

      return <div key={index} >
        <div class="index-box">
        <Link to={`/profile/${element.ticker}`}><p style={{fontSize: "50px", margin:"0"}}>{element.ticker}</p></Link>
        <p style={{fontSize:"20px"}}>${element.last.toFixed(2)}</p><p>{percentChange.toFixed(2)}%</p>
        </div>
      </div>
    })



    return (

      <div  className="body-e">
        {/* <div id="img-container">
          <img id="img-b"style={{height: "15vh" ,width: "90vw"}}src="https://biltmorecap.com/wp-content/uploads/2017/05/Equity.jpg"/>
        </div>
          <h1 style={{fontWeight: "bold",color:"white", position: "relative", left: "45%", bottom: "8%"}}>Equity Market</h1> */}
          <div style={{position: "relative", top:"5%",height: "30vh" ,width: "90vw", display: "flex", justifyContent: "space-evenly"}}>
            {mappedIndex}
          </div>
          <div style={{height: "50vh", display: "flex", justifyContent: "space-evenly"}}>
            <div className="container-list-e">
                <h2 style={{position:"relative", left:"40%", width: "50%"}}>Top Performers</h2>
              <div className="gainers-container">
                {mappedGainers}
              </div>
            </div>
            <div>
              <h2 style={{position:"relative", left:"40%", width: "50%"}}>Top Decliners</h2>
              <div className="losers-container">
                {mappedLosers}
            </div>
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
