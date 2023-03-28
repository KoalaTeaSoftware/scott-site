"use strict";

// !! Essential step. This prevents the 'Unhandled error FirebaseAppError: The default Firebase app does not exist' errors
const admin = require("firebase-admin");
admin.initializeApp();
// ends essential step

const sendMail = require('./manageMail');
exports.sendMail = sendMail.sendMail;

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
