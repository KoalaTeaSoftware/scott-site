<template>
  <div class="container" id="policies">
    <h1>Policies</h1>
    <EditableDiv identity="policies"></EditableDiv>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv.vue";
export default {
  name: "Policies",
  components: {EditableDiv}
}
</script>

<style>
#policies {
  text-align: left;
}

</style>
