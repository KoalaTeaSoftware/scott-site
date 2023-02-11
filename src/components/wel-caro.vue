This is a carousel of images that have been used on the welcome page to fill in space when there
was not enough other stuff and e wanted some sort of imagery on it.

It is retained here because it is thought that it may be of use at some furture time.
<template>
  <Carousel identity="welc-caro" path="/assets/welc-caro" :item-list="caroImgList" interval="4000"/>
</template>

<script>
import Carousel from "@/components/Carousel.vue";

export default {
  name: "wel-caro",
  components: {Carousel},
  data() {
    return {
      caroImgList: [
        {img: "silverville-principle-women.jpg", alt: "Silvervile: Principle characters"},
        {img: "thackeray-books.jpg", alt: "Books by Thackeray"},
        {img: "Maria_Edgeworth_by_John_Downman_1807.jpg", alt: "Maria Edgeworth"},
        {img: "trollope-books.jpg", alt: "Books by Anthony Trollope"},
        {img: "trollope-portrait.jpg", alt: "Anthony Trollope"}
      ]
    }
  }
}
</script>

<style scoped>

</style>