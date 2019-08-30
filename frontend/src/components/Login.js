import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkLoginAC } from '../redux/actions';
import { Button } from 'react-materialize';
import fbIcon from '../icons/facebook.png';
import vkIcon from '../icons/vk.png';


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

    try {
      let resp = await fetch('http://localhost:3001/auth', {
        credentials: 'include'
      });
      const login = await resp.json();
      this.props.checkLogin(login.login);
    } catch (e) {
      console.log('Unauthorized');
    }

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
    window.location.assign('http://localhost:3001/auth/facebook/cb'); //set global state
    this.props.history.push('/');
  };

  onClickVK = e => {
    window.location.assign('http://localhost:3001/auth/vkontakte/cb');
    //this.props.history.push('/');
  };

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

function mapDispatchToProps(dispatch) {
  return {
    checkLogin: loginUser => dispatch(checkLoginAC(loginUser))
  };
}

// function mapStateToProps(state) {
//   return {
//     login: state.login
//   };
// }

export default connect(
  null,
  mapDispatchToProps
)(Login);;
