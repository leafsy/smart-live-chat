export const sendMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        var ref = firestore.collection('events').doc();
        var unix = Date.now()
        var unixid = unix.toString() + '-' + ref.id.toString()
        // console.log(unixid)
        firestore.collection('chatrooms').doc(message.eId).collection('messages').doc(unixid).set(
            {
                ...message,
                createdAt: new Date()
            }
        ).then(() => {
            dispatch({
                type: "SEND_MESSAGE", message
            })
        }).catch((err) => {
            dispatch({
                type: "SEND_MESSAGE_ERROR", err
            })
        })
    }
}