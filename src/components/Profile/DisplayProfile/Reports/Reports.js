import React,{useState} from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import './Reports.css'

function Reports(props) {

  const [page, displayPage] = useState('balance')



  const { incomeStatement, balanceSheet, cashFlow } = props.report

  const incomeObj = {...incomeStatement}
  const balanceObj ={...balanceSheet}
  const cashObj = {...cashFlow}

  return (
    <div>
      <div className="buttons-container-r">
        <ButtonGroup color="primary" aria-label="outlined primary button group" style={{width: "100vw"}}>
                      <Button style={{width: "33.33%", color:"black", fontWeight: "bold"}} className='buttons-r' onClick={() => displayPage('balance')}>Balance Sheet</Button>
                      <Button  style={{width: "33.33%", color:"black", fontWeight: "bold"}} className='buttons-r'onClick={() => displayPage('income')}>Income Statement</Button>
                      <Button style={{width: "33.33%", color:"black", fontWeight: "bold"}} className='buttons-r' onClick={() => displayPage('cash')}>Cash Flow</Button>
        </ButtonGroup>
      </div>
      <div className="list-r">
        {page === 'balance'
        ?
        <div>
          {Object.entries(balanceObj).map(([key, value]) => {
            return <div style={{height: "10%",borderBottom:"solid black 1px"}} key={key}>
              <div style={{display: "flex", justifyContent:"space-evenly"}}>
                <p>{value.dataCode.toUpperCase()}</p>
                <p>{value.value}</p>
              </div>
            </div>

          })}
        </div>
        
        :
        page === 'income'
        ?
        Object.entries(incomeObj).map(([key, value]) => {
          return <div style={{height: "10%",borderBottom:"solid black 1px"}} key={key}>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
              <p>{value.dataCode.toUpperCase()}</p>
              <p>{value.value}</p>
            </div>
          </div>

        })
        :
        Object.entries(cashObj).map(([key, value]) => {
          return <div style={{height: "10%",borderBottom:"solid black 1px"}} key={key}>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
              <p>{value.dataCode.toUpperCase()}</p>
              <p>{value.value}</p>
            </div>
          </div>

        })};
      </div>
    </div>
  )
}


export default Reports