import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import {connect} from 'react-redux'
import axios from 'axios'



class ChartDisplay extends Component {
  constructor(props){
    super(props)

    this.state = {
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

  };

  componentDidMount =()=>{
    this.getPositions()

  }

  getPositions = () =>{
    const id = this.props.user.account_id
    
    const { labels,datasets } = this.state
    let newLabels = [...labels];
    let newDatasets = [...datasets]
    
    axios.get(`/api/chart/${id}`)
    .then(res => {

      res.data.forEach((element,index,array)=>{
        if(array.indexOf(element) === index ){
          newLabels.push(element.symbol)
          newDatasets[0].data.push(element.shares)
        }
      })
      this.setState({
        labels: newLabels,
        datasets: newDatasets
      })
    })
    .catch(error => console.log(error))
  
  
  
   }



    render() {


        return (
          <div>
          <Bar
            data={this.state}
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