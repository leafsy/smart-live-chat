import React, { Component } from "react";
import "../style.css";
import TextBox from "./TextBox";
import { connect } from "react-redux";
import {
  sendMessage,
  getMessages,
  clearMessage
} from "../../store/actions/chatActions";
import { signOut } from "../../store/actions/authActions";
import MessageList from "./MessageList";

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    const { chatroomId } = props;
    this.props.getMessages(chatroomId);

    this.myRef = React.createRef();
    this.scrollToBottom = this.scrollToBottom.bind(this);

  }

  scrollToBottom = () =>{
    this.myRef.current.scrollIntoView({ behavior: 'smooth' , block: "end"})
  }

  handleSendMessage = (e, msg) => {
    e.preventDefault();
    const auth = this.props.auth;
    console.log(auth);
    if (!auth.uid) {
      this.askSignIn();
      console.log("Please sign in! ");
    } else {
      var message = msg.body;
      console.log(this.props.profile.userName)
      this.props.sendMessage(this.props.profile.userName, message, this.props.chatroomId);
      console.log("submitted!");
    }

  };

  onClick = e => {
    this.props.signOut();
    this.props.clearMessage();
  };

  componentDidUpdate(prevProps) {
    this.scrollToBottom()
  }

  render() {
    const { event, auth, chatroom, messages } = this.props;
    // console.log(this.props.profile.userName);
    var messages_arr = [];
    if (messages) {
      messages_arr = Object.values(messages);
    }
    return (
      <div className="container">
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
        <button className="btn blue waves-effect waves-light" style={{margin:"1rem 0"}} onClick={this.onClick}>sign out</button>
        <div ref={this.myRef} />
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
  const email = state.firebase.auth.email;
  return {
    event: event,
    chatroom: chatroom,
    messages: messages,
    auth: state.firebase.auth,
    email: email,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (userName, message, chatroomId) =>
      dispatch(sendMessage(userName, message, chatroomId)),
    getMessages: chatroomId => dispatch(getMessages(chatroomId)),
    clearMessage: () => dispatch(clearMessage()),
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
