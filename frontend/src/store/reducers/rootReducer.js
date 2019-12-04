import authReducer from './authReducer';
import chatReducer from './chatReducer';
import adminReducer from './adminReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer} from 'react-redux-firebase'; // imported on user auth

// firestoreReducer is to sync collections
// firebaseReducer is to sync user auth 
const rootReducer = combineReducers({
    auth: authReducer,
    rootChat: chatReducer,
    adminReducer: adminReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer