"use strict";

const logger = require("firebase-functions/lib/logger");
// !! Essential step. This prevents the 'Unhandled error FirebaseAppError: The default Firebase app does not exist' errors
const admin = require("firebase-admin");
admin.initializeApp();
// ends essential step

const functions = require("firebase-functions");
// I do not know why you need 2 requires to get stuff from firebase-admin, but you do
const { auth } = require("firebase-admin");

// ToDo: put the user handlers into their own separate files
//
// See https://firebase.google.com/docs/reference/js/functions.md#functionserrorcode for error codes
// and https://firebase.google.com/docs/functions/callable#handle_errors
// there are two ways of returning information
// 1) simply return the promise that is the result of the getUserByEmail call
//    problem is that not-found result in {"code":"functions/internal","name":"FirebaseError"}
//    so, in order to make this one a bit more friendly:
// 2) put in the await - even though sonarlint says that it is redundant, it is essential

exports.getUserUsingEmail = functions.https.onCall(async (data, _context) => {
  logger.debug(`[getUserFromEmail] Call made with data [${JSON.stringify(data)}]`);
  // options 1): return auth().getUserByEmail(data.email)
  return await auth().getUserByEmail(data.email)
    .then(user => {
      logger.debug(`[getUserFromEmail] Received a response from firebase-getUserByEmail [${JSON.stringify(user)}]`);
      // this answer has to be something that can be made into JSON
      return { user: user };
    })
    .catch(err => {
      // if there is no matching user, you get an error {\"code\":\"auth/user-not-found\",\"message\":\"There is no user record corresponding to the provided identifier.\"}
      if (err.code === "auth/user-not-found") {
        logger.error(`[getUserFromEmail] Failed to find ${data.email}: ${JSON.stringify(err)}`);
        throw new functions.https.HttpsError("not-found", `Unable to find user with email address [${data.email}]`);
      } else {
        logger.error(`[getUserFromEmail] Crashed finding for ${data.email}: ${JSON.stringify(err)}`);
        throw new functions.https.HttpsError("internal", `Crashed`);
      }
    });
});


/**
 * Note: the role's name has to be a reasonable number of chars long (just to try to make things more usable)
 * data: {
 *   user : one of the handles given by the other bits of the Firebase authorisation stuff
 *   role : string identifying their role
 * }
 * if the role name is mentioned, then it will be added to that user's set of custom claims with the value true
 * Note: the user can have 1 role at a time
 * https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk
 */
exports.updateUserRole = functions.https.onCall((data, context) => {
  logger.info(`[updateUserRole]input is: [${JSON.stringify(data)}]`);

  // if ((context.auth.token.admin === true) || (context.auth.token.editor === true)) {
  const user = data.user;

  let roleObject = null;
  switch (data.role) {
    case "admin":
      roleObject = { admin: true };
      break;
    case "editor":
      roleObject = { editor: true };
      break;
    default:
      throw new functions.https.HttpsError("internal", `Unknown role [${data.role}]`);
  }

  logger.info(`[updateUserRole] Setting role for [${user.email}] to be [${JSON.stringify(roleObject)}]`);

  return admin.auth().setCustomUserClaims(data.user.uid, roleObject)
    .then(() => {
      logger.info(`[updateUserRole] Nice response received `);
      return {
        code: 200,
        message: `User ${user.email}'s authority should now be set]. `
      };
    })
    .catch(err => {
      logger.error(`[updateUserRole] Error setting claims for ${data.email}: ${JSON.stringify(err)}`);
      throw new functions.https.HttpsError("internal", err.message);
    });
  // } else {
  //   // client-side should be preventing this, really, so I'm calling this a warning
  //   logger.warn("[updateUserRole] You need to be an admin");
  //   return { code: 403, message: `Permission for action denied` };
  // }
});

const sendMail = require('./manageMail');
exports.sendMail = sendMail.sendMail;

const readTumblr = require('./readTumblr');
exports.readTumblr = readTumblr.readTumblr;