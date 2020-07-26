import React from 'react'
import './Header.css'
import Search from '../Search/Search'

export default function Header(props) {


    return (
        <div className="header-container">
            <h1>Fintech</h1>
            <h2><Search/></h2>
        </div>
    )
}
