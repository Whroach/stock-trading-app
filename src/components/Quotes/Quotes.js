// import React, {useState, useEffect} from 'react'
// import { connect } from 'react-redux'
// import {getStockQuotes} from '../../ducks/reducers/quotesReducer'
// import './Quotes.css'




// function Quotes(props) {

    // const [quotes, setQuote] = useState([])

        // useEffect(() => {
        //     getIndicesQuotes()
    
        //   },[])



    

    // const getIndicesQuotes = () =>{
    //     axios.get('/api/quotes')
    //         .then(response =>{
    //             let mappedQuotes = response.data.map((element) =>{
    //                 return element
    //             })

    //             setQuote(mappedQuotes)
    //             // props.getStockQuotes(mappedQuotes)
    //         })
    //         .catch(error => console.log(error))

    // }

   
    // const {askPrice, bidPrice, last, volume} = quotes


    // const mappedQuotes = quotes.map((element, index) =>{
    //     return <div key={index}>
    //                 <div>
    //                     <h1>{element.ticker}</h1>
    //                     <p style={{color: "green"}}>{element.last}</p>
    //                     <p style={{color: "red"}}>{element.prevClose / element.last}</p>
    //                 </div>
    //     </div>
    // })





    // return (
    //     <div className="quotes-container-q">
    //         <div className="indices-container">
    //             <h1>What</h1>
    //             <h2>IS</h2>
    //             <h3>UP</h3>
    //         </div>
    //         <div>

    //         </div>
    //         <div>
    //             <img src="https://images.wsj.net/im-16358?width=620&size=1.5"/>
    //         </div>
    //     </div>





        // <div style={{backgroundColor: "green"}}>
        //     <ul>
        //         {/* <p>Previous Close:</p><h1>{bidPrice}</h1>
        //         <p>Open:</p><h2>{askPrice}</h2>
        //         <p>High:</p><h2>{last}</h2>
        //         <p>Low:</p><h2>{volume}</h2> */}
        //     </ul>
        // </div>
//     )
// }


// const mappedStateToProps = state => state.quotesReducer

// export default connect(mappedStateToProps, {getStockQuotes})(Quotes)