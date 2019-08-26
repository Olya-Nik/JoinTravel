import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import Map from "./components/Map"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">

      <Router component={Navbar}>
        <Navbar />
        <p class='user'>Your Name</p>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/search" />
          <Route exact path="/company" />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/registration" />
          <Route exact path="/login" />
          <Route exact path="/logout" />
          <Route exact path="/map" component={Map}/>

        </Switch>
      </Router>

    </div>
  );
}




// if (navigator.geolocation) {
//   console.log('Geolocation is supported!');
// }
// else {
//   console.log('Geolocation is not supported for this Browser/OS version yet.');
// }

// window.onload = function() {
//   let startPos;
//   let geoSuccess = function (position){
//     startPos = position;
//     console.log(startPos.coords.latitude)
//     console.log(startPos.coords.longitude)
//   }
//   navigator.geolocation.getCurrentPosition(geoSuccess);
// }

export default App;
