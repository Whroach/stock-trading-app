import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quotes from '../Quotes/Quotes'
import Orders from '../Orders/Orders'

class Dashboard extends Component {
  constructor(props){
    super(props)

  };

  componentDidMount = () =>{

  };

  render() {
    // console.log('hit dashboard')

    return (
      <div>
        <Quotes/>
        {/* <Orders/> */}
      </div>
    )
  }
}





const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)
