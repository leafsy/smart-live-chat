export const sendMessage = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var ref = firestore.collection("chatroom").doc();
    var unix = Date.now();
    var unixid = unix.toString() + "-" + ref.id.toString();
    // console.log(unixid)
    firestore
      .collection("chatrooms")
      .doc("Q3w70iDpBp7VlCl793LH")
      .collection("messages")
      .doc(unixid)
      .set({
        ...message,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: "SEND_MESSAGE",
          message
        });
      })
      .catch(err => {
        dispatch({
          type: "SEND_MESSAGE_ERROR",
          err
        });
      });
  };
};

export const getMessages = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var messages = firestore
      .collection("chatrooms")
      .doc("Q3w70iDpBp7VlCl793LH")
      .collection("messages");

    messages
      .orderBy("timeStamp")
      .limit(100)
      .onSnapshot(querySnapshot => {
        var newMessages = [];
        querySnapshot.forEach(doc => {
          console.log(doc.data().content);
          newMessages.push(doc.data().content);
        });
        dispatch({
          type: "GET_MESSAGES",
          newMessages
        });
      });
  };
};
