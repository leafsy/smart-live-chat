import React from "react";
import "./App.css";
import { connect } from "react-redux";
import MessageList from "./components/chatroom/MessageList";
import TextBox from "./components/chatroom/TextBox";
import SignIn from "./components/auth/SignIn";
import Admin from "./components/admin/Admin";
import {getChatroomId} from "./store/actions/chatActions";
import SignUp from "./components/auth/SignUp";
import ChatRoom from "./components/chatroom/ChatRoom";

class App extends React.Component {
  state = {
    chatroomId: undefined,
  };

  render() {
    const { auth, profile } = this.props;

    if (auth.uid) {
      if(auth.uid ==  'roB7fvV8KGWhIlP07T6LPa6IPNb2'){
        return <Admin/>;
      }else{
        if(this.props.chatroomId){
          return <ChatRoom chatroomId={this.props.chatroomId}/>;
        }else{
          return null
        }
        // return <ChatRoom videoId={this.state.videoId}/>;
      }
    } else {
      return <SignIn />;
    }
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get("v");
    videoId='a123456'
    console.log("===componentDidMount===",videoId,this.props.uid)
    if(this.props.uid){
      this.props.getChatroomId(videoId,this.props.uid)
    }
  }

  componentDidUpdate(prevProps) {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let videoId = params.get("v");

    videoId='a123456'
    console.log("===componentDidUpdate===",videoId,this.props.uid)
    if(this.props.uid){
      this.props.getChatroomId(videoId,this.props.uid)
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
    getChatroomId: (videoId, chatroomId) => dispatch(getChatroomId(videoId, chatroomId)),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(App);
