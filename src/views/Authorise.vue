<template>
  <h1>Authorise a user</h1>
  <div v-if="mayChangeRoles">
    <h2>Provide the email address of an existing user to set the roles of</h2>
    <p>
      <input id="emailAddress" type="email" placeholder="Email" v-model="email"/>
    </p>
    <p>
      <button id="fetch" @click="fetch" :disabled="!email">Fetch user's current authority</button>
    </p>
    <p v-if="!!feedbackMsg">{{ feedbackMsg }}</p>
    <form v-if="!!user">
      <p>This shows that user's existing role. Select the role that you want them to have.</p>
      <input type="radio" id="admin" name="role" value="admin" :checked="authority.amAdmin"><label
        for="admin"> ADMIN</label>
      <input type="radio" id="editor" name="role" value="editor" :checked="authority.amEditor"><label
        for="editor"> EDITOR</label>
      <br>
      <button id="set" @click="setRole" :disabled="!user">Set this user's role</button>
    </form>
  </div>
  <div v-else>
    <h2>You need to be logged in</h2>
  </div>
  <div class="loadingSpinner" v-show="busy"></div>
</template>

<script>

// placing this here and linking it by using the app got from the firebase
import firebase from "firebase/compat";
import {useUserStore} from "@/stores/userState";

const functions = firebase.functions();
const getUserByEmail = functions.httpsCallable("getUserUsingEmail");
const updateUserRole = functions.httpsCallable("updateUserRole");

export default {
  name: "AuthoriseUser",
  data() {
    return {
      busy: false,
      feedbackMsg: "",
      email: "",
      user: null,
      authority: {
        amAdmin: true,
        amEditor: true
      }
    };
  },
  computed: {
    amLoggedIn: () => {
      return !!useUserStore().iAmLoggedIn;
    },
    mayChangeRoles: () => {
      // the suer may change the roles of other users if they are, themselves an administrator
      return !!useUserStore().iAmAdministrator;
    }
  },
  methods: {
    fetch() {
      this.busy = true;
      this.user = null; // getting new, make sure that the old does not hang around
      console.log(`authorise.fetch for [${this.email}]`);
      this.authority.amEditor = this.authority.amAdmin = false;

      getUserByEmail({email: this.email})
          // {"data":{"user":{"uid":"aW0HHDo1jKOXpplLtW7X0bNOcJF3","email":"a@b.com"...}}}]
          .then(r => {
            this.busy = false;
            console.log(`[Authorise.vue>fetch>getUserByEmail] response from the call [${JSON.stringify(r)}]`);
            this.user = r.data.user;
            if (!!this.user.customClaims) {
              if (!!this.user.customClaims.admin) {
                console.log("Seen the admin claim");
                this.authority.amAdmin = true;
                this.feedbackMsg = "";
              }
              if (!!this.user.customClaims.editor) {
                console.log("Seen the editor claim");
                this.authority.amEditor = true;
                this.feedbackMsg = "";
              }
            } else {
              this.feedbackMsg = "This user has no specific role";
              console.log("User has no custom claims");
            }
          })
          .catch(e => {
            this.busy = false;
            console.log(`[Authorise.vue>fetch>getUserByEmail] Error from the call [${JSON.stringify(e)}]`);
            if (e.code === "functions/not-found") {
              this.feedbackMsg = "Unable to find data for that user";
            } else {
              this.feedbackMsg = "Something went wrong, not sure what";
            }
          });
    },
    setRole() {
      this.busy = true;
      let role = document.querySelector("input[name=\"role\"]:checked").value;
      console.log(`Setting user's role to ${role}`);
      updateUserRole({user: this.user, "role": role})
          .then(result => {
            this.busy = false;
            console.log(`got response from the role setting [${JSON.stringify(result)}]`);
            // refresh the display
            this.fetch();
          })
          .catch(result => {
            this.busy = false;
            console.log(`got ERROR from the role setting [${JSON.stringify(result)}]`);
            // refresh the display
            this.fetch();
          });
    }
  }
};
</script>


<style lang="scss">
#emailAddress {
  width: 85%
}
</style>
