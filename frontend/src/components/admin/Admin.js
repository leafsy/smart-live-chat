import React, { Component } from "react";
import "../style.css";
import AlgorithmBox from "./AlgorithmBox";
import Checkbox from "./Checkbox";
import EmailMsgBox from "./EmailMsgBox";
import { getSessions, getAlgorithms,sendMessageAtT} from "../../store/actions/adminActions";
import { sendMessage } from "../../store/actions/chatActions";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";


class Admin extends Component {

  state = {
    time: 0,
    checkboxes: {},
    timer: null
  };

  constructor(props) {
    super(props);
    this.props.getAlgorithms();
    this.props.getSessions();

    this.start =this.start.bind(this)
    this.myTimer =this.myTimer.bind(this)
    this.pause =this.pause.bind(this)
  }

  start(){
    if(!this.state.timer){
      var timer = setInterval(this.myTimer, 1000);
      this.setState({...this.state, timer: timer})
    }
  }
  pause(){
    clearInterval(this.state.timer)
    this.setState({...this.state, timer: null})
  }

  myTimer() {
    var chatrooms = [];
    Object.keys(this.state.checkboxes)
        .filter(checkbox => this.state.checkboxes[checkbox])
        .forEach(checkbox => {
          chatrooms.push(checkbox)
        });

    console.log(chatrooms + "send time:" + this.state.time)
    if(chatrooms.length>0){
      this.props.sendMessageAtT(chatrooms,this.state.time)
    }
    this.setState({...this.state, time: this.state.time+1 })

  }

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));

  };

  handleSendMessage = (e, box) => {
    e.preventDefault();
    this.props.sendMessage(box.email, box.content);
  };

  render() {
    const { sessions,algorithms} = this.props;

    let algoDiv,sessionDiv;

    if(algorithms.length > 0) {
      algoDiv = 
      <div className="row">
        <AlgorithmBox algorithms={algorithms} />
      </div>
    } 

    if(sessions.length > 0) {
      sessionDiv = 
      <div className="row">
        <div className="sessionbox" id="sessionbox">
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Platform</th>
                        <th>Stream id</th>
                        <th>Chat Room</th>
                    </tr>
                    {sessions.map((session,index) => (
                        <tr key={index}>
                            <th>
                            <Checkbox
                                label = {session.chatroomid}
                                isSelected={this.state.checkboxes[session.chatroomid]}
                                onCheckboxChange={this.handleCheckboxChange}
                                key={session.chatroomid}
                                /></th>
                            <th>{session.platform}</th>
                            <th>{session.streamid}</th>
                            <th>{session.chatroomid}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    } 

    return (
      <div>
        <div className="row">
          <div className="column">AvailableSettions</div>
          <div className="column">
          <button onClick={this.props.signOut}>sign out</button>
          </div>
        </div>

        {sessionDiv}

        <div className="row">
          Algorithms       
        </div>

        {algoDiv}

        <div className="row">
          Send bulk messages from FireBase
          <div className="divider"/>
          <div className="divider"/>
          <button onClick={this.start}>Start</button>
          <div className="divider"/>
          <button onClick={this.pause}>Pause</button>
        </div>

        <div className="row">
          <EmailMsgBox/>
        </div>

      </div>
    );
  
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sessions: state.adminReducer.sessions,
    algorithms: state.adminReducer.algorithms,
  };
};

// have access to signIn into our props
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (email, message) => dispatch(sendMessage(email, message)),
    getSessions: () => dispatch(getSessions()),
    getAlgorithms: () => dispatch(getAlgorithms()),
    sendMessageAtT: (chatrooms,offset) => dispatch(sendMessageAtT(chatrooms,offset)),
    signOut: () => dispatch(signOut()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
