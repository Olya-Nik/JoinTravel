import React, { Component } from 'react';
import { NavItem } from 'react-materialize';
import { connect } from 'react-redux';
import { logoutAC } from '../redux/actions';

class Logout extends Component {
  onLogout = async e => {
    e.preventDefault();
     await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.props.logout(this.props.history);
    this.props.history.push('/auth/login');
  };

  render() {
    // console.log(this.props)
    return (
      <NavItem href="#" onClick={this.onLogout}>
        Logout
      </NavItem>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAC())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
