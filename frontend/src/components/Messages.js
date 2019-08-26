import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessAC, addMongoMessAC } from '../redux/actions';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  // async componentDidMount() {
  //   let resp = await fetch('http://localhost:3001/');
  //   let data = await resp.json();
  //   console.log(data);
  //   this.props.addMongoMess(data.text);
  // }

  changeMess = e => {
    this.setState({
      message: e.target.value
    });
  };

  onSubmit = async () => {
    this.setState({ message: '' });
    const resp = await fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: this.state.message })
    });

    const data = await resp.json();
    console.log(data);
    this.props.addMess(data);
  };

  render() {
    
    return (
      <div className="messages">
        <div className="messagesInput">
          <input
            type="text 1"
            placeholder="Send message"
            onChange={this.changeMess} value={this.state.message}
          />
        </div>

        <div className="button">
          <button className="loginButton" type="submit" onClick={this.onSubmit}>
            SEND
          </button>
        </div>

        <div className="messagesField">Messages
        {this.props.message}
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
