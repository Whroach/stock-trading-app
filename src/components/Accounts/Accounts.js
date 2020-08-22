import React from 'react'
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format';

function Accounts(props) {
    const { first_name } = props.user

    return (
        <div style={{height: "19vh", width: "14vw", display: "flex", justifyContent: "space-evenly", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
    <p style={{margin: "0",padding: "0",fontSize:"30px"}}>Hi,{first_name}!</p>
            </div>
            <div style={{marignTop: 0}}>
                <p style={{position: "relative", top:"10%", left: "25%"}}>Total Cash Balance:</p><NumberFormat value={props.cash} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div><p style={{position: "relative", left: "25%",color: "green", fontSize: "20px"}} >{value}</p></div>} />
            </div>
        </div>
    )
}

const mapStateToProps = state => state.authReducer

export default connect(mapStateToProps)(Accounts)