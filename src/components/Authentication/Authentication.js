import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducers/authReducer'
import axios from 'axios'
import './Authentication.css'

class Authentication extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            account: '',
            age: '',
            viewRegister: false

        }

        this.createNewAccount = this.createNewAccount.bind(this);
        this.loginUser = this.loginUser.bind(this);
    };

    componentDidMount = () =>{
        if(this.props.user.username){
            this.props.history.push('/dashboard')
        }
    }

    createNewAccount(){
        const {username, password, firstName, lastName, account, age} = this.state
        axios.post('/auth/register', {username, password, first_name: firstName.toUpperCase(), last_name: lastName, account_type: account, age:age})
        .then(response =>{
            this.props.getUser(response.data)
            this.props.history.push('/dashboard')
        })
        .catch(() => console.log('error with createNewAccount function'))
        
    }



    loginUser(event){
        event.preventDefault()
        const { username, password } = this.state

        // console.log('hit 1')
        axios.post('/auth/login', {username, password})
        .then(res => {
            // console.log('hit 2')
            this.props.getUser(res.data);
            this.props.history.push('/dashboard');
        })
        .catch(error => console.log(error))
    }


    handleInput = (event) =>{
        this.setState({[event.target.name]: event.target.value})

    }

    toggleView =()=>{
        this.setState({viewRegister: !this.state.viewRegister})
    }




    render() {

        // console.log(this.props)

        return (
            <div className="auth-container">
                <div className="img-a"></div>
                <h1 style={{position: "absolute", top: "5%", left: "26%", color: "white", fontFamily:"cursive", fontSize: "50px"}}>Ready to Invest For Your Future?</h1>
                <div className="secondary">
                    <form className="form-container-a">
                        {this.state.viewRegister
                        ?
                        <ul>
                            <p>Username:</p><input value={this.state.username} name='username' onChange={(element) => this.handleInput(element)}></input>
                            <p>Password:</p><input value={this.state.password} name='password' onChange={(element) => this.handleInput(element)}></input>
                            <p>Account Type:</p><input value={this.state.account} name='account' onChange={(element) => this.handleInput(element)}></input>
                            <p>First Name:</p><input value={this.state.firstName} name='firstName' onChange={(element) => this.handleInput(element)}></input>
                            <p>Last Name:</p><input value={this.state.lastName} name='lastName' onChange={(element) => this.handleInput(element)}></input>
                            <p>Age:</p><input value={this.state.age} name='age' onChange={(element) => this.handleInput(element)}></input>
                            <div>
                                <button onClick={this.createNewAccount}>Register</button>
                                <button onClick={this.toggleView}>Login</button>
                            </div>
                        </ul>
                        :
                        <ul className="input-fields">
                            <p>Username:</p><input value={this.state.username} name='username' onChange={(element) => this.handleInput(element)}></input>
                            <p>Password:</p><input value={this.state.password} name='password' type='password' onChange={(element) => this.handleInput(element)}></input>
                            <div className="button-containers-a">
                                <button className="button" onClick={this.toggleView}>Register</button>
                                <button className="button"  onClick={this.loginUser}>Login</button>
                            </div>
                        </ul>

                         } 
                    </form>
                </div>
            </div>
        )
    }
}

const mappedStateToProps = state => state.authReducer

export default connect(mappedStateToProps, {getUser})(Authentication)