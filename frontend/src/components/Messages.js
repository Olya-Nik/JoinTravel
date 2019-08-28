import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessAC, addMongoMessAC } from '../redux/actions';
import { Button } from 'react-materialize';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    };
  }

  // async componentDidMount() {
  //   let resp = await fetch('http://localhost:3001/messages');
  //   let data = await resp.json();
  //   console.log(data);
  //   this.props.addMongoMess(data.message);
  // }

  changeMess = e => {
    this.setState({
      username: "",
      message: e.target.value
    });
  };

  onSubmit = async () => { //send to DB
    const resp = await fetch('http://localhost:3001/messages', {
      method: 'POST',
      credentials : 'include', // cookie
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: this.state.message })
    });

    const data = await resp.json();
    console.log(data);
    this.props.addMess(data);
    this.setState({ message: '' });
  };

  fetchMessages = async () => {
    const resp = await fetch('http://localhost:3001/messages', {
      credentials : 'include',
    });
    const data = await resp.json();
    console.log(data[0]);
  };


  render() {
    return (
      <div className="messages">
        <h5>Send message</h5>
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
          Messages
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
    messTexts: state.messTexts
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
