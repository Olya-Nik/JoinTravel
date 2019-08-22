import React from 'react';
import './App.css';
import Main from "./components/Main"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router component={Navbar}>
        <Switch>
          <Navbar />

          <Route exact path="/main" />
          <Route path="/search"/>
          <Route exact path="/company" />
          <Route exact path="/profile'" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
