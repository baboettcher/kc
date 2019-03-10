const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// addAdminRole can be called from frontend firing .onCall
// data = info sent / context = auth information
exports.addSuperRole = functions.https.onCall((data, context) => {
  // get user and set custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      // setting a custom claim to user
      // arg 1 is user returned from fn
      // arg 2 is object containing the claim we want to create
      return admin.auth().setCustomUserClaims(user.uid, {
        authCustomClaim: "super"
      });
    }) // return response to user
    .then(() => {
      return {
        message: `Success ${data.email} has been made a SuperAdmin`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addTeacherRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        authCustomClaim: "teacher"
      });
    })
    .then(() => {
      return {
        message: `Success ${data.email} has been made a Teacher`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        authCustomClaim: "admin"
      });
    })
    .then(() => {
      return {
        message: `Success ${data.email} has been made an Admin`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addStudentRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        authCustomClaim: "student"
      });
    })
    .then(() => {
      return {
        message: `Success ${data.email} has been made a Student`
      };
    })
    .catch(err => {
      return err;
    });
});

// firebase deploy --only functions

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
