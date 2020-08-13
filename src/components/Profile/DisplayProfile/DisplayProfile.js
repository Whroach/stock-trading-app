import React, {useState} from 'react'
import './DisplayProfile.css'
import Reports from './Reports/Reports'
import Description from './Description/Description'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function DisplayProfile(props) {
    const { equity, news, bio, description } = props
    const [toggle, setToggle] = useState('description')

    
    // function handleToggle(){
    //     setToggle(toggle === 'true' ? 'false' : 'true')
    // };


//     const objProfile = bio.pop()

//     console.log(objProfile)


// console.log(bio)




    let mapNews = news.map((element, index) => {
        return <div key={index} className="list-container" >
           <p>{element.headline}</p>
        </div>
      })

    let mapEquity = equity.map((element, index) => {
        return <div key={index} style={{fontSize: "40px", margin: "auto"}}>
            ${element.last}
        </div>
    })


    
    return (
    <div style={{height: "150vh"}}>
        <div className="profile-container">
            <div className="quotes-container">
            <h1>{description[0].name}</h1>
                Price: {mapEquity}
            </div>
                <div className="image-container" >
                    <img id="test-image" src="https://wallstreetonparade.com/wp-content/uploads/2020/03/Deutsche-Bank-Trading-Chart-From-February-14-through-March-5-2020-Versus-Wall-Street-Banks-and-U.S.-Insurers.jpg" alt="test"/>
                </div>
                <div className="news-container">
                    {mapNews}
                </div>
                </div>
                {/* <div style={{height: "50vh", width: "100vw"}}>
                    <button onClick={handleToggle}>Trade</button>
                </div> */}
                <div className="buttons-container-dp">
                    <ButtonGroup disableElevation variant="contained" color="primary" width="100vw">
                        <Button style={{width: "50vw"}}onClick={() => setToggle('description')}>Description</Button>
                        <Button style={{width: "50vw"}}onClick={() => setToggle('report')}>Financial Reports</Button>
                    </ButtonGroup>
                </div>
                {toggle === 'description' 
                ?
                <div>
                    <Description profileF={bio} info={description}/>
                </div>
                    // <div style={{display: "flex", justifyContent: "center", position: "absolute", bottom: "50%", left: "50%", backgroundColor: "blue"}}>
                    //     {/* <Orders/> */}
                    // </div>
                : 
                <div>
                    <Reports report={props.report}/>
                </div>

                }
    </div>
    )
}

