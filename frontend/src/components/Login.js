import React, { Component } from 'react';
import { Button } from 'react-materialize';

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

  render() {
    return (
      <div className="form">
        {/* <div className={styles.social_buttons}>
          <a className={styles.link} href="/auth/vkontakte">
            <span className={styles.vk_icon} />
          </a>
          <a className={styles.link} href="auth/twitter">
            <span className={styles.twitter_icon} />
          </a>
          <a className={styles.link} href="/auth/facebook">
            <span className={styles.facebook_icon} />
          </a>
        </div> */}

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
            <a className="facebook" href="/auth/facebook">
              <span className="iconF">facebook</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
