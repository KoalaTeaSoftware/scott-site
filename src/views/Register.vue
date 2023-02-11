<template>
  <h1>Create an Account</h1>
  <div v-if="amLoggedIn">
    <h2>Please provide the new user's credentials</h2>
    <p id="feedback" v-if="feedbackMsg">{{ feedbackMsg }}</p>
    <p><input id="username" type="text" placeholder="Email" v-model="email"/></p>
    <p><input id="password" type="password" placeholder="Password" v-model="password"/></p>
    <p>
      <button id="register" @click="registerNewUser">Submit</button>
    </p>
    <LoadingSpinner :show-me="!!busy"></LoadingSpinner>
  </div>
  <div v-else>
    <h2>You need to be logged in</h2>
  </div>
</template>

<script>
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useUserStore} from "@/stores/userState";
import {auth} from "@/main";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "CreateUser",
  components: {LoadingSpinner},
  data() {
    return {
      busy: false,
      feedbackMsg: "",
      email: "",
      password: ""
    };
  },
  computed: {
    amLoggedIn: () => {
      return !!useUserStore().iAmLoggedIn;
    }
  },
  methods: {
    registerNewUser() {
      this.busy = true;
      console.log(`Registering [${this.email}]`);
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(userData => {
            console.log(`[firebase.registerNewUser] Registered [${userData.user.email}]`);
            this.feedbackMsg = userData.user.email + " was registered";
          })
          .catch(error => {
            console.error(`[firebase.registerNewUser] Error: [${error.message}]`);
            this.feedbackMsg = error;
          })
          .finally(() => {
            this.busy = false;
          });
    }
  }
};
</script>


<style scoped>
input {
  width: 85%
}
</style>
