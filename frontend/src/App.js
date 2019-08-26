import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import ProfileReady from "./components/ProfileReady"
import Company from "./components/Company"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar />
        <Switch>

          <Route exact path="/" component={Main} />

          <Route path="/search" />
          <Route exact path="/company" component={Company} />
          <Route path="/company/:id" component={ProfileReady} />
          <Route exact path="/profile" component={Profile} />

          <Route path='/messages' component={Messages}/>
          <Route path="/signup" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
