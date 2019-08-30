import React, { Component } from "react";
import fone from '../img/mainFon.jpg';


export default class Main extends Component {

    // state = {
    //   content: "Hello. This is 3rd assessment of Hedgehogs 2019. MARVELous functionality, breathtaking UI."
    // };
    
    render() {
        let style = {
            backgroundImage: `url(${fone})`,
            backgroundPosition: "top center",
            backgroundSize: "100%",
            minHeight: "calc(100vh - 60px)"
        }
        let innerStyle = {
            backgroundColor: "rgba(0,0,0,.7)", 
            minHeight: "calc(100vh - 60px)"
        }
    
        return (
            <div className='mainpagediv'>
                <div className='textmain1'>
                    <h1 id ='a'> JoinTravel </h1>
                    <h3> Welcome to our application. It helps you to find  interesting people to make you travel awesome!   </h3>
                </div>
                <div className='imgfirst' style={style}>
                    <div style={innerStyle}>





                    </div>
                    {/* <img src='https://pixabay.com/get/57e4d24b4253ac14ea9d857ec32d32771038c3e4565776497d2b78dc94/go-pro-1478810.jpg' width ='100%'></img> */}
                </div>
                {/* <div>Ololo<br/><br/><br/><br/><br/><br/><br/></div> */}
            </div>
        );
    }
}