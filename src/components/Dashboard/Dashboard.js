import React, { Component} from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import History from '../History/History'
import Watchlist from '../Watchlist/Watchlist'
import axios from 'axios'
// import gql from 'graphql-tag';
import Accounts from '../Accounts/Accounts'
import ChartDisplay from '../Chart/ChartDisplay'
// import { whatTimeIsIt } from './Timer'

// const EQUITY_QUERY =gql`
//   query($ticker: String!){
//     equity(ticker: $ticker){
//       ticker
//       last
//       volume
//     }
//   }
// `;

class Dashboard extends Component {
  constructor(props){
    super(props)

    this.state ={
      cash: '',
      tickers: [],
      lastPrice: [],
      timestamp: '',
      watchlist: [],
      positions:[],
      history:[],
      count: 0,
      chartData: []

    }

    this.getBalance = this.getBalance.bind(this)
    this.getWatchlist = this.getWatchlist.bind(this)
    this.getAccountHistory = this.getAccountHistory.bind(this)
    this.getPositions = this.getPositions.bind(this)

  };

  componentDidMount (){
    // whatTimeIsIt((err, timestamp) => 
    // this.setState({ timestamp }));

    this.getBalance();
    this.getWatchlist();
    this.getAccountHistory()
    this.getPositions()
  }

  componentDidUpdate(){
    this.getBalance();
    this.getWatchlist();
    this.getAccountHistory()
    this.getPositions()
  }



  getBalance (){
    const id = this.props.authReducer.user.account_id

    axios.get(`/api/balance/${id}`)
    .then(res => {
      if(res.data && res.data.length !== this.state.cash.length){
        this.setState({cash: res.data})

      }
    })
    .catch(error => console.log(error))

  }

  getWatchlist = ()=>{
     const id = this.props.authReducer.user.account_id

     axios.get(`/api/watchlist/${id}`)
     .then(res =>{
      if(res.data && res.data.length !== this.state.watchlist.length){
        this.setState({watchlist: res.data})
     }})
     .catch(error => console.log(error))
 }

 getAccountHistory = () =>{
  const id = this.props.authReducer.user.account_id
  axios.get(`/api/history/${id}`)
  .then(res => {
    if(res.data && res.data.length !== this.state.history.length){
      this.setState({history: res.data})
    }
  })
  .catch(() => console.log('error in getAccountHistory'))

}

getPositions = () =>{
  const id = this.props.authReducer.user.account_id
  
  axios.get(`/api/chart/${id}`)
  .then(res => {
    if(res.data && res.data.length !== this.state.chartData.length){
      this.setState({chartData: res.data})
    }

  })
  .catch(error => console.log(error))


 }



  render() {
    const { cash, watchlist, history, chartData } = this.state

          return (
            <div className="dashboard-container">
              <div style={{height: "86vh", width: "100vw", backgroundColor: "#1b2845", backgroundImage: "linear-gradient(315deg, #1b2845 0%, #274060 74%)"}}>
                {/* <p className="timer-io">{this.state.timestamp.slice(10)}</p> */}
                <div style={{padding: "30px"}}>
                  <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <div className="accounts-a"style={{position: "relative", top: "20%"}}>
                      <Accounts cash={cash}/>
                    </div>
                    <div style={{height: "40vh", width: "40vw", position: "relative", left: "1%"}}>
                      <ChartDisplay chart={chartData}/>
                    </div>
                    <div className="history">
                      <History id={this.props.authReducer.user.account_id} history={history}/>
                    </div>
                  </div>
                </div>
                <div className="watchlist">
                  <Watchlist list={watchlist} getWatchFn={this.getWatchlist} />
                </div>
              </div>
            </div>
            )}}



const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)

