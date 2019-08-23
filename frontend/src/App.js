import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">

      <Router component={Navbar}>
        <Navbar />
        <p className='user'>Your Name</p>
        <Switch>

          <Route exact path="/main" component={Main} />
          <Route path="/search" />
          <Route exact path="/company" />
          <Route exact path="/profile" component={Profile} />
          <Route path="/signup" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route exact path="/logout" />

        </Switch>
      </Router>

    </div>
  );
}

export default App;
