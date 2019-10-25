import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer} from 'react-redux-firebase'; // imported on user auth

// firestoreReducer is to sync collections
// firebaseReducer is to sync user auth 
const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer