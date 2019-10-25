import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBlkoAE7kmwZPucINbxZhNn8Gg8lWjzBdM",
    authDomain: "smartlivechat2019.firebaseapp.com",
    databaseURL: "https://smartlivechat2019.firebaseio.com",
    projectId: "smartlivechat2019",
    storageBucket: "smartlivechat2019.appspot.com",
    messagingSenderId: "941590986393",
    appId: "1:941590986393:web:a55f4027cdfee0bac1c208",
    measurementId: "G-PXZCPP1NDY"
};

firebase.initializeApp(config)
firebase.firestore().settings({
    timestampsInSnapshots: true
})

export default firebase;