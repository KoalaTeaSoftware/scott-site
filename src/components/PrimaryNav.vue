Rather than load this component with the need to get a good version of the store, and
talk to it (which seems to be a challenge too big to enjoy), pass it a dynamic property

<template>
  <nav class="navbar navbar-expand-lg">

    <button class="navbar-toggler m-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNavBar"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="myNavBar">
      <div class="navbar-nav m-auto">
        <RouterLink to="/" class="nav-item active">Welcome</RouterLink>
        <RouterLink class="nav-item" to="features">Internet Radio</RouterLink>
        <RouterLink class="nav-item" to="podcasts">Podcasts</RouterLink>
        <RouterLink class="nav-item" to="podcasts">Short Film</RouterLink>
        <RouterLink class="nav-item" to="podcasts">Feature Films</RouterLink>
        <RouterLink class="nav-item" to="about">About</RouterLink>
        <a class="nav-item dropdown-toggle" id="getInvolved"  data-bs-toggle="dropdown" aria-expanded="false">Get Involved</a>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="getInvolved">
          <li><RouterLink class="nav-item" to="podcasts">Volunteer</RouterLink></li>
          <li><RouterLink class="nav-item" to="podcasts">Supporter</RouterLink></li>
          <li><RouterLink class="nav-item" to="podcasts">Friend</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {useUserStore} from "@/stores/userState";

export default {
  name: "PrimaryNav",
  methods: {},
  computed: {
    amLoggedIn: () => {
      return !!useUserStore().iAmLoggedIn;
    }
  }
};
</script>

<style lang="scss">
@import "src/assets/livery";

#myNavBar {
  a {
    color: $colour-banner-primary-text;
    font-weight: bold;
  }

  .router-link-active {
    font-weight: bolder;
    text-decoration: none;
    font-style: italic;
  }

}
</style>
