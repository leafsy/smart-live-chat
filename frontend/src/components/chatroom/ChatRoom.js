import React, { Component } from "react";
import "../style.css";
import TextBox from "./TextBox";
import { connect } from "react-redux";
import { sendMessage, getMessages } from "../../store/actions/chatActions";
import MessageList from "./MessageList";

class ChatRoom extends Component {
  handleSendMessage = (e, msg) => {
    e.preventDefault();
    // this.textBox.current.cleanBox();
    const auth = this.props.auth;
    console.log(auth);
    if (!auth.uid) {
      this.askSignIn();
      console.log("Please sign in! ");
    } else {
      var message = {
        eId: this.props.eventId,
        body: msg.body,
        userId: auth.uid,
        userName: auth.displayName,
        vid: "1234"
      };
      this.props.sendMessage(message);
      console.log("submitted!");
    }
  };
  render() {
    const { event, auth, chatroom, messages } = this.props;
    this.props.getMessages();
    var messages_arr = [];
    if (messages) {
      messages_arr = Object.values(messages);
    }
    return (
      <div>
        <MessageList messages_arr={messages_arr} auth={auth} />
        <div className="text-editor">
          <TextBox
            auth={auth}
            askSignIn={this.askSignIn}
            eventId={this.props.eventId}
            ref={this.textBox}
            handleSendMessage={this.handleSendMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('log chatroom state: ', state)
  // console.log('log chatroom ownProps: ', ownProps)
  const id = ownProps.eventId;
  const events = state.firestore.data.events;
  const event = events ? events[id] : null;
  const chatrooms = state.firestore.data.chatrooms;
  const chatroom = chatrooms ? chatrooms[id] : null;
  //   const messages = state.firestore.data.messages;
  const messages = state.rootChat.messages;
  return {
    event: event,
    chatroom: chatroom,
    messages: messages,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => dispatch(sendMessage(message)),
    getMessages: () => dispatch(getMessages())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
