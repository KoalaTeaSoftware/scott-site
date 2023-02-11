import { defineStore } from "pinia";

/*
As a general rule, if the user is not logged-in, the user data should be set to null (not the empty object)
This is because testing for null (in JavaScript) is easy, whereas testing for {} is messy
 */
export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "Anonymous",
    userData: null,
    editorFlag: false,
    adminFlag: false,
    busy: false
  }),
  actions: {
    async setUserData(fullUserObject) {
      this.userData = fullUserObject.multiFactor.user;
    },
    async makeMeAnEditor(value){
      this.editorFlag = !!value;
    },
    async makeMeAnAdmin(value){
      this.adminFlag = !!value;
    }
  },
  getters: {
    iAmLoggedIn(state) {
      // make it crap out with NO if the userdata is null (as it will be right at the beginning)
      return !!state.userData && !!state.userData.uid;
    },
    iAmEditor(state) {
      return !!state.userData && !!this.editorFlag;
    },
    iAmAdministrator(state) {
      return !!state.userData && !!this.adminFlag;
    },
    whoAmi(state) {
      if (!!state.userData && !!state.userData.uid) {
        return state.userData.email;
      } else {
        return "Anonymous";
      }
    }
  }
});



