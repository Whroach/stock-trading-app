import React, {useState} from 'react'
import axios from 'axios'


export default function Description(props) {
    const { marketCapitalization, shareOutstanding, ipo, weburl } = props.profile



    return (
        <div>
            {/* <div>
                {marketCapitalization}
            </div>
            <p>{shareOutstanding}</p>
            <p>{ipo}</p>
            <p>{weburl}</p> */}

        </div>
    )
}

