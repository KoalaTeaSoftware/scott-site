<template>
  <div class="container" id="about">
    <div class="row align-items-center">
      <EditableDiv identity="about-1"></EditableDiv>
    </div>

    <div class="row align-items-center">
     <div class="col" v-for="imgSrc in aboutImgList1">
       <img class="img-fluid" :src="'/assets/about/people/' + imgSrc">
     </div>
    </div>

    <div class="row align-items-center mt-3">
      <EditableDiv identity="about-2"></EditableDiv>
    </div>

    <div class="row align-items-center" id="roseBioBlock">
      <div class="col-3">
        <img class="img-fluid" :src="'/assets/about/rose.jpg'" alt="Rose Goldthorp">
      </div>
      <div class="col">
        <EditableDiv identity="rose-bio"></EditableDiv>
      </div>
    </div>

    <div class="row align-items-center" id="rose-as">
      <div class="col col-md-6 col-lg-3  align-items-center" v-for="data in roseAsDataList" :key="data.link">
        <h2>{{ data.caption }}</h2>
        <img class="img-fluid"
             v-if="data.img"
             :src="'/assets/about/' + data.img"
             :alt="data.caption">
        <!-- these attributes provide identities for the editable divs -->
        <EditableDiv v-if="data.body" :identity="data.body" class="rose-as-text"></EditableDiv>
      </div>
    </div>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv.vue";

export default {
  name: "About",
  components: {EditableDiv},
  data() {
    return {
      aboutImgList1:[
        "A3E9CAD0-77C2-4EE5-A506-07C090960F54@136w.jpg",
        "BC15F779-B573-4AAD-8A06-AA3BFC0503C4@136w.jpg",
        "GRA_2989@136w.jpg",
        "GRA_3166@136w.jpg",
        "GRA_3226@136w.jpg",
        "GRA_3607@136w.jpg",
      ],
      roseAsDataList: [
        {
          img: "on-release.jpg",
          caption: "Rose as Film Maker",
          body: "rose-as-film-maker"
        },
        {
          img: "stories.jpg",
          caption: "Rose as Podcaster",
          body: "rose-as-podcaster"
        },
        {
          img: "instagram.jpg",
          caption: "Rose as Artist",
          body: "rose-as-artist"
        },
        {
          img: "",
          caption: "Rose as Writer",
          body: "rose-as-writer"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#about {
  // otherwise the hero image is tightly under the banner
  padding-top: 0.5em;

  #roseBioBlock {
    img {
      margin-bottom: 0.5em;
    }
  }

  .rose-as-text {
    p {
      text-align: center;
      // this is required because the nice shadow around the iframe makes the caption below it look cramped
      // sadly, I can't target that caption any better than this, but collateral damage seems negligible
      margin-top: 0.5em;
    }
  }
}

</style>
