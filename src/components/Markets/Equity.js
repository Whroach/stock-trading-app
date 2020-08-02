import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import { getElementError } from '@testing-library/react';

const EQUITIES_QUERY = gql`
  query EquityQuery{
    equities {
      ticker
      last
      prevClose
    }
  }
`;

export default function Equity(props) {

    const {loading, error, data} = useQuery(EQUITIES_QUERY)

    if(loading) return <p>Loading....</p>
    if(error) console.log(error)


    return (

        
        data.equities.map((element,index) =>{
        return <div key={index}>
            {element.ticker}
        </div>
        
        
    })
    )





}
