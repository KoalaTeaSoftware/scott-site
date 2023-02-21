All this specific thing is doing is asking Firebase to verify the user's credentials, and sign them in
The business of making a local (userStore) copy of the user's token, etc, is handled by an onAuthStateChanged (main.js?)
<template>
  <div v-if="amLoggedIn">
    <h1>Welcome {{ myName }}</h1>
    <p v-if="iAmAnEditor">I see that you are an editor</p>
  </div>
  <div v-else>
    <h1>Please provide your credentials in order to log in</h1>
    <p id="feedback" v-if="feedbackMsg">{{ feedbackMsg }}</p>
    <p><input id="email" type="text" placeholder="Email" v-model="email" /></p>
    <p><input id="password" type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <button id="doIt" @click="signUserIn(email, password)">Submit</button>
    </p>
  </div>
  <LoadingSpinner :show-me="!!busy"></LoadingSpinner>
</template>

<script>
/* for setting login persistence see https://firebase.google.com/docs/auth/web/auth-state-persistence
 * browserSessionPersistence means that the state will only persist in the current session or tab,
 * and will be cleared when the tab or window in which the user authenticated is closed. Applies only to web apps.
 * inMemoryPersistence  means that the state will only be stored in memory and will be cleared when the window or activity is refreshed
 * This is the preferable option - the other makes Cypress tests fail, and it is unlikely that longer persistence is wanted.
 */
import {inMemoryPersistence, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/main";

import {useUserStore} from "@/stores/userState";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const userStore = useUserStore();

export default {
  name: "SignIn",
  components: {LoadingSpinner},
  data() {
    return {
      busy: false,
      email: null,
      password: null,
      feedbackMsg: ""
    };
  },
  computed: {
    amLoggedIn() {
      // it is necessary to wrap these uses of the users store's methods so that they can be used in the template (above)
      // Idea is wrong is asserting that it can not find these methods, they are accessible and do work
      return useUserStore().iAmLoggedIn;
    },
    myName() {
      return useUserStore().whoAmi;
    },
    iAmAnEditor(){
      return useUserStore().iAmEditor;
    }
  },
  methods: {
    signUserIn(address, password) {
      console.log(`[SignIn.signUserIn] Starting to signing-in user[${address}]`);
      this.busy = true;
      userStore.$reset();
      setPersistence(auth, inMemoryPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, address, password)
            .then(signedInUser => {
              this.busy = false;
              console.log(`[SignIn.signUserIn] back from FBase sign-in [${JSON.stringify(signedInUser)}]`);
              // there is nothing specific to do here, the onAuthStatChange (wherever it is) should do all the work
            })
            .catch((signInError) => {
              this.busy = false;
              // console.log(`[SignIn.signUserIn] error back from FBase sign-in [${JSON.stringify(signInError.message)}]`);
              switch (signInError.message) {
                case "Firebase: Error (auth/wrong-password).":
                case "Firebase: Error (auth/user-not-found).":
                case "Firebase: Error (auth/invalid-email).":
                case "Firebase: Error (auth/missing-email).":
                case "Firebase: Error (auth/internal-error).": // you get this one when the password is omitted
                  this.feedbackMsg = "Try again";
                  break;
                default:
                  this.feedbackMsg = "I don't know what went wrong, sorry";
              }
            });
        })
        .catch((persistenceSetError) => {
          console.log(`[SignIn.signUserIn] back from FBase persistence-setting [${JSON.stringify(persistenceSetError.message)}]`);
          this.feedbackMsg = "I don't know what went wrong, sorry";
        });
      //.finally is NFG - it does not wait until a response is got, but runs immediately
    }
  }
};
</script>
