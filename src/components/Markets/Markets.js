import React, { Fragment, useState, useEffect} from 'react'
import Equity from './Equity/Equity'
import './Markets.css'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import Axios from 'axios'


const EQUITIES_QUERY = gql`
  query EquitiesQuery {
    equities {
      ticker
      last
      volume
      bidPrice
      askPrice
      prevClose
      high
      low
    }
  }
`;


export default function Markets(props) {

    // const [equities, setEquities] = useState({})



    const {loading, error, data} = useQuery(EQUITIES_QUERY)

      if(loading) return <div style={{height: "100vh", width: "100vw"}}><p>Loading....</p></div>
      if(error) console.log(error)


    // useEffect(() => {

    //   getQuotes()

    // }, [])

    // const getQuotes = async () =>{
    //   await Axios.get('api/quotes')
    //   .then( res => setEquities(res.data))
    //   .catch(error => console.log(error))
    // }


    return (
        <Fragment>
            <div className="body-m" >
                <div>
                  <Equity value={equities}/>
                </div>
            </div>
        </Fragment>
    )
}


