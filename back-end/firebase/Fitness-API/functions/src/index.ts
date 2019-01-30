import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
// import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
// import { Router, Request } from 'express';
import { Router } from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';

// Prevent firebase from initializing twice
try {
   admin.initializeApp(functions.config().firebase)
 } catch (e) {}
 
 var db = admin.firestore(); // firestore db
 
 // Prevent the app breaking from the upcoming behavioral changes of Date Objects
 const settings = {
   timestampsInSnapshots: true
 };

 db.settings(settings);

 //
const router = Router(); //express();
const app = express();
// const userCollection = 'user';

app.use(cors({ origin: true }));
app.use('/v1', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main(app) as 
// a parameter
export const webApi = functions.https.onRequest(app);

// View all users
router.get('/users', async (req, res, next) => {
   try {
       const usersSnapshot = await db.collection('users').get();

       let users: any[] = [];
       usersSnapshot.forEach((doc) => {
         //   users.push({
         //       id: doc.id,
         //       data: doc.data()
         //   });
         users.push(doc.data());
       });

       res.status(200).json(users);
   } catch(e) {
       next(e);
   }
   // res.status(200).send("Get users data successfully!");
});

// get user by userid
router.get('/user/:userid', async(req, res, next) => {
   try {
       const userid = req.params.userid;
       if (!userid) throw new Error('userid is blank');

       db.collection('users').where('userid', '==', userid.toString()).get()
      .then( querySnapshot => {
         let users: any[] = [];
         querySnapshot.forEach( doc =>  users.push(doc.data()) );
        res.status(200).json(users);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

   } catch(e) {
       next(e);
   }
})

// get user by userid
router.get('/userName/:name', async(req, res, next) => {
   try {
      const name = req.params.name;
      if (!name) throw new Error('name is blank');
      //
      db.collection('users').where('name', '==', name).get()
      .then( querySnapshot => {
         let users: any[] = [];
         querySnapshot.forEach( doc =>  users.push(doc.data()) );
        res.status(200).json(users);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

   } catch(e) {
       next(e);
   }
})

// add user and role type
router.post('/user',(req,res, next) => {
   try {
      let messgae = "";
      const userid = req.body.user.userid;
      if (!userid) throw new Error('userid is blank');

      // Add a new document in collection "users"
      db.collection("users").add({
         userid: req.body.user.userid,
         email: req.body.user.email,
         password: req.body.user.password,
         name: req.body.user.name, 
         mobile_phone : req.body.user.mobile_phone
      })
      .then(function() {
         // res.status(200).send("Document successfully written!");
         messgae = messgae+"User: Document successfully written!";
      })
      .catch(function(error) {
         // console.error("Error writing document: ", error);
         // res.status(200).send("Error writing document: "+error);
         messgae = messgae+"User: Error writing document: "+error;
      });

      // Add a new document in collection "users"
      db.collection("roles").add({
         userid: req.body.user.userid,
         roleid: req.body.role.roleid,
         role_name: req.body.role.role_name
      })
      .then(function() {
         // res.status(200).send("Document successfully written!");
         messgae = messgae+"| Role: Document successfully written!";
      })
      .catch(function(error) {
         // console.error("Error writing document: ", error);
         // res.status(200).send("Error writing document: "+error);
         messgae = messgae+"| Role: Error writing document: "+error;
      });

      res.status(200).send(req.body);

   } catch(e) {
      next(e);
   }  
   
})

exports.bigben = functions.https.onRequest((req, res) => {
   const hours = (new Date().getHours() % 12) + 1 // London is UTC + 1hr;
   res.status(200).send(`<!doctype html>
     <head>
       <title>Time</title>
     </head>
     <body>
       ${'BONG '.repeat(hours)}
     </body>
   </html>`);
 });