import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'


function Accounts(props) {
    const { first_name, cash_balance } = props.user


    return (
        <div style={{height: "19vh", width: "14vw", display: "flex", justifyContent: "space-evenly", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <p style={{fontSize:"30px"}}>Hi,{first_name}!</p>
            </div>
            <div>
                <p>Total Holdings</p><p></p>
                <p style={{position: "relative", top:"10%"}}>Total Cash Balance</p><p style={{color: "green", fontSize: "20px"}}>${cash_balance}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => state.authReducer

export default connect(mapStateToProps)(Accounts)