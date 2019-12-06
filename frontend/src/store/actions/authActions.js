export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    // this will take some time to do
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "SIGNIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // need auth in Firebase, also a document for each individual user by UID
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        // console.log(response.user)
        // console.log(response);
        response.user.updateProfile({
          displayName: newUser.userName
        });
        return firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            userName: newUser.userName,
            initial: newUser.userName[0]
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
