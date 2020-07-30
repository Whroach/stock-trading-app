import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './Profile.css'
import Orders from '../Orders/Orders'
import {getStockQuotes} from '../../ducks/reducers/quotesReducer'

function Profile(props) {
    const { profile } = props.profileReducer
    const [quote, setQuote] = useState([])
    const [news, setNews] = useState([])
    const [report, setReport] = useState([])
    const [toggle, setToggle] = useState('false')



    useEffect(() => {
        getOneQuote()
        getCompanyNews()
        getCompanyData()

      },[profile])
    
    // console.log(props.profileReducer.profile.ticker)
    // console.log(profile.ticker)

    const getCompanyNews = () =>{
      axios.get(`https://finnhub.io/api/v1/company-news?symbol=${profile.ticker}&from=2020-07-25&to=2020-07-26&token=bs90g87rh5re5dkf7q7g`)
      .then(res =>{
        // console.log(res.data[0].headline)
        let mappedData = res.data.map((element) =>{
          return element
        })
        setNews(mappedData)
      })
      .catch( () => console.log('error in getCompanyNews'))
      
    }

    const mappedNews = news.map((element, index) =>{
      return <div key={index}>
        <ol className="list-container">
          {element.headline}
        </ol>
        
      </div>
    });


    const getOneQuote = () =>{
        axios.get(`/api/quote/${profile.ticker}`)
          .then(res =>{
            props.getStockQuotes(res.data)
            setQuote(res.data)})

          .catch(() => console.log('Error in getOnequote'))

    };

    const getCompanyData = () =>{
      axios.get(`/api/report/${profile.ticker}`)
        .then(res =>{
          setReport(res.data)
        })
        .catch(() => console.log('error in getCompanydata'))
    }

    function handleToggle(){
      setToggle(toggle === 'true' ? 'false' : 'true')
  };


    const quotesSection = (
      <div>
        <h1>{profile.name}</h1><h2>${quote.prevClose}</h2>
        <div>{profile.exchange} | {profile.finnhubIndustry}</div>

      </div>
    );

 


    // console.log(report.pbRatio)

    // "date": "2017-07-27T00:00:00.000Z",
    // "marketCap": 539961141622.966,
    // "enterpriseVal": 498546141622.966,
    // "peRatio": 22.2370820669,
    // "pbRatio": 6.439703774,
    // "trailingPEG1Y": 1.1380153764





    return (
        <div>
          <div className="profile-container">
            <div className="quotes-container">
              {quotesSection}
            </div>
            <div className="image-container" >
              <img id="test-image" src="https://wallstreetonparade.com/wp-content/uploads/2020/03/Deutsche-Bank-Trading-Chart-From-February-14-through-March-5-2020-Versus-Wall-Street-Banks-and-U.S.-Insurers.jpg" alt="test"/>
            </div>
            <div className="news-container">
              {mappedNews}
            </div>
          </div>
          <div style={{height: "50vh", width: "100vw"}}>
              <button onClick={handleToggle}>Trade</button>
          </div>
          {toggle === 'true' ?
          <div style={{display: "flex", justifyContent: "center", position: "absolute", bottom: "50%", left: "50%", backgroundColor: "blue"}}>
            <Orders/>
          </div>
          : null}
        </div>
    )
}


const mappedStateToProps = state => state

export default connect(mappedStateToProps, {getStockQuotes})(Profile)
