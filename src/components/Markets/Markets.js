import React, { Component } from 'react'
import axios from 'axios'
import Quotes from '../Quotes/Quotes'
import './Market.css'

export default class Markets extends Component {
    constructor(props){
        super(props)

        this.state={
            indices: [],
            stocks:[],
            forex: [],
            crypto: []
            
        }

        this.getIndices = this.getIndices.bind(this)
    };

    componentDidMount = () =>{
        this.getIndices()
    }



    getIndices(){
        axios.get('/api/quotes')
        .then(res =>{
            this.setState({indices: res.data})
        })
        .catch(() => console.log('error in getIndices'))
        
    }




    render() {
        return (
            <div className="body-m">
                <div className="quotes-container-m">
                <Quotes/>
                </div>
            </div>
        )
    }
}
