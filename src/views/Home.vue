This works despite the fact that IntelliJ is confused by the tag in the HTML, and the import of the editable div

ToDo: layout on phones - hide carousels, or make the columns expand on small
<template>
  <div class="container-fluid" id="welcome">
    <div id="title" class="row">
      <div class="col">
        <div class="container welcome-1">
          <h1>Welcome</h1>
          <p>We absolutely adore the novels of Sir Walter Scott written and set in Scotland and elsewhere in previous
            centuries.
          </p>
          <!--EditableDiv identity="welcome-1"></EditableDiv-->

        </div>
      </div>
    </div>
    <div id="main" class="row">
      <div id="left-col" class="col-lg-4">
        <Carousel
            identity="scottish-things"
            path="assets/welc-caro"
            :item-list=this.caroData
        />

      </div>
      <div id="middle-col" class="col-lg-4 mainText">
        <!--        <EditableDiv identity="welcome-2"></EditableDiv>-->
        <p class="welcome-1">We want to bring Scott's stories to life and make them more accessible to modern audiences.</p>
        <p>These wonderful novels and other stories by Scott are no longer taught and read in schools, nor in ninety
          nine percent of universities, either. Our Scottland Dramas Project (started 2023), along with its sister
          project, <a href="https://thedailydilettante.com/" target="_blank">The Wessex Dramas Project</a> (founded
          2022), seeks to disseminate these master story-tellers' works to the general public, before they become mere
          academic curiosities.
        </p>
        <p>We are a grass-roots community project led by a young film maker, Rose Goldthorp.
          We will be working voluntarily with other, mainly Scottish volunteers and charities to make these
          dramatic podcasts, and
          feature films.
        </p>
      </div>
      <div id="blog-role" class="col-lg-4">
        <h2>Concept Short Film</h2>
        <img src="/assets/home/movie-poster.jpg" class="img-fluid" alt="Poster for Wandering Willie's Tale">
        <!--div class="embed-responsive embed-responsive-16by9">
          <p class="help">Not playing nicely on your iPad?<br/>Try picture-in-picture, or maximising the player.</p>
          <video id="hrTrailer" controls preload="auto" class="embed-responsive-item w-100"
                 poster="/assets/wessex/features/hardys-regrets/posterImage.jpg">
            <source src="/assets/wessex/features/hardys-regrets/hardysRegretsTrailer@720p30.mp4"
                    type="video/mp4">
          </video>
        </div>
      <p class="CTA">The DVD can be purchased on <a href="https://gumroadrose.gumroad.com/l/hardysregretsdvd"
                                                      target="_blank">Gumroad</a></p>
        <p class="CTA">The movie can also be downloaded (streamed) from <a
            href="https://gumroadrose.gumroad.com/l/hardysregretsdownload"
            target="_blank">Gumroad</a></p>-->
      </div>
    </div>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv.vue";
import HrBtsGallery from "@/components/hr-bts-gallery.vue";
import Carousel from "@/components/Carousel.vue";

export default {
  name: 'Welcome',
  components: {Carousel, HrBtsGallery, EditableDiv},
  data() {
    return {
      caroData: [
        {img: "sir-walter-scott.jpg", alt: "Sir Walter Scott"},
        {img: "scottish_landscape_one.jpg", alt: "Scottish landscape one"},
        {img: "Eilean_Donan_castle.jpg", alt: "Eilean Donan castle"},
        {img: "Sir-Walter-Scott-books.jpg", alt: "Sir Walter Scott - Books"},
        {img: "ladies-by-kitchen-fire.jpg", alt: "Ladies by the kithcen fire"},
        {img: "reading-book.jpg", alt: "Reading book"},
        {img: "scottish-landscape-two.jpg", alt: "Scottish landscape two"},
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

.welcome-1 {
  font-size: larger;
  font-weight: bolder;
}

#welcome-2 {
  font-size: large;
  margin-top: 3em;
}

#middle-col {
  text-align: center;
}

.help {
  font-size: smaller;
  font-style: italic;
  color: $colour-banner-background;
}

.CTA {
  font-size: x-large;
  font-weight: bold;
}
</style>
