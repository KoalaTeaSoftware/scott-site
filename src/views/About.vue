<template>
  <div class="container" id="about">
    <h1>About</h1>
    <h2>Sir Walter Scott Enthusiasts</h2>
    <div class="row align-items-center">
      <p>
        The Scottland Dramas Project is a grassroots community group lead by Rose Goldthorp, a young filmmaker who will
        adapt and produce ten of Scott's novels in ten years.
      </p>
      <div class="col" v-for="imgSrc in aboutImgList1">
        <img class="img-fluid" :src="'/assets/about/people/' + imgSrc.img" :alt="imgSrc.alt">
      </div>
      <p style="margin-top: 1em">
        The Scottland Dramas Project will be working with Scott and 'Scottland' enthusiasts from all over the globe. It
        will be concentrating, however, on a core of Edinburgh and S.E. Borders supporters, because of the cost of
        travel.
      </p>
    </div>
    <h2>Rose Goldthorp</h2>

    <div class="row align-items-center" id="roseBioBlock">
      <div class="col-3">
        <img class="img-fluid" :src="'/assets/about/rose.jpg'" alt="Rose Goldthorp">
      </div>
      <div class="col">
        <p>
          Rose is a young filmmaker, living in Weymouth, Dorset, UK. She works / plays with West Country-linked people
          to promote the marvellous stories which Thomas Hardy set in his storyworld of Wessex.
        </p>
        <p>
          Rose has already started her Wessex Dramas project (2022) which has made one Thomas Hardy feature film and
          three
          seasons of audio dramas
          (<a href="https://thedailydilettante.com/podcasts" target="_blank">https://thedailydilettante.com/podcasts</a>).
          Rose hopes to work with different Scottish charities and their members, as she does in Dorset. So, these films
          will be 95% Scottish, in terms of source material, locations, casts, and crews.
        </p>
        <p>
          Rose co-writes her screenplays with her assistant Ann-Marie Goldthorp, and then Rose directs and shoots these
          films.
          also helping with the production.
        </p>
      </div>
    </div>

    <div class="row align-items-center" id="rose-as">
      <div class="col col-md-6 col-lg-3  align-items-center" v-for="data in roseAsDataList" :key="data.link">
        <h3>{{ data.caption }}</h3>
        <img class="img-fluid"
             v-if="data.img"
             :src="'/assets/about/' + data.img"
             :alt="data.caption">
        <span v-html="data.body"></span>
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
      aboutImgList1: [
        {img:"crew@460w.jpg", alt:"A cast and crew"},
        {img:"roseAndMikePortland@460w.jpg", alt:"Filming on portland"},
      ],
      roseAsDataList: [
        {
          img: "on-release.jpg",
          caption: "Rose as Film Maker",
          body: "<p><a target=\"_blank\" href=\"https://rosegoldthorp.com/released-features\">" +
              "Click here to see more about the feature films that Rose has made" +
              "</a></p>"
        },
        {
          img: "stories.jpg",
          caption: "Rose as Podcaster",
          body: "<p><a target=\"_blank\" href=\"https://the-greenlands.com/stories\">" +
              "Click here to see the podcasts that Rose has made so far for her cycle of feature films, The Greenlands" +
              "</a></p>"
        },
        {
          img: "instagram.jpg",
          caption: "Rose as Artist",
          body: "<p><a target=\"_blank\" href=\"https://www.instagram.com/the_greenlands/\">" +
              "Click here to see Rose's Instagram for The Greenlands" +
              "</a></p>"
        },
        {
          img: "",
          caption: "Rose as Writer",
          body: "<p>As a sole feature-film screenplay writer, Rose wrote five screenplays in her teen years. " +
              "As a feature-film co-screenwriter, Rose has also written another twelve feature screenplays" +
              " (between 19 to 23 years old). As a child, Rose wrote eighteen short films, of which three were written for school." +
              "</p>" +
              "<p>As a sole feature-film screenplay writer, Rose wrote five screenplays in her teen years. " +
              "As a feature-film co-screenwriter, Rose has also written another twelve feature screenplays " +
              "(between 19 to 23 years old). As a child, Rose wrote eighteen short films, of which three were written for school." +
              "</p>" +
              "<div style = 'padding:80% 0 0 0;position:relative;' >" +
              "<iframe " +
              " src='https://player.vimeo.com/video/198428528'" +
              "  style='position:absolute;top:0;left:0;width:100%;height:100%;' " +
              " frameBorder = '0'" +
              " allow='autoplay; fullscreen; picture-in-picture' " +
              "  allowFullScreen= '' > < /iframe>" +
              " </div> " +
              " <p><a href='https://vimeo.com/198428528'>Juvenilia - Dirty Habits</a> from " +
              "<a href='https://vimeo.com/rosegoldthorp'>Rose Goldthorp</a> on <a href='https://vimeo.com'>Vimeo</a>.</p>"
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
