import React, {Component} from 'react';
import axios from 'axios'
import {Bar} from 'react-chartjs-2';
import {connect} from 'react-redux'

const state = {
  labels: [],
  datasets: [
    {
      label: 'Shares',
      backgroundColor: 'rgba(140, 20, 252, 1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: []
    }
  ]
}

class ChartDisplay extends Component {
  constructor(props){
    super(props)
    this.state={
      dbData: []
    }
  }


  componentDidMount = () =>{

    const id = this.props.user.account_id

    axios.get(`/api/chart/${id}`)
    .then(res => this.setState({dbData: res.data}))
    .catch(error => console.log(error))

  }



    render() {

      //symbol and shares

      const { labels , datasets } = state
      const { dbData } = this.state


      dbData.forEach(element=>{
        labels.push(element.symbol)
        datasets[0].data.push(element.shares)
        
      })

        return (
          <div>
          <Bar
            data={state}
            options={{
              title:{
                display:true,
                text:'Current Holdings',
                fontSize:20,
                fontColor: 'white'
              },
              legend:{
                display:true,
                position:'right',
                labels:{
                  fontColor: 'white'
                }
              },
              scales: {
                xAxes:[{
                  ticks:{
                    fontColor:'white'
                  }
                }],
                yAxes:[{
                  ticks:{
                    fontColor:'white'
                  }
                }]
              }
            }}
          />
        </div>
        );
      }
    }


const mapStateToProps = state => state.authReducer

export default connect(mapStateToProps)(ChartDisplay)