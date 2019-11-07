const initState = {
    chatError: null
}
const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            console.log('sent message: ', action.message);
            return state
        case 'SEND_MESSAGE_ERROR':
            console.log('send message err: ', action.err);
            return state
        default:
            return state
    }
}
export default chatReducer