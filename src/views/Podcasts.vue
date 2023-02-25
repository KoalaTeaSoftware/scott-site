1. The overall structure of the contents is provide by the data() part of the vue
2. The actual episodes are pulled from the podcast host
The two may not easily correspond, so the read of the rss feed has to be careful when associating episodes to books

<template>
  <div class="container" id="features">
    <h1>Podcast</h1>

    <div class="bookGroup" v-for="group in bookGroups">
      <h2>{{ group.heading }}</h2>

      <div class="card series" v-for="book in group.list">
        <div class="card-body">

          <div class="bookDetails">
            <div class="row">
              <div class="col-2">
                <img class="img-fluid"
                     :src="`/assets/features/${book.poster}`"
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

          <div class="row align-items-center" v-if="book.screenplayLink">
            <a :href="book.screenplayLink"
               target="_blank"
               class="list-item-additional-data ext-link"
               title="See the screenplay in a new tab"
            >Click here to read the feature's screenplay</a>
          </div>

        </div>
      </div><!-- ends card body -->
    </div>
  </div>
</template>

<script>

export default {
  name: "podcasts",
  data() {
    return {
      bookGroups: [
        {
          heading: "Audio Plays for 2024",
          list: [
            {
              title: "Waverley",
              poster: "movie-poster-waverley.jpg",
              dueDate: "Starts Oct. 2024",
              synopsis: ["Edward Waverley, an English gentleman of honour, has an officer's commission in the army.",
                "He is on holiday with family friends in Scotland when Jacobite uprising of 1745 challenges his honour and loyalty."
              ],
              seasonNumber: 1,
              episodeList: [],
              screenplayLink: ""
            },
            {
              title: "Guy Mannering",
              poster: "movie-poster-guy-mannering.jpg",
              dueDate: "Start Mar. 2024",
              synopsis: ["Harry Bertram, son of the Laird of Ellangowan, is kidnapped as a boy by the smuggler Dirk Hatteraick and carried off to Holland.",
                "When he comes back to Scotland to court his love, he does not realise that he has previously met her forbidding father."
              ],
              seasonNumber: 2,
              episodeList: [],
              screenplayLink: ""
            },
          ],
        },
        {
          heading: "Audio Plays for 2023",
          list: [
            {
              title: "Scott's Rob Roy",
              poster: "movie-poster-rob-roy.jpg",
              dueDate: "Starts Nov. 2023.",
              synopsis: ["Frank unwilling to join his father's business is banished to Northumberland.",
                "After his father's business is attacked, Frank races to Scotland to find the culprit."
              ],
              seasonNumber: 3,
              episodeList: [],
              screenplayLink: ""
            },
          ],
        }
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

#features {
  h3 {
    text-align: left !important;
  }

  .bookGroup{
    padding-bottom: 1em;
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
