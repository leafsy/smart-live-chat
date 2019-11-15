const initState = {
  chatError: null,
  messages: []
};
const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEND_MESSAGE":
      //   var newMessages = state.messages.concat(action.message);
      console.log("sent message: ", action.message);
      //   return {
      //     ...state,
      //     chatError: null,
      //     messages: action.message
      //   };
      return state;
    case "SEND_MESSAGE_ERROR":
      console.log("send message err: ", action.err);
      return {
        ...state,
        chatError: action.err,
        messages: []
      };
    case "DETECT_MESSAGES_UPDATE":
      var newMessages = state.messages.concat(action.updateMessages);
      console.log("update messages: ", action.updateMessages);
      return {
        ...state,
        chatError: null,
        messages: newMessages
      };
    default:
      return state;
  }
};
export default chatReducer;
