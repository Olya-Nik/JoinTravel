import React, { Component } from 'react';
import { Button } from 'react-materialize';
import fbIcon from '../icons/facebook.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onClick = async () => {
    const sendForm = {
      username: this.state.username,
      password: this.state.password
    };
    await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendForm)
    });
    this.props.history.push('/');
  };

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

  onClickFacebook = e => {
    window.location.assign('http://localhost:3001/auth/facebook/cb')
  }

  render() {
    return (
      <div className="form">
        <div className="inputForm">
          <h2>Login</h2>
          <input type="text" placeholder="Name" onChange={this.changeName} />
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
            >
              Login User
            </Button>
            <div>
              <a className="facebookIcon" onClick={this.onClickFacebook}>
                <img src={fbIcon} alt="facebook"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
