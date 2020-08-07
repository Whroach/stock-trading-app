import React,{useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

function Reports(props) {

  const  ticker  = props.stockQuote
  const [report, setReport] = useState([])

  useEffect(() =>{
    getReport()

 }, [])

  const getReport =()=>{
    axios.get(`/api/report/${ticker}`)
    .then(res => setReport(res.data))
    .catch(error => console.log(error))
  }

  // console.log(report)


  //  const mapped = report.map((element, index)=>{
  //   const { balanceSheet } = element.statementData

  //     balanceSheet.map((element,index)=>{
  //     console.log(element)
  //   })
    
  // })




  return (
    <div>
      <div>
      </div>
      
    </div>
  )
}



const mappedStateToProps = state => state.quoteReducer

export default connect(mappedStateToProps)(Reports)