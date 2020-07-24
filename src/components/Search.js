import React, {useState} from 'react'
import axios from 'axios'

function Search(props) {
    const [companyProfile, setState] = useState([])
    const [symbol, setValue] = useState("")
    

    const getInfo = ()=> {
        axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=bs90g87rh5re5dkf7q7g `)
            .then(response =>{
                setState(response.data)
            })
            .catch(error => console.log(error))
    }


    
    const onChangeHandler = event => {
        setValue(event.target.value);
        if(props.onChange) props.onChange(symbol)
      };
    
      console.log(companyProfile)


    return (
        <div>
            <input type="text" name="name" onChange={onChangeHandler} value={symbol}/>
            <button onClick={getInfo}>Search</button>       
        </div>
    )
}

export default Search