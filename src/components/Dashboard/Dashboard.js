import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quotes from '../Quotes/Quotes'
import Orders from '../Orders/Orders'
import Footer from '../Footer/Footer'
import './Dashboard.css'
import { findByLabelText } from '@testing-library/react'

class Dashboard extends Component {
  constructor(props){
    super(props)

  };

  componentDidMount = () =>{

  };

  render() {
    // console.log('hit dashboard')

    return (
      <div className="dashboard-container">
        <div style={{height: "84vh", width: "100vw", backgroundColor: "#1b2845", backgroundImage: "linear-gradient(315deg, #1b2845 0%, #274060 74%)"}}>
          <div className="dash-chart" style={{display: "flex", justifyContent: "center"}}>
            <img style={{height: 300, position: "relative", top: 40}}src="https://wallstreetonparade.com/wp-content/uploads/2020/03/Deutsche-Bank-Trading-Chart-From-February-14-through-March-5-2020-Versus-Wall-Street-Banks-and-U.S.-Insurers.jpg"/>
          </div>
          <div className="heat-map-container">
            <img id="heat-map" src="https://user-images.githubusercontent.com/1509692/64646747-09b45080-d3ee-11e9-922c-269e4f654090.png"/>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    )
  }
}




const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)


// background: "#0f0c29", background: "-webkit-linear-gradient(to right, #0f0c29, #302b63, #24243e)", background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"