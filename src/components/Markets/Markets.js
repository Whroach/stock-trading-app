import React, { Fragment} from 'react'
import Equity from './Equity/Equity'
import './Markets.css'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


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

    const {loading, error, data} = useQuery(EQUITIES_QUERY)

    if(loading) return <div style={{height: "100vh", width: "100vw"}}><p>Loading....</p></div>
    if(error) console.log(error)

    
    return (
        <Fragment>
            <div className="body-m" >
                <div>
                  <Equity value={data}/>
                </div>
            </div>
        </Fragment>
    )
}


