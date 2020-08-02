import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {getProfile} from '../../ducks/reducers/profileReducer'


function Search(props) {
    // const [companyProfile, setState] = useState([])
    const [symbol, setValue] = useState("")
    const history = useHistory()
    const location = useLocation()
    

    // const getInfo = ()=> {
    //     axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=bs90g87rh5re5dkf7q7g`)
    //         .then(response =>{
    //             props.getProfile(response.data)
    //             // setState(response.data)
    //             setValue("")

    //             if(location.pathname !== "/profile" && location.pathname !== "/trade"){
    //                 history.push('/profile')
    //             }

    //         })
    //         .catch(error => console.log(error))
    // }


    
    const onChangeHandler = event => {
        setValue(event.target.value);
        if(props.onChange) props.onChange(symbol)
      };

    


    return (
        <div>
            <input type="text" name="name" onChange={onChangeHandler} value={symbol}/>
            {/* <button onClick={getInfo}>Search</button> */}
            <div>

            </div>       
        </div>
    )
}

const mappedStateToProps = state => state.profileReducer

export default connect(mappedStateToProps,{getProfile})(Search)
