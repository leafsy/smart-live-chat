import React, { Component } from "react";
import "../style.css";
import moment from "moment";

class MessageList extends Component {
  state = {
    messages: [],
    chatroom_id: ""
  };
  render() {
    const { messages_arr, auth } = this.props;
    console.log(messages_arr);
    return (
      <div>
        {messages_arr.map(message => (
          <p>{message}</p>
        ))}
      </div>
    );

    //   <div className="card-content grey lighten-5 message-list">
    //     {messages_arr[0] !== null &&
    //       messages_arr[0] !== undefined &&
    //       messages_arr !== null &&
    //       messages_arr.map((message, index) => (
    //         <div key={index}>
    //           <div className="chat-body">

    //             <div className="chat-body-avatar-div" >
    //                                 <span className="btn btn-floating red accent-2 white-text chat-avatar">
    //                                     {message.userName[0]}
    //                                 </span>
    //                             </div>
    //                             <div className="chat-body-text-div" >
    //                                 <span className="grey-text chat-timestamp">
    //                                     {moment(message.createdAt.toDate()).calendar()}
    //                                 </span>
    //                                 <span>{message.userName}: {message.body}</span>
    //                             </div>
    //             {/* <span className="material-icons account-circle">account_circle</span> */}
    //           </div>
    //         </div>
    //       ))}
    //   </div>
  }
}

export default MessageList;
