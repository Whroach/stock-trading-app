import React, {useState, Fragment} from 'react'
import Equity from './Equity/Equity'
import Crypto from './Crypto/Crypto'
import Forex from './Forex/Forex'
import './Markets.css'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'


const EQUITIES_QUERY = gql`
  query EquitiesQuery {
    equities {
      ticker
      last
      volume
      high
      low
    }
  }
`;



export default function Markets(props) {

    // const _subscribeToNewLinks = async(subscribeToMore)=>{
    //   subscribeToMore({document: EQUITIES_QUERY})

    // }

    const {loading, error, data, subscribeToMore} = useQuery(EQUITIES_QUERY)
    const [equityList, setEquity] = useState([])
    const [page, displayPage] = useState('equity')
    if(loading) return <p>Loading....</p>
    if(error) console.log(error)

    // this._subscribeToNewLinks(subscribeToMore)



    return (
        <Fragment>
            <div className="body-m" >
                <div className="buttons-container">
                <ButtonGroup color="primary" aria-label="outlined primary button group" style={{width: "100vw"}}>
                    <Button style={{width: "33.33%", color:"white", fontWeight: "bold"}} className='buttoms-m' onClick={() => displayPage('equity')}>Equity</Button>
                    <Button  style={{width: "33.33%", color:"white", fontWeight: "bold"}} className='buttoms-m'onClick={() => displayPage('crypto')}>Crypto</Button>
                    <Button style={{width: "33.33%", color:"white", fontWeight: "bold"}} className='buttoms-m' onClick={() => displayPage('forex')}>Forex</Button>
                </ButtonGroup>
                </div>
                <div>
                    {page === 'equity' ? <Equity value={data}/> : page === 'crypto' ? <Crypto/> :  <Forex /> }
                </div>
            </div>
        </Fragment>
    )
}


