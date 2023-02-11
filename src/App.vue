<template>
  <BannerBox/>
  <div id="pageContents">
    <RouterView/>
  </div>
  <SecondaryNav/>
</template>

<script>
import SecondaryNav from "./components/SecondaryNav.vue";
import BannerBox from "./components/BannerBox.vue";

export default {
  components: {BannerBox, SecondaryNav},
  mounted() {
    console.log("mounting the app");
  }
};
</script>


<style lang="scss">
@import "src/assets/livery";

body {
  color: $colour-body-text;
  background-color: $colour-page-background !important;
  background-image: url("@/assets/paper.webp");
  background-repeat: repeat;

  #app {
    font-family: "Times New Roman", Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    text-align: center;

    h1, h2, h3, h4 {
      font-family: branded-font, "Times New Roman", Times, serif;
      text-align: center;
    }

    nav a {
      padding: 0.5em;
    }

    #pageContents {
      // this always ensures that the secondary margin does not obscure the tail of the page
      margin-bottom: 10em;

      a {
        color: $colour-body-text;
      }

      img, iframe, audio, video {
        border-radius: 5px;
        box-shadow: 5px 5px 10px $colour-body-text-shadow;
      }

      /* As the carousel-inner is tightly around its images, you will not be able to see the shadow that the image has.
       * Therefore give the carousel-inner (not the image) the attributes that provide the shadow */
      .carousel-inner {
        border-radius: 5px;
        box-shadow: 5px 5px 10px $colour-body-text-shadow;
        /* This also means that we have to prevent the image in the carousel from having the shadow (otherwise it can look wrong) */
        img {
          margin: 0;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
