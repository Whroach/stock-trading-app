import React from 'react'
import './Confirmation.css'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'


function Cleardeposit(props) {


    return (
        <div className="confirm-container-c">
            <div className="content-container-c">
                <h1 style={{position: "relative", left: "18%"}}>Success! Your deposit has been cleared! </h1>
                <Link to="/dashboard"><Button variant="outlined" color="primary" style={{fontSize: "20px",position: "relative", top: "50px", left: "30%", color: "white", padding: "20px", display: "flex", justifyContent:"center", width: "30vw"}}>Dashboard</Button></Link>
            </div>
        </div>
    )
}

const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Cleardeposit)