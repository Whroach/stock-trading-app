import React from 'react'
import './App.css';
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from './components/Header'

function App(props) {


  return (
    <>
      {/* {props.location.pathname === "/" ? null : <Header />} */}
      <div>{routes}</div>
    </>
  );
}

export default withRouter(App);
