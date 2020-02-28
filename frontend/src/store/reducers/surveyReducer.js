const initState = {
  surveyQuestions: null
}

const surveyReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_SURVEY":
      return {
        ...state,
        surveyQuestions: action.surveyQuestions
      }
  default:
    return state;
  }
};

export default surveyReducer;