1. The overall structure of the contents is provide by the data() part of the vue
2. The actual episodes are pulled from the podcast host
The two may not easily correspond, so the read of the rss feed has to be careful when associating episodes to books

<template>
  <div class="container" id="wessex-podcasts">
    <h1>Podcast</h1>
    <h2>A) Medley Shows:</h2>
    <h3>i) Scott's Poetry: <span class="normalText">Our project welcomes your recordings on any of Scott's, or other British 'Romantic' poets' poetry.
    These poems must be of six verses, or less, and in the English language (Excerpts accepted if entitled).
      Added foley welcomed ... birdsong and streams! These readings are for our internet radio and also possibly our podcast.
    Rose and her unfunded community group can offer no performance fees, however.</span>
      <p>To upload your recordings ...</p>
    </h3>
    <h3>ii) Traditional Scottish / Celtic Music</h3>
    <h3>iii) Scott Reviews / Essays</h3>
    <h3>iv) Interviews</h3>
    <h2>B) Dramatic Podcast Releases in 2023</h2>
    <div class="card series" v-for="book in books">
      <div class="card-body">

        <div class="bookDetails">
          <div class="row">
            <div class="col-2">
              <img class="img-fluid"
                   :src="`/assets/wessex/podcasts/${book.poster}`"
                   alt="Poster for the podcast"
              >
            </div>
            <div class="col">
              <h3 class="mt-0">{{ book.title }}<span class="dueDate">({{ book.dueDate }})</span></h3>
              <p v-for="para in book.synopsis" class="card-text book_synopsis">{{ para }}</p>
            </div>
          </div>
        </div>

        <div class="bookPodcasts">
          <div class="seasonPodcastList card-group">
            <div v-for="episode in book.episodeList" class="card podcastEpisode">
              <div v-if="episode" class="m-auto">
                <span v-if="episode.episodeNumber >= 0" class="episodeNumber">{{ episode.episodeNumber }}</span>
                <audio controls preload="metadata" v-bind:src="episode.linkSrc">
                  <source v-bind:src="episode.linkSrc" :type="episode.linkType">
                  It appears that your browser can not play this,
                  please try going to <a href="https://sites.libsyn.com/431487/site">https://sites.libsyn.com/431487/site</a>
                  for the archive on out podcast server.
                </audio>
              </div>
            </div>
          </div>
        </div>

        <div class="row align-items-center">
          <a :href="book.screenplayLink"
             target="_blank"
             class="list-item-additional-data ext-link"
             title="See the screenplay in a new tab"
          >Click here to read the feature's screenplay</a>
        </div>

      </div>
    </div><!-- ends card body -->

  </div>
</template>

<script>

export default {
  name: "WessexPodcasts",
  data() {
    return {
      books: [
        {
          title: "A Laodicean",
          poster: "a-laodicean/poster.jpg",
          dueDate: "Starts end Nov.",
          synopsis: ["George Somerset, a new Architecture graduate, asks to sketch the interior of a castle. He ends up falling in love with its millionaire owner, Paula Power: a very 'Modern Miss' with decided opinions of her own.",
            "Unfortunately there are malignant influences amongst the former aristocratic castle-owners, and the course of love does not run so smooth."
          ],
          seasonNumber: 3,
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/zbg3snqs8vyn49p/2021-12-28%20A%20Laodicean%20-%20podcasted.pdf?dl=0"
        },
        {
          title: "The Hand of Ethelberta",
          poster: "the-hand-of-ethelberta/thumbnail.png",
          dueDate: "Starts end May",
          synopsis: ["Ethelberta, is an ex-governess from a large servant family. She is already (at 21 years old) widowed, after having married Lady Petherwin's son. When her mother-in-law dies, she attempts to earn her living, dramatising her own poetry. In London, she moves her many siblings, and mother, into her house, passing them off as her own servants in an attempt to disguise her straitened means.",
            "Unfortunately, her young sister, Picotee, falls In love with one of Ethelbert's suitors. Complications ensue."
          ],
          seasonNumber: 2,
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/sx6e2dcc6y7bv3p/The%20Hand%20Of%20Ethelberta.pdf?dl=0"
        },
        {
          title: "Desperate Remedies",
          poster: "desperate-remedies/desperate-remedies-poster.jpg",
          dueDate: "Starts end Jan",
          synopsis: ["Cytherea, an orphaned teenage girl, is forced to become a paid companion to a wealthy woman, Miss Aldclyffe. Cytherea’s fiancé is tricked away from her, and she is pressured into marrying Miss Aldclyffe’s own illegitimate, already-married son.",
            "Cytherea desperately tries to discover if she, herself, truly is married, or not, and how many “wives” are actually involved ….. all before this heir gets his hands on her"
          ],
          seasonNumber: 1,
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/8678tahc96nqulf/Desperate%20remedies%20-%20podcasted%20-%20screenplay.pdf?dl=0"
        },

      ]
    }
  },
  mounted() {
    fetch('https://feeds.libsyn.com/431487/rss')
        // getting the feed contents takes time. Got it, so extract the text. This, too, takes time
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
              // intellij does not understand that this selector is working on the data from the feed, so it complains. It is OK, however
              const itemList = data.querySelectorAll('item')
              itemList.forEach(item => {
                try {
                  const seasonNumber = item.getElementsByTagName('itunes\:season')[0].textContent * 1
                  /*
                  The books are listed (in the template above) in the order which we want to see them on the page.
                  This may not be the order in which they appear in the feed
                  We can rely on all of the episodes being clustered together, however.
                   */
                  const bookIndex = this.books.findIndex(candidateBook => candidateBook.seasonNumber === seasonNumber);

                  const episodeIndex = item.getElementsByTagName('itunes\:episode')[0].textContent - 1
                  const audInfo = item.getElementsByTagName('enclosure')[0]

                  this.books[bookIndex].episodeList[episodeIndex] = {
                    episodeNumber: episodeIndex + 1,
                    linkSrc: audInfo.getAttribute('url'),
                    linkSize: audInfo.getAttribute('length'),
                    linkType: audInfo.getAttribute('type')
                  };
                } catch (err) {
                  console.log("Failed to process one of the episodes. Going to try to continue with the remaining episodes")
                  console.log(err.message)
                }
              }) // ends loop
            }
        )
    //end mounted
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#wessex-podcasts {
  h3 {
    text-align: left !important;
  }

  .seasonPodcastList {
    margin: auto;

    .podcastEpisode {
      border: none;
      box-shadow: none;
      padding-left: 1em;
      /* it is important to set a min width here, otherwise bootstrap can try to overlap these on smallish screens */
      min-width: 20em;

      .episodeNumber {
        vertical-align: top;
        margin-right: 0.5em;
      }
    }
  }

  .card {
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 10px black;
    margin: 0.5em 0.25em 0.25em;

    .card-body {
      h4 {
        text-align: unset;
        font-weight: bold;
      }

      .dueDate {
        float: right;
        font-weight: normal;
      }

      audio {
        margin: 0.5em auto auto;
        height: 2em;
      }

      a {
        margin: auto
      }

      .list-item-additional-data {
        padding-top: .75em;
      }

    }
  }
}
</style>
