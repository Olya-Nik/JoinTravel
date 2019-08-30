import React from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { Navbar } from 'react-materialize';
import Logout from './Logout';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

function myNavbar(props) {
  return (
    <div className="Links" >
      {props.login ? (
        <Navbar  brand={<a />} alignLinks="right">
          <Link to={'/'}>Main Page</Link>
          <Link to={'/profile'}>Profile</Link>
          <Link to={'/search'}>Search</Link>
          <Link to={'/company'}>Company</Link>
          <Link to={'/map'}>Map</Link>
          <Link to={'/messages'}>Messages</Link>
          <Route component={Logout} />
          <h7 id='name'>{props.login}</h7>
        </Navbar>
      ) : (
        <Navbar alignLinks="right">
          <Link to={'/'}>Main Page</Link>
          <Link to={'/auth/signup'}>Sign Up</Link>
          <Link to={'/auth/login'}>Sign In</Link>
        </Navbar>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(myNavbar);
