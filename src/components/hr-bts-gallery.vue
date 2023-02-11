A primitive picture gallery using BTS from the Hardy's regrets filing
<template>
  <div class="gallery container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="img in imgList">
        <img :src="'/assets/wessex/features/hardys-regrets/btsStills/' + img"
             class="img-fluid" alt="gallery">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hr-bts-gallery",
  data() {
    return {
      imgList: [
        "C4870BCE-CC74-4D2F-A8E4-13BE3F26C1A8.jpeg",
        "GRA_3790@460w.jpg",
        "GRA_1884@460w.jpg",
        "GRA_4447@460w.jpg",
        "GRA_8242@460w.jpg",
        "GRA_8433_1@460w.jpg",
        "GRA_8894@460w.jpg",
        "roseAndMikePortland@460w.jpg",
        "GRA_1870@460w.jpg",
      ]
    }
  }
}
</script>