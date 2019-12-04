import React from "react";
import "./App.css";
import { connect } from "react-redux";
import MessageList from "./components/chatroom/MessageList";
import TextBox from "./components/chatroom/TextBox";
import SignIn from "./components/auth/SignIn";
import Admin from "./components/admin/Admin";
import SignUp from "./components/auth/SignUp";
import ChatRoom from "./components/chatroom/ChatRoom";

class App extends React.Component {
  render() {
    const { auth, profile } = this.props;

    if (auth.uid) {
      if(auth.uid ==  'roB7fvV8KGWhIlP07T6LPa6IPNb2'){
        return <Admin/>;
      }else{
        return <ChatRoom />;
      }
      
    } else return <SignIn />;
  }
}
const mapStateToProps = state => {
  console.log(state.firebase.auth.email);
  console.log(state.firebase.profile);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(App);
