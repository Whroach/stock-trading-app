import React, {useState} from 'react'
import './Header.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {depositFunds} from '../../ducks/reducers/authReducer'
import Search from '../Search/Search'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { logout } from '../../ducks/reducers/authReducer'



function Header(props) {

    const deposit = useFormInput('')
    const [toggle, setToggle] = useState('false')

    function useFormInput(initialValue){
        const [amount, setAmount] = useState(initialValue);
        const handleChange = event =>{
            setAmount(event.target.value);
        }
        return {amount, onChange: handleChange}
    };

    function handleToggle(){
        setToggle(toggle === 'true' ? 'false' : 'true')
    };



    const sendDeposit = () =>{
        const { amount } = deposit
        axios.post(`/api/deposit/${props.user.account_id}`, {deposit: parseInt(amount)})
        .then( () => {
            setToggle(toggle === 'false')

        })
        .catch(() => console.log('error in sendDeposit'))
    }


    const logoutUser = () => {
        axios.get('/auth/logout')
        .then(() =>{
            props.logout()
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            <div className="header-container">
                <Link to="/dashboard"><img style={{position: "relative", top: 1, height: 68}} src="logo.PNG" alt="logo"/></Link>
                <div className="nav-container">
                <Link to="/dashboard" ><Button  style={{height: 40, width: 100, position: "relative", top: 16, fontSize: 20}} variant="contained" color="primary">Home</Button></Link>
                <Link to="/markets"><Button style={{height: 40, width: 100, position: "relative", top: 16, fontSize: 20}} variant="contained" color="primary">Market</Button></Link>
                    <div style={{position: "relative", top: "25%"}}>
                        <Search/>
                    </div>
                    <button id ="wallet-id"onClick={handleToggle} style={{height: 50, width: 130, position: "relative", top: 12, fontSize: 20, backgroundColor: "mediumblue", color: "white"}}>Wallet</button>
                    <div>
                        <Link to={'/'}><Button onClick={logoutUser} variant="outlined" color="secondary" style={{position: "absolulte", top: "25%", left: "150%" }}>Logout</Button></Link>
                    </div>
                </div>
            </div>
            {toggle === 'true' ? 
                <div className = "deposit-container">
                    <form className="deposit-form">
                        <ul>
                            <p>Deposit Amount</p><input {...deposit}/>
                        </ul>
                        <div className="button-container">
                            <input type='submit' onClick={sendDeposit}/>
                        </div>
                    </form>
                </div>  
            :
            null
                
            }
            </div>
    )
}

const mapStateToProps = state => state.authReducer

export default connect(mapStateToProps, {depositFunds, logout})(Header)
