import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import MessageList from './components/chatroom/MessageList'
import TextBox from './components/chatroom/TextBox'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'


class App extends React.Component {

  render() {
    const { auth, profile } = this.props;
    if (auth.uid) {
      return (
        <div className="App">
          <div className="message">
            <MessageList
              chatroomId={this.state.chatroom_id}
              key={this.state.chatroom_id}
            />
          </div>
          <div className="Text">
            <TextBox
              chatroomId={this.state.chatroom_id}
              key={this.state.chatroom_id}
            />
          </div>
        </div>
      )
    } else
      return (
        <SignIn />
      )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(App);
