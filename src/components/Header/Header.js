import React from 'react'
import './Header.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {depositFunds} from '../../ducks/reducers/authReducer'
import Search from '../Search/Search'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { logout } from '../../ducks/reducers/authReducer'



function Header(props) {


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
                        <button id="wallet-btn" onClick={props.walletFn}>Wallet</button>
                    <div>
                        <Link to={'/'}><Button onClick={logoutUser} variant="outlined" color="secondary" style={{position: "absolulte", top: "25%", left: "150%" }}>Logout</Button></Link>
                    </div>
                </div>
            </div>
            </div>
    )
}

const mapStateToProps = state => state.authReducer

export default connect(mapStateToProps, {depositFunds, logout})(Header)
