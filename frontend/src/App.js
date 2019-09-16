import React, { Component, Suspense } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Map from './components/Map';
import ProfileReady from './components/ProfileReady';
import Company from './components/Company';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Messages from './components/Messages';
import Search from './components/Search';
import { connect } from 'react-redux';
import { checkLoginAC } from './redux/actions';


class App extends Component {
  async componentDidMount() {
    try {
      let resp = await fetch('http://localhost:3001/auth', {
        credentials: 'include'
      });
      const login = await resp.json();
      this.props.checkLogin(login.login);
    } catch (e) {
      console.log('Unauthorized');
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/map" component={Map} />
            <Route exact path="/" component={Main} />
            <Route exact path="/company" component={Company} />
            <Route path="/company/:id" component={ProfileReady} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/messages/:id" component={Messages} />
            <Route path="/auth/signup" component={Register} />
            <Route path="/auth/login" component={Login} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
        {/* <Test/> */}
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkLogin: loginUser => dispatch(checkLoginAC(loginUser))
  };
}

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
