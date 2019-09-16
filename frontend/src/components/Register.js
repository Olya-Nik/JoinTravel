import React, { Component } from 'react';
import { Button } from 'react-materialize';
import fbIcon from '../icons/facebook.png';
import vkIcon from '../icons/vk.png';
const server = "http://localhost:3001"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  changeName = e => {
    this.setState({
      username: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  onClick = async e => {
    e.preventDefault();
    const sendForm = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(sendForm);

    await fetch(`${server}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendForm)
    });
    this.props.history.push('/auth/login');
  };

  onClickFacebook = e => {
    window.location.assign('http://localhost:3001/auth/facebook/cb');
  };

  onClickVK = e => {
    window.location.assign('http://localhost:3001/auth/vkontakte/cb');
    //this.props.history.push('/');
  };

  render() {
    return (
      <div className="form">
        <div className="inputForm">
          <h2>Registration</h2>
          <input
            type="text"
            placeholder="Name"
            onChange={this.changeName}
            value={this.state.username}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
        </div>

        <div className="button">
          <div>
            <Button
              className="loginButton"
              type="submit"
              onClick={this.onClick}
              value={this.state.password}
            >
              Register User
            </Button>

            <div>
              <a className="facebookIcon" onClick={this.onClickFacebook}>
                <img src={fbIcon} alt="facebook" />
              </a>
              <a className="vKIcon" onClick={this.onClickVK}>
                <img src={vkIcon} alt="vk" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
