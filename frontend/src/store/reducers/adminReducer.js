const initState = {
  sessions: [],
  algorithms:[]
};
const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHATROOM_SESSION_LOADED":
      return {
        ...state, 
        sessions: action.sessions
      };
    case "ALGORITHMS_LOADED":
      return {
        ...state, 
        algorithms: action.algorithms
      };

    default:
      return state;
  }
};
export default chatReducer;
