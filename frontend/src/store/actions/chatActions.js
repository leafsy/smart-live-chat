export const sendMessage = message => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var chatroom = firestore
      .collection("chatrooms")
      .doc("Q3w70iDpBp7VlCl793LH");
    // create unique message id by the chatroom id and time
    var timeStamp = Date.now();
    var uniqueID = chatroom.id.toString() + "-" + timeStamp.toString();
    // add a new message doc into this chatroom
    var messageRef = firestore
      .collection("chatrooms")
      .doc("Q3w70iDpBp7VlCl793LH")
      .collection("messages")
      .doc(uniqueID);

    messageRef
      .set({
        content: message,
        timeStamp: timeStamp
      })
      .then(() => {
        console.log("message successfully written!");
        dispatch({
          type: "SEND_MESSAGE",
          message
        });
      })
      .catch(err => {
        console.error("Error writing document: ", err);
        dispatch({
          type: "SEND_MESSAGE_ERROR",
          err
        });
      });
  };
};

// serve as a background process to listen to DB
// and get realtime updates
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
      .onSnapshot(snapshot => {
        var updateMessages = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            console.log(change.doc.data());
            updateMessages.push(change.doc.data().content);
          }
        });
        console.log(updateMessages);
        dispatch({
          type: "DETECT_MESSAGES_UPDATE",
          updateMessages
        });
      });
  };
};

// snapshot.docChanges().forEach(function(change) {
//   if (change.type === "added") {
//     console.log("New city: ", change.doc.data());
//   }
//   if (change.type === "modified") {
//     console.log("Modified city: ", change.doc.data());
//   }
//   if (change.type === "removed") {
//     console.log("Removed city: ", change.doc.data());
//   }
// });
