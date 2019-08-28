import React, { Component } from 'react';
import { NavItem } from 'react-materialize';

class Logout extends Component {
  
  onLogout = async (e) => {
    e.preventDefault();
    this.props.history.push('/login')
  }

  render() {
   // console.log(this.props)
    return <NavItem href="#" onClick={this.onLogout}>Logout</NavItem>;
  }
}

export default Logout;
