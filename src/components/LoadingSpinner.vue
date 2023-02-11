<template>
  <div class="loadingSpinner" v-show="showMe"></div>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {showMe: Boolean}
}
</script>

<style lang="scss">
@import "src/assets/livery";

.loadingSpinner {
  margin: .5em auto auto;
  border: 5px solid $colour-banner-secondary-text; /* Light grey */
  border-top: 5px solid $colour-banner-background; /* Blue */
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>