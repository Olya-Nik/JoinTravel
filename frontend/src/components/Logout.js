import React, { Component } from 'react';
import { NavItem } from 'react-materialize';

class Logout extends Component {
  
  onLogout = async (e) => {
    
  }

  render() {
    return <NavItem href='/login' onClick={this.onLogout}>Logout</NavItem>;
  }
}

export default Logout;
