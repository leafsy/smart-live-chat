import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import baseConfig from './config/baseConfig';

// store enhancer
const store = createStore(rootReducer,
    compose(
        applyMiddleware(
            thunk.withExtraArgument(
                { getFirebase, getFirestore }
            )
        ),
        reduxFirestore(baseConfig),
        // attachAuthIsReady is to track login status even refreshing
        // userFirestoreForProfile -> sync profile object
        // userProfile -> tell which collection to look at 
        reactReduxFirebase(baseConfig,
            {
                useFirestoreForProfile: true, 
                userProfile: 'users',
                attachAuthIsReady: true
            })
    )
);
// ReactDOM.render(<App />, document.getElementById('root'));
// serviceWorker.unregister();

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
    serviceWorker.unregister();
})