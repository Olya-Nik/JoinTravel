import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      
      <Router component={Navbar}>
          <Navbar />
          <p class = 'user'>Your Name</p>
        <Switch>

          <Route exact path="/main" component={Main}/>
          <Route path exact="/search" />
          <Route exact path="/company" />
          <Route exact path="/profile'" />
          <Route path exact="/registration" />
          <Route exact path="/login" />
          <Route exact path="/logout" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
