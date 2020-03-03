// get chat room sessions
export const getSessions = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var sessions = [];
    var chatrooms = firestore.collection("chatrooms");
    chatrooms.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var session = {
            platform: doc.data().platform,
            streamid:doc.data().vid,
            chatroomid: doc.id,
            createtime: doc.data().createtime
          }
          sessions.push(session);
      });

      dispatch({
        type: "CHATROOM_SESSION_LOADED",
        sessions
      });

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  
  };
};

//get algorithms list
export const getAlgorithms = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    var algorithms = [];
    firestore.collection("algorithms")
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var algorithm = {id: doc.id, selected: doc.data().selected}
          algorithms.push(algorithm);
      });

      dispatch({
        type: "ALGORITHMS_LOADED",
        algorithms
      });

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  
  };
};

export const updateSelectedAlgorithm = (selectedAlgorithm) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore.collection("algorithms")
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var match;
          if(selectedAlgorithm === doc.id){
            match = true
          }else{
            match = false
          }

          console.log("try write" +doc.id + ":"+ match)

          firestore
          .collection("algorithms")
          .doc(doc.id)
          .set({
            selected: match
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });

      });

      // dispatch({
      //   type: "ALGORITHMS_LOADED",
      //   algorithms
      // });

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  
  };
};

//get algorithms list
export const sendMessageAtT = (chatrooms,offset) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("bulkloadmessages").where("offset", "==", offset)
    .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var message = {content: doc.data().content, userName:doc.data().userName}
          console.log(message)

          chatrooms.forEach(chatroomid => {
            var timeStamp = Date.now();
            // add a new message doc into this chatroom
            firestore
            .collection("chatrooms")
            .doc(chatroomid)
            .collection("messages")
            .add({
              userName: doc.data().userName,
              content: doc.data().content,
              timeStamp: timeStamp
            })
            .catch(err => {
              console.error("Error writing document: ", err);
             });
            });
    });
   });
  };
}
