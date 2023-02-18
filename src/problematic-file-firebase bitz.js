
// toDo: remove this file and see if it all still works - probably will because src/main.js does this _and_ is used
import firebase from "firebase/compat";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfw2QNgEx_YMiOIHMdnJfy-4sfMws5DVw",
  authDomain: "daily-d-7b01b.firebaseapp.com",
  projectId: "daily-d-7b01b",
  storageBucket: "daily-d-7b01b.appspot.com",
  messagingSenderId: "649918550290",
  appId: "1:649918550290:web:3bb7f959410af237ade3cb",
  measurementId: "G-1NRCL10YGR"
};

firebase.initializeApp(firebaseConfig);

getAuth().onAuthStateChanged(function(user) {
  App.data().loggedIn = false;
  // the user has changed, so take away any privileges that they have already, only turning-on those that we specifically find
  App.data().loggedIn = false;
  App.data().editor = false;
  console.debug(`[onAuthStateChanged] state has changed so store is reset [${JSON.stringify(App.data())}]`);

  if (user) {
    App.data().loggedIn = true;

    firebase.getMyAuthority(user)
      .then(userData => {
        console.debug(`[onAuthStateChanged] Current user's claims are [${JSON.stringify(userData.claims)}]`);
        App.data().editor = !!userData.claims["editor"];
        if (App.data().editor) {
          console.debug(`[onAuthStateChanged] The current user is an editor`);
        } else {
          console.debug(`[onAuthStateChanged] The current user is NOT an editor`);
        }
      })
      .catch(err => {
        console.debug(`[onAuthStateChanged] Crashed getting the user's custom claims [${err}]`);
      });
  } else {
    console.info(`[onAuthStateChanged] - you are not logged-in`);
  }
  console.log(`onAuthStateChanged in main.js, existing`);
});


import HelloWorld from "@/components/HelloWorld.vue";
import PrimaryNav from "@/components/PrimaryNav.vue";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  // components: {UserIdentity, SecondaryNav, Header},
  components: { HelloWorld, PrimaryNav },
  data() {
    return {
      loggedIn: false,
      editor: false
    };
  },
  mounted() {
    console.log(`In App.vue - mounted`);
    // you will probably see it run twice, once saying the user is anonymous, then who the user realy is

// Import the functions you need from the SDKs you need


  }
};


/**
 * When and onAuthRequest listener is created, it returns immediately with info about the current user
 * It would then sit listening, nut this bit of code has done its jog and nothing more to do, so remove this listener
 * Note that this is added to firebase so that it will be available to anyone that has imported firebase
 *
 * return: a Promise (but it will return immediately)
 */
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user); // give the caller the user
    }, reject);
  });
};

/**
 *  Notice that this is failsafe. If the user's authority can not be determined, then the user is deemed to not have any authority
 *
 *  it is not much more than a wrapper that simplifies the business of talking to the back-end
 *  maybe, at a later date, it could make use of a purpose-build permissions object
 *
 *  input: user: a User object (got from firebase (either getCurrentUser, or something else))
 *  return: a Promise that will give the authorities of the user (as their set of claims)
 */
firebase.getMyAuthority = function(user) {
  if (user) {
    return new Promise((onSuccess, reject) => {
      user.getIdTokenResult(true)
        .then(idTokenResult => {
          onSuccess(idTokenResult);
        })
        .catch((error) => {
          console.error(`[firebase.getMyAuthority] Error: [${error.message}]`);
          reject(error);
        });
    });
  } else {
    console.debug(`[firebase.getMyAuthority] User is not signed in`);
    return Promise.resolve("");
  }
};

/**
 * This wraps the firebase function, because it seems to be a bugger to get to this firebase function where we actually want to
 * use it. In here, the necessary bits are available, and it can operate.
 * The onAuthStateChanged (above) takes care of authority
 *
 * @param email - a simple string
 * @param password - a simple string
 */
firebase.registerNewUser = (email, password) => {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(userData => {
      console.log(`[firebase.registerNewUser] Registered [${userData.user.email}]`);
    })
    .catch(error => {
      console.error(`[firebase.registerNewUser] Error: [${error.message}]`);
    });

};
