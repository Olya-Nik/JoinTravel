import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessAC, addMongoMessAC } from '../redux/actions';
import { Button } from 'react-materialize';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  async componentDidMount() {
    let resp = await fetch('http://localhost:3001/messages', {
      credentials: 'include'
    });
    console.log(resp);
    let data = await resp.json();
    //console.log(data);
    this.props.addMongoMess(data.messageText);
  }

  changeMess = e => {
    this.setState({
      username: '',
      message: e.target.value
    });
  };

  onSubmit = async () => {
    this.setState({ message: '' });
    //send to DB
    const resp = await fetch('http://localhost:3001/messages/add', {
      method: 'POST',
      credentials: 'include', // cookie
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: this.state.message, receiver_id: this.props.match.params.id })
    });

    const data = await resp.json();
    console.log(data);
    this.props.addMess(data);
    //this.setState({ message: '' });
    const respUser = await fetch(
      `http://localhost:3001/user/${this.props.match.params.id}`,
      {
        method: 'GET'
      }
    );
    const user = await respUser.json();
    console.log(user.contacts);
    await fetch(
      `https://api.voximplant.com/platform_api/SendSmsMessage/?account_id=3199898&api_key=bd0a9853-7f4c-469e-9007-172f1e820277&source=79581008962&destination=${user.contacts}&sms_body=Test%20message`
    );
  };

  render() {
    let text = this.props.messTexts;
    return (
      <div className="messages">
        <h3>Send message</h3>
        <div className="messagesInput">
          <input
            type="text"
            placeholder="Send message"
            onChange={this.changeMess}
            value={this.state.message}
          />
        </div>

        <div className="button">
          <Button className="loginButton" type="submit" onClick={this.onSubmit}>
            SEND
          </Button>
        </div>

        <div className="messagesField">
          {text && text.map(el => (<div> {el.messageText}</div>))}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMess: messText => dispatch(addMessAC(messText)),
    addMongoMess: data => dispatch(addMongoMessAC(data))
  };
}

function mapStateToProps(state) {
  return {
    messTexts: state.messTexts,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
