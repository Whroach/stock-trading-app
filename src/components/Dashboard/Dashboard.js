import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import History from '../History/History'
import axios from 'axios'

class Dashboard extends Component {
  constructor(props){
    super(props)


    this.state ={
      dowIndex: []

    }
  };

  // componentDidMount =()=>{
  //   this.getDowQuotes()
  // }


  // getDowQuotes = () =>{
  //   axios.get('/api/dow')
  //   .then(res =>{
  //     this.setState({dowIndex: res.data})
  //   })
  //   .catch(() => console.log('error in getDowQuotes'))
  // }



  render() {

    const {dowIndex } = this.state

    const mappedDow = dowIndex.map((element,index) => {
      return <div key={index} className="dow-container">
        <div className="element-section">
            {element.ticker}
            {element.open}
        </div>
      </div>
    })
 



    return (
      <div className="dashboard-container">
        <div style={{height: "84vh", width: "100vw", backgroundColor: "#1b2845", backgroundImage: "linear-gradient(315deg, #1b2845 0%, #274060 74%)"}}>
          <div style={{padding: "30px"}}>
            <div className="dash-chart" style={{display: "flex", justifyContent: "space-evenly"}}>
              <h1>Helloooooo World</h1>
              <img style={{height: 300, position: "relative"}}src="https://wallstreetonparade.com/wp-content/uploads/2020/03/Deutsche-Bank-Trading-Chart-From-February-14-through-March-5-2020-Versus-Wall-Street-Banks-and-U.S.-Insurers.jpg" alt="testimgimg"/>
              <div className="history">
                <History />
              </div>
            </div>
          </div>
          <div className="heat-map-container">
            {mappedDow}
          </div>
        </div>
      </div>
    )
  }
}



const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)


// background: "#0f0c29", background: "-webkit-linear-gradient(to right, #0f0c29, #302b63, #24243e)", background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"