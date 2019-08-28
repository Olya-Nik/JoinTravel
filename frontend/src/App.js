import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"

import Map from "./components/Map"
import ProfileReady from "./components/ProfileReady"
import Company from "./components/Company"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messages from './components/Messages';
import SMS from './components/TestSMS'

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <Switch>

          
          <Route exact path="/map" component={Map}/>
          <Route exact path="/" component={Main} />
          <Route path="/search" />
          <Route exact path="/company" component={Company} />
          <Route path="/company/:id" component={ProfileReady} />
          <Route exact path="/profile" component={Profile} />
          <Route path='/messages' component={Messages}/>
          <Route path="/signup" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" />
          <Route path="/sms" component={SMS} />

        </Switch>
      </div>
    </Router>
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
