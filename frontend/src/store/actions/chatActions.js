export const sendMessage = (email, message, chatroomId) => {  
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    
    console.log(email,message,chatroomId)
    
    //create timeStamp for this message
    var timeStamp = Date.now();
    // add a new message doc into this chatroom
    firestore
      .collection("chatrooms")
      .doc(chatroomId)
      .collection("messages")
      .add({
        email: email,
        content: message,
        timeStamp: timeStamp
      })
      .then(messageRef => {
        console.log("Message successfully written: ", messageRef.id);
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

export const clearMessage = () => {  
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  };
};

// serve as a background process to listen to DB
// and get realtime updates
export const getMessages = (chatroomId) => {
  console.log(chatroomId)
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var messages = firestore
      .collection("chatrooms")
      .doc(chatroomId)
      .collection("messages");

    messages
      .orderBy("timeStamp")
      .limit(100)
      .onSnapshot(snapshot => {
        var updateMessages = [];
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            console.log(change.doc.data());
            updateMessages.push(
              change.doc.data().email + ": " + change.doc.data().content
            );
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

export const getChatroomId= (vid,uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("algorithms")
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(algoDoc) {
          // doc.data() is never undefined for query doc snapshots
          if(algoDoc.data().selected){
            firestore.collection("algorithms").doc(algoDoc.id)
            .collection("map").where("vid", "==", vid).where("uid", "==", uid)
            .get().then(function(querySnapshot) {
              if(querySnapshot.docs.length == 0){
                console.log("Uid: " + uid + " Vid: " + vid + " Not exist in " +algoDoc.id)
              }else if(querySnapshot.docs.length > 1){
                console.log("Uid: " + uid + " Vid: " + vid + "has multiple entry in " +algoDoc.id)
                querySnapshot.forEach(function(doc) {
                  console.log(doc.id)
                })
              }else{
                console.log("Chatroom found! " + querySnapshot.docs[0].data().cid)
                const chatroomId = querySnapshot.docs[0].data().cid;
                dispatch({
                  type: "LOAD_CHATROOM",
                  chatroomId: chatroomId
                })
              }
              
            })
          }
      });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


  };
};
