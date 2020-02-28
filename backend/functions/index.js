const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartlivechat2019.firebaseio.com"
});
const db = admin.firestore();


// get survey
app.get('/api/survey', (req, res) => {
    (async () => {
        try {
            const query = db.collection('questions');
            let response = {};
            response.uid = req.query["uid"];
            response.vid = req.query["vid"];
            response.questions = [];
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    const selectedQuestion = {
                        id: doc.id,
                        text: doc.data().text,
                        type: doc.data().type
                    };
                    response.questions.push(selectedQuestion);
                }
                return response;
            });
            // for debug
            for (const key in req.query) {
              console.log(key, req.query[key])
            }
            console.log("success ");
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

// post survey answer
app.post('/api/surveyanswer', (req, res) => {
    (async () => {
        try {
            const promises = [];
            for (const i in req.body.answers) {
              let data = {
                uid: req.body.uid,
                qid: req.body.answers[i].qid,
                answer: req.body.answers[i].answer,
                timestamp: Date.now()
              };
              promises.push(db.collection('surveyanswer').add(data));
            }
            const responses = await Promise.all(promises);
            
            // create an empty chatroom
            let response = {};
            // let addDoc = db.collection('chatrooms').add({
            //   createtime: Date.now()
            // }).then(ref => {
            //   console.log('Added document with ID: ', ref.id);
            //   response.cid = ref.id;
            // });
            // for temporary debug
            response.cid = 'Q3w70iDpBp7VlCl793LH'
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
      })();
  });



exports.app = functions.https.onRequest(app);
