import React from 'react'
import './Equity.css'
import { Link } from 'react-router-dom'



export default function Equity(props) {
  const { equities } = props.value

    const mappedIndex = Object.entries(equities ).slice(0,3).map((element,index)=>{

      let difference = element[1].last - element[1].prevClose
      let percentChange = (difference / element[1].prevClose * 100)

      return (<div key={index} >
        <div className="index-box">
        <Link to={`/profile/${element[1].ticker}`}><p style={{fontSize: "50px", margin:"0"}}>{element[1].ticker}</p></Link>
        <p style={{fontSize:"20px"}}>${element[1].last}</p><p>{percentChange.toFixed(0,4)}%</p>
        </div>
      </div>)
    })



    const mappedGainers = Object.entries(equities ).slice(4,103).map((element, index) =>{
      let finalChange;
      
       if(element[1].last / element[1].prevClose != null){
         let difference = element[1].last - element[1].prevClose
         finalChange = (difference / element[1].prevClose * 100)

      }

      return (<div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element[1].ticker}`}><p>{element[1].ticker}</p></Link>
          </div>
            <p style={{color:"green"}}>{element[1].last}</p>
            <p style={{color:"green"}}>+{finalChange.toFixed(0,4)}%</p>
        </div>
      </div>)
    })

    const mappedLosers = Object.entries(equities ).slice(104,203).map((element, index) =>{
      let finalChange;

       if(element[1].last / element[1].prevClose != null){
         let difference = element[1].prevClose - element[1].last
         finalChange = (difference / element[1].prevClose * 100)

      }
      return (<div key={index} style={{width: "20vw", backgroundColor: "white"}}>
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
          <div>
          <Link to={`/profile/${element[1].ticker}`}><p>{element[1].ticker}</p></Link>
          </div>
            <p style={{color:"red"}}>{element[1].last}</p>
            <p style={{color:"red"}}>-{finalChange.toFixed(0,4)}%</p>
        </div>
      </div>)
    })



    const mappedActive = Object.entries(equities ).slice(204,303).map((element,index) =>{

      return (<div key={index} className="active-container-list">
        <Link to={`/profile/${element[1].ticker}`}><p className="active-p">{element[1].ticker}</p></Link>
        <p className="active-p">${element[1].last}</p>
        <p className="active-p">{element[1].high}</p>
        <p className="active-p">{element[1].low}</p>
        <p className="active-p">{element[1].volume}</p>
      </div>)
    })


    return (

      <div  className="body-e">
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
