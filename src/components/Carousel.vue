<template>
  <div :id="identity" class="carousel slide carousel-fade" data-bs-ride="carousel" :data-bs-interval="interval"
       data-bs-pause="false">
    <div class="carousel-inner">
      <div v-for="(item, index) in itemList"
           :class="`carousel-item ${index ===0?'active':''}`"
      >
        <img class="d-block w-100"
             :src="`${path}/${item.img}`"
             :alt="`${item.alt}`"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    identity: String,
    path: String,
    itemList: Object,
    interval: {type: String, default: '3000'}
  }
}
</script>

<style scoped>

</style>