import React from 'react'
import './Confirmation.css'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

function Confirmation(props) {

    return (
        <div className="confirm-container-c">
            <div className="content-container-c">
                <h1>Congratulations! You have succesfully made a trade!</h1>
                <Link to="/dashboard"><Button variant="outlined" color="primary" style={{fontSize: "20px",position: "relative", top: "50px", left: "22%", color: "white", padding: "20px", display: "flex", justifyContent:"center", width: "30vw"}}>Dashboard</Button></Link>
            </div>
        </div>
    )
}

const mappedStateToProps = state => state

export default connect(mappedStateToProps)(Confirmation)
