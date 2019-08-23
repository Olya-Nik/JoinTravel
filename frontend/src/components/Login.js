import React, { Component } from 'react';

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
    await fetch ('http://localhost:3001/login', {
        method: 'POST',
        credentials : 'include',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendForm)
    })
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
    // const { isLogged, status } = this.props.auth;
    // const disabled = status === 'pending';
    // const loginButtonCss =
    //   styles['login_button_' + (status === 'pending' ? 'disabled' : 'active')];

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
          <input type="text" placeholder="Имя" onChange={this.changeName} />
          <input type="password" placeholder="Пароль" onChange={this. changePassword}/>
        </div>

        <div className="button">
          <button
            className="loginButton" type="submit" onClick={this.onClick}
            // disabled={disabled}
            // onClick={() => this.auth('login')}
          >
            Войти
          </button>
          {/* <button
            className="loginButton" type="submit" onClick={this.onClick}
            disabled={disabled}
            onClick={() => this.auth('signup')}
          >
            Регистрация
          </button> */}
        </div>

        {/* <div className={styles.loading}>{this.renderByStatus()}</div> */}
      </div>
    );
  }
}

export default Login;
