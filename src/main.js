// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
// ToDo: import it in bits, rather than as 1 big lump
import firebase from "firebase/compat";

// todo: see about the use of the store
//import { useUserStore } from "./stores/userState";

createApp(App).use(router).use(createPinia()).mount("#app");

// placing this here gets rid of most of the errors like this in the non-function code
// FirebaseError: Firebase: No Firebase App '[DEFAULT]' has been created - call Firebase App.initializeApp() (app/no-app).
firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const DB_HANDLE = firebase.firestore()
export { auth, DB_HANDLE };

/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(`[main.js > onAuthStateChanged] User is now [${JSON.stringify(user)}]`)
    useUserStore().setUserData(user)

    firebase.auth().currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        console.log(`custom claims: [${JSON.stringify(idTokenResult.claims)}]`)
        if (!!idTokenResult.claims.editor) {
          useUserStore().makeMeAnEditor(true);
        }
        if (!!idTokenResult.claims.admin) {
          useUserStore().makeMeAnAdmin(true);
        }

      })
      .catch((error) => {
        console.log(error);
      });

    console.log(`[main.js > onAuthStateChanged] so user is editor [${useUserStore().iAmEditor}]`)

    // use this if there were any different pages when the user is logged in
    // this.$router.push('/success')
  } else {
    console.log(`[main.js > onAuthStateChanged] User is now undefined`)
    // this.userData = null
    // this.$router.push('/auth')
  }
});
 */
