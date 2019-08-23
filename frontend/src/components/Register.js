import React, { Component } from 'react';

class Register extends Component {
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

    console.log(sendForm);

    await fetch('http://localhost:3001/signup', {
      method: 'POST',
    //   credentials: 'include',
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
        <div className="inputForm">
          <input type="text" placeholder="Имя" onChange={this.changeName} />
          <input type="password" placeholder="Пароль"  onChange={this. changePassword} />
        </div>

        <div className="button">
          <button className="loginButton" type="submit" onClick={this.onClick}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
