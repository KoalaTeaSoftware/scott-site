Inputs
identity: needs to be unique on your page
path: where it will find the assets to display (not intelligence here, just give it a string)
itemList: a list of objects, each with the attributes{
filename (full, inc the extension)
alt text
interval (optional) related to the speed of the carousel

Note that the code that build the list of carousel items add a class active to the very first item in the list
<template>
  <div :id="identity" :data-bs-interval="interval"
       class="carousel slide carousel-fade kts-caro" data-bs-ride="carousel" data-bs-pause="false">
    <div class="carousel-inner">
      <div v-for="(item, index) in itemList"
           :class="`carousel-item ${index === 0 ? 'active':''}`"
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

<style lang="scss">
.kts-caro {

}
</style>
