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

      return <div key={index} className="active-container-list">
        <Link to={`/profile/${element.ticker}`}><p className="active-p">{element.ticker}</p></Link>
        <p className="active-p">${element.last}</p>
        <p className="active-p">{element.high}</p>
        <p className="active-p">{element.low}</p>
        <p className="active-p">{element.volume}</p>
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
        <div className="index-box">
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
          <div style={{height: "50vh", display: "flex", justifyContent: "space-evenly", marginTop:"10%", marginBottom:"10%"}}>
            <div className="container-list-e">
                <h2 style={{display:"flex", justifyContent:"center"}}>Top Performers</h2>
                <div style={{display: "flex", justifyContent:"space-evenly", position:"relative", left: "20px"}}>
                  <p>Symbol</p>
                  <p>Last</p>
                  <p>Percent Change %</p>
                </div>
              <div className="gainers-container">
                {mappedGainers}
              </div>
            </div>
            <div>
              <h2 style={{display:"flex", justifyContent:"center"}}>Top Decliners</h2>
              <div style={{display: "flex", justifyContent:"space-evenly", position:"relative", left: "20px"}}>
                  <p>Symbol</p>
                  <p>Last</p>
                  <p>Percent Change %</p>
                </div>
              <div className="losers-container">
                {mappedLosers}
            </div>
            </div>
          </div>
          <h1 style={{display: "flex", justifyContent: "center", fontWeight: "bold"}}>Most Active</h1>
          <div className="active-heading" >
            <div style={{display: "flex", justifyContent: "space-around", paddingRight: "1%", borderBottom: "2px solid black"}}>
              <p id="symbol-e">Symbol</p>
              <p id="last-e">Last</p>
              <p id="high-e">52 Week High</p>
              <p id="low-e">52 Week Low</p>
              <p id="vol-e">Volume</p> 
            </div>
          </div>
            <div className="active-container">
              {mappedActive}
            </div>
        </div>
    )}
