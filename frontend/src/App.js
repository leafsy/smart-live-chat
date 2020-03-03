import React from "react";
import "./App.css";
import { connect } from "react-redux";
import MessageList from "./components/chatroom/MessageList";
import TextBox from "./components/chatroom/TextBox";
import SignIn from "./components/auth/SignIn";
import Admin from "./components/admin/Admin";
import { getChatroomId } from "./store/actions/chatActions";
import { updateChatroomId } from "./store/actions/surveyActions";
import SignUp from "./components/auth/SignUp";
import ChatRoom from "./components/chatroom/ChatRoom";
import Survey from "./components/chatroom/Survey";

class App extends React.Component {
  state = {
    vid: "a123456",
    chatroomId: undefined
  };

  render() {
    const { auth, profile } = this.props;

    if (auth.uid) {
      if (auth.uid == "roB7fvV8KGWhIlP07T6LPa6IPNb2") {
        return <Admin />;
      } else if (this.props.chatroomId) {
        return <ChatRoom chatroomId={this.props.chatroomId} />;
      } else {
//        return <Survey uid={this.props.uid} vid={this.state.vid} />;
        fetch("https://us-central1-smartlivechat2019.cloudfunctions.net/app" +
          "/api/surveyanswer", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            uid: this.props.uid,
            vid: this.state.vid,
            answers: []
          })
        })
        .then(res => res.json())
        .then(data => this.props.updateChatroomId(data.cid));
        return null;
      }
    } else {
      return <SignIn />;
    }
  }

  componentDidMount() {
    let params = (new URL(document.location)).searchParams;
    let videoId = params.get("v");
    if (videoId) {
      this.setState({ vid: videoId });
    } else {
      videoId = this.state.vid;
    }
    console.log("===componentDidMount===", videoId, this.props.uid);
    if (this.props.uid) {
      this.props.getChatroomId(videoId, this.props.uid);
    }
  }
}
const mapStateToProps = state => {
  console.log(state.firebase.auth.email);
  console.log(state.firebase.profile);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    uid: state.firebase.auth.uid,
    chatroomId: state.rootChat.chatroomId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChatroomId: (videoId, chatroomId) =>
      dispatch(getChatroomId(videoId, chatroomId)),
    updateChatroomId: (chatroomId) =>
      dispatch(updateChatroomId(chatroomId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
