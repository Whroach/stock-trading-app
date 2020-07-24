import React, { Component } from 'react'
import { connect } from 'react-redux'
import Quotes from '../components/Quotes'
import Orders from '../components/Orders'


class Dashboard extends Component {
  render() {
    return (
      <div>
        <Quotes/>
        <Orders/>
      </div>
    )
  }
}





const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)
