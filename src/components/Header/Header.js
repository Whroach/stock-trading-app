import React, {useState} from 'react'
import './Header.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {depositFunds} from '../../ducks/reducers/authReducer'
import Search from '../Search/Search'
import {Link} from 'react-router-dom'




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

    // console.log(props)


    return (
        <div>
            <div className="header-container">
                <Link to="/dashboard"><img style={{position: "relative", top: 1, height: 68}} src="logo.PNG" alt="logo"/></Link>
                <div className="nav-container">
                    <Link to="/dashboard" ><button style={{height: 40, width: 100, position: "relative", top: 16, fontSize: 20}}>Home</button></Link>
                    <Link to="/markets"><button style={{height: 40, width: 100, position: "relative", top: 16, fontSize: 20}}>Markets</button></Link>
                    <h2><Search/></h2>
                    <button id ="wallet-id"onClick={handleToggle} style={{height: 50, width: 130, position: "relative", top: 12, fontSize: 20, backgroundColor: "mediumblue", color: "white"}}>Wallet</button>
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

export default connect(mapStateToProps, {depositFunds})(Header)
