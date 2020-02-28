export const getSurveyQuestions = (vid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("questions")
      .get().then(function(querySnapshot) {
        const surveyQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text,
          type: doc.data().type,
        }));
        dispatch({
          type: "LOAD_SURVEY",
          surveyQuestions
        });
      });
  };
};

export const updateChatroomId = (cid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({
      type: "LOAD_CHATROOM",
      chatroomId: cid
    });
  };
};