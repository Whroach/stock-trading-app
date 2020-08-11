import React, {useState, Fragment} from 'react'
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


    const {loading, error, data, subscribeToMore} = useQuery(EQUITIES_QUERY)
    const [equityList, setEquity] = useState([])
    const [page, displayPage] = useState('equity')
    if(loading) return <p>Loading....</p>
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


