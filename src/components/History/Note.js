import React, {useState, useEffect} from 'react'
import {withRouter, useHistory, Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Note(props) {
    const client_id = props.user.account_id
    let history = useHistory()
    const { id } = props.match.params
    const [item, setItem ] = useState([])
    const [note, setNote] = useState('')


    useEffect(() => {
        axios.get(`/api/note/${id}`)
        .then(res => {

            let mappedNote = res.data.map(element=>{
                return element.description
            })
            setItem(mappedNote)
        })
        .catch(error => console.log(error))
    }, [])


    const submitNote = () => {
        if(note.length > 1){
            axios.put(`/api/note/${id}`, {note})
            .then( () => history.push(`/history/${client_id}`))
            .catch(error => console.log(error))
        }

    }




    return (
        <div style={{height: "83.7vh", width: "100vw", display: "flex", justifyContent: "center", backgroundColor:"lightgrey"}}>
            <div style={{height: "30vh", width: "40vw", backgroundColor:"white", display:"flex", flexDirection:"column", position:"relative", top:"25%"}}>
                <Link to={`/history/${client_id}`}><ArrowBackIcon style={{color:"black"}}/></Link>
                <h2 style={{display: "flex", justifyContent:"center"}}>Trade Notes</h2>
                <div style={{height: "64%", backgroundColor:"red"}}>
                    <textarea onChange={e => setNote(e.target.value)} style={{height: "97%", width:"99.4%", textAlign:"start-top"}} placeholder={item.length >= 1 ? item[0] : 'Add notes here!'} />
                </div>
                <button style={{height: "15%", backgroundColor:"blue", color:"white"}} onClick={submitNote}>Submit</button>
            </div>
        </div>
    )
}

const mappedStateToProps = state => state.authReducer

export default withRouter(connect(mappedStateToProps)(Note))

