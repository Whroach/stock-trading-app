import React, {useState} from 'react'
import Equity from './Equity'
import Crypto from './Crypto'
import Forex from './Forex'

export default function Markets(props) {

    const [page, displayPage] = useState('equity')


    return (
        <div>
            <button onClick={() => displayPage('equity')}>Equity</button>
            <button onClick={() => displayPage('crypto')}>Crypto</button>
            <button onClick={() => displayPage('forex')}>Forex</button>
            <div>
                {page === 'equity' ? <Equity/> : page === 'crypto' ? <Crypto/> :  <Forex /> }
            </div>

        </div>
    )
}
