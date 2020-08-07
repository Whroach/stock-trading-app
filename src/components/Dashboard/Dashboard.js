import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import History from '../History/History'
import Watchlist from '../Watchlist/Watchlist'
import axios from 'axios'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Accounts from '../Accounts/Accounts'
import ChartDisplay from '../Chart/ChartDisplay'
import { whatTimeIsIt } from './Timer'

const EQUITY_QUERY =gql`
  query($ticker: String!){
    equity(ticker: $ticker){
      ticker
      last
      volume
    }
  }
`;

class Dashboard extends Component {
  constructor(props){
    super(props)

    whatTimeIsIt((err, timestamp) => this.setState({ 
      timestamp 
    }));

    this.state ={
      holdings: [],
      tickers: [],
      lastPrice: [],
      timestamp: ''

    }
  };

  componentDidMount =()=>{
    this.getPositions()
  }

  getPositions = () =>{
    const {account_id} = this.props.authReducer.user
      axios.get(`/api/positions/${account_id}`)
    .then(res => 
      this.setState({holdings: res.data, tickers: res.data})
    )
    .catch(error => console.log(error))

  }


  render() {
    const { holdings, tickers, lastPrice } = this.state

    console.log(holdings)

    const uniqTickers = tickers.filter((value, index, self) => {
      return self.findIndex(t => t.symbol === value.symbol) === index;
    })

    const mappedTickers = uniqTickers.map(element =>{
      return element.symbol
    })

    let symbols = mappedTickers.toString()

    const mappedHoldings = holdings.map((element,index) => {

      return <div key={index}>
        <div>
            {element.symbol}
        </div>
        <div>
          {element.quantity}
        </div>
        <div>
          {element.ask_price}
        </div>
      </div>
    })
 


    return (
      <Fragment>
        <Query query={EQUITY_QUERY} variables={{ticker: symbols}}>
        {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);


          return (
            <div className="dashboard-container">
              <div style={{height: "84vh", width: "100vw", backgroundColor: "#1b2845", backgroundImage: "linear-gradient(315deg, #1b2845 0%, #274060 74%)"}}>
                <h3 style={{top: "60%", letterSpacing: 0}} className="timer-io">Time is Money: Markets Close at 3:00PM CT</h3>
                <p className="timer-io">{this.state.timestamp}</p>
                <div style={{padding: "30px"}}>
                  <div className="dash-chart" style={{display: "flex", justifyContent: "space-evenly"}}>
                    <div className="accounts-a"style={{position: "relative", top: "20%"}}>
                      <Accounts value={holdings}/>
                    </div>
                    <div style={{height: "40vh", width: "40vw", position: "relative", right: "2%"}}>
                      <ChartDisplay/>
                    </div>
                    <div className="history">
                      <History />
                    </div>
                  </div>
                </div>
                <div className="watchlist">
                  <Watchlist value={data}/>
                </div>
              </div>
            </div>
            )}}
           </Query>
      </Fragment>
    )
  }
}



const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Dashboard)


// background: "#0f0c29", background: "-webkit-linear-gradient(to right, #0f0c29, #302b63, #24243e)", background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"