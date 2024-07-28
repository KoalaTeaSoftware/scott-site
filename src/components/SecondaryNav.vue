<template>
  <div id="footerBox" class="fixed-bottom">
    <div id="footer">
      <!-- the expand bit is vital to cause it to be inline -->
      <nav class="navbar  navbar-expand-sm">
        <span id="notice" class="navbar-brand ">All screenplays &copy; of the author(s). All right Reserved</span>
        <div class="navbar-nav">

          <!-- anchor tags are fatal to the session, so use router links -->
          <RouterLink to="/policies" class="nav-item active">Policies</RouterLink>
          <RouterLink to="/contact" class="nav-item">Contact</RouterLink>

          <a v-if="amLoggedIn" id="logoutLink" class="nav-item" @click="logOut">Log Out</a>
          <RouterLink v-else to="/sign-in" class="nav-item">Sign In</RouterLink>

          <RouterLink v-if="amLoggedIn" to="/register" class="nav-item">Register</RouterLink>
          <RouterLink v-if="amLoggedIn" to="/authorise" class="nav-item">Roles</RouterLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/userState";
import {getAuth} from "firebase/auth";

export default {
  name: "SecondaryNav",
  methods: {
    logOut: function () {
      // this can be declared here as it is only from this component that the user can sign-out
      // don't declare this until now, as it may not have been set up
      console.log('[secdry nav] Logging out')
      const userStore = useUserStore();
      userStore.$reset();
      getAuth().signOut();
      // irrespective of whether they have really signed-out, make it seem that they have
      // Code inspector can't resolve this, but it works fine
      // noinspection JSUnresolvedFunction
      this.$router.push({path: "/"});
    }
  },
  computed: {
    amLoggedIn: () => {
      return !!useUserStore().iAmLoggedIn;
    },
    amAdmin: () => {
      return !!useUserStore().iAmAdministrator;
    }

  }

}
</script>

<style lang="scss">
@import "src/assets/livery";

#footerBox {
  font-family: branded-font, "Times New Roman", Times, serif;
  background-color: $colour-banner-background;

  #footer {
    border-top: $pin-stripe-width $pin-stripe-style $colour-page-background;
    margin-top: $margin-furniture;
  }

  .navbar-nav {
    margin-left: auto;
    margin-right: 0.5em;
    padding-right: 1em;

    .nav-item {
      color: $colour-banner-primary-text;
    }

    #logoutLink:hover {
      cursor: pointer;
    }
  }
  #notice{
    color: $colour-banner-primary-text;
    margin-left: 1em;
    font-size: small;
    //float: left;
  }
}

</style>
