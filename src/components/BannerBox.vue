<template>
  <div id="banner-box">
    <div class="row" id="banner">
      <!-- prevent this col from showing on a phone, constrain its size on small-->
      <div id=logoBox class="col-2 d-none d-sm-block">
        <img src="/assets/logo200.gif" class="img-fluid" alt="The Daily Dilettante logo">
      </div>
      <div class="col">
        <p id="title">The Scottland Dramas Project</p>
        <div class="row">
          <div class="col-1">
            <img src="/assets/medallion.gif" alt="a medallion" class="img-fluid" style="padding-right: 0;">
          </div>
          <div class="col m-auto pl-0" id="log-line">
            Ten Walter Scott audio dramas
          </div>
          <div class="col-1">
            <img src="/assets/medallion.gif" alt="a medallion" class="img-fluid" style="padding-left: 0;">
          </div>
        </div>
        <PrimaryNav/>
      </div>
      <div class="col-2 d-none d-sm-block">
        <!--img src="/assets/logo200.gif" class="img-fluid" alt="The Daily Dilettante logo"-->
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryNav from "./PrimaryNav.vue";

export default {
  name: "BannerBox",
  components: {PrimaryNav}
}
</script>

<style lang="scss">
@import "src/assets/livery";

#banner-box {
  background-color: $colour-banner-background;
  color: $colour-banner-primary-text;
  padding-top: $margin-furniture;
  padding-bottom: $margin-furniture;

  #banner {
    font-family: branded-font, "Times New Roman", Times, serif;
    padding: 4px 0;
    border-color: $colour-page-background;
    border-top: $pin-stripe-width $pin-stripe-style;
    border-bottom: $pin-stripe-width $pin-stripe-style;
    text-align: center;
    display: flex !important;
    align-items: center;

    img {
      padding: 0;
      //margin-left: 1em;
      margin: auto;
    }

    #title {
      /* With zero padding given to the col that contains this, 5em seems to give 1 line on the iPad */
      font-size: 5em;
      font-weight: bold;
      text-align: center;
      margin: 0;
      line-height: 1em;
    }

    #log-line {
      font-size: 2.5em;
      line-height: 1.1em;
      color: $colour-banner-secondary-text;
      text-shadow: 0 0 20px;

      img {
        position: unset;
        width: auto;
        margin: auto;
        //height: 1.25em;
      }

    }

    .navbar-toggler {
      border-color: $colour-page-background;

      .navbar-toggler-icon {
        // IJ is unable to resolve this path, but it works
        //noinspection CssUnknownTarget
        background-image: url("/assets/hamburger.svg");
      }

    }

    nav {
      font-size: 1.5em;
      padding: 0;
      text-align: center;
      line-height: 1em;

      .nav-link, .dropdown-item, {
        color: $colour-page-background !important;
        background-color: $colour-banner-background;
        padding-bottom: 0;
      }

      .nav-link.active, .dropdown-item.active {
        text-decoration: underline;
        font-style: inherit;
      }


      .dropdown-menu {
        background-color: $colour-banner-background;
        border-color: $colour-page-background;
        margin: 0.25rem;
        padding: 0.25rem;
      }

      .dropdown-item {
        font-size: 1.5em; /* matching the rest of the menu */
        padding-top: 0.5rem;
        padding-bottom: 0.5rem !important;
      }

      .dropdown-item:hover {
        color: $colour-banner-background !important;
        background-color: $colour-page-background !important;
      }

      /* I don't know why, but the UL making the list is not, of itself, being full width */
      #nav-collapse > ul {
        width: 100%;
      }

    }
  }
}

</style>
