import React, { Fragment, useState, useEffect } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import DisplayProfile from './DisplayProfile/DisplayProfile'
import axios from 'axios'
import {getStockQuote} from '../../ducks/reducers/quoteReducer'
import { connect } from 'react-redux';


const EQUITY_QUERY_COMBINE = gql`
  query($ticker: String!){
    companyNews(ticker: $ticker){
      headline
    }
    equity(ticker: $ticker){
      ticker
      last
    }
    profile(ticker: $ticker){
      name
      description
    }

  }

`;


function Profile(props) {
  const { ticker } = props.match.params
  const [profileF, setProfile] = useState([])
  const [report, setReport] = useState([])

  useEffect(() =>{
    props.getStockQuote(ticker)

     axios.get(`/api/profile/${ticker}`)
    .then(res => {
      setProfile(res.data)
    })
    .catch(error => console.log(error))

    getReport()

  }, [])

  const getReport =()=>{
    axios.get(`/api/report/${ticker}`)
    .then(res => setReport(res.data))
    .catch(error => console.log(error))
  };


  return (
    <Fragment>
      <Query query={EQUITY_QUERY_COMBINE} variables={{ ticker }}>
        {({ loading, error, data }) =>{
          if(loading) return <h1>Loading....</h1>;
          if(error) console.log(error)

          const {companyNews, equity, profile } = data

        
          return <DisplayProfile report={report} news={companyNews} bio={profileF} description={profile} equity={equity} />



        // return <DisplayProfile  equity={equity}  news={companyNews} />

        }}
      </Query>
    </Fragment>
  );
}

const mappedStateToProps = state => state.quoteReducer

export default connect(mappedStateToProps, {getStockQuote})(Profile)






















// const getProfile = ()=> {
//   axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=id&token=key`)
//       .then(response =>{
//           setProfile(response.data)

//           // if(location.pathname !== "/profile" && location.pathname !== "/trade"){
//           //     history.push('/profile')
//           // }

//       })
//       .catch(error => console.log(error))
// }




// const mappedNews = news.map((element, index) =>{
//   return <div key={index}>
//     <ol className="list-container">
//       {element.headline}
//     </ol>
  
//   </div>
// });



// function handleToggle(){
// setToggle(toggle === 'true' ? 'false' : 'true')
// };


// _executeSearch = async () => {
//   const { symbol } = this.state

//   const result = await this.props.client.query({
//       query: QUOTES_QUERY,
//       variables: { ticker: symbol },
//     })

//   // console.log(result.data.equity[0].ticker)
//   const { equity  } = result.data

//   console.log(equity)

//   if(equity !== null){
//   this.setState({profile: equity})
//   // this.props.history.push(`/profile/${equity.ticker}`)
//     }};