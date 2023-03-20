1. The overall structure of the contents is provide by the data() part of the vue
2. The actual episodes are pulled from the podcast host
The two may not easily correspond, so the read of the rss feed has to be careful when associating episodes to books

The books are grouped (those in 2023 and those in 2024). therefore, it ...
1. loops through the groups then,
2. loops through list of books
2.a only showing those books that have a matching index (into the current one of the list of groups)

Therefore, it loops through the list of books twice (only showing the ones matching the group), but it is fast enough
for this to give no pain.

<template>
  <div class="container" id="podcasts">
    <h1>Podcasts</h1>

    <div class="bookGroup" v-for="index in [0,1]">
      <h2>{{ headings[index] }}</h2>
      <div v-for="book in bookList">
        <div v-if="book.displayGroup === index">
          <div class="bookDetails card series">
            <div class="card-body">
              <div class="row">
                <div class="bookPoster col-2">
                  <img class="img-fluid" :src="`/assets/features/${book.poster}`" alt="Poster for the podcast">
                </div>

                <div class="bookInfo col">
                  <h3 class="mt-0">{{ book.title }}<span class="dueDate">({{ book.dueDate }})</span></h3>
                  <p v-for="para in book.synopsis" class="card-text book_synopsis">{{ para }}</p>

                  <div class="seasonPodcastList card-group">
                    <div v-for="episode in book.episodeList" class="card podcastEpisode">
                      <span class="episodeNumber">{{ episode.episodeNumber }}</span>
                      <audio controls preload="metadata" v-bind:src="episode.linkSrc">
                        <source v-bind:src="episode.linkSrc" :type="episode.linkType">
                        It appears that your browser can not play this,
                        please try plugging this into you podcast reader
                        <a :href="this.feed">
                          {{ feed }}
                        </a>
                        for the archive on our podcast server.
                      </audio>
                    </div>
                  </div>
                  <p v-if="book.screenplayLink"><b>Click
                    <a :href="book.screenplayLink" target="_blank" >here</a>
                    to see the screenplay <span v-if="book.onGoing"><em>still under development</em> </span> </b></p>
                </div>
                <!-- end info for this book -->
              </div>
            </div>
          </div>
          <!-- end details for this book -->
        </div>
        <!-- done all books that match this index -->
      </div>
      <!-- all book contents done for this index-->
    </div>
  </div>
</template>

<script>

// This is, currently, based on the DD feed's url;
export default {
  name: "podcasts",
  data() {
    return {
      feed: 'https://feeds.libsyn.com/431487/rsssssss',
      headings: [
        "Audio Plays for 2024",
        "Audio Plays for 2023",
      ],
      bookList: [
        {
          displayGroup: 0,
          seasonNumber: 1,
          title: "Waverley",
          poster: "movie-poster-waverley.jpg",
          dueDate: "Starts Oct. 2024",
          synopsis: ["Edward Waverley, an English gentleman of honour, has an officer's commission in the army.",
            "He is on holiday with family friends in Scotland when Jacobite uprising of 1745 challenges his honour and loyalty."
          ],
          episodeList: [],
          screenplayLink: "",
          onGoing: false
        },
        {
          displayGroup: 0,
          seasonNumber: 2,
          title: "Guy Mannering",
          poster: "movie-poster-guy-mannering.jpg",
          dueDate: "Starts Mar. 2024",
          synopsis: ["Harry Bertram, son of the Laird of Ellangowan, is kidnapped as a boy by the smuggler Dirk Hatteraick and carried off to Holland.",
            "When he comes back to Scotland to court his love, he does not realise that he has previously met her forbidding father."
          ],
          episodeList: [],
          screenplayLink: "",
          onGoing: false
        },
        {
          displayGroup: 1,
          seasonNumber: 3,
          title: "Scott's Rob Roy",
          poster: "movie-poster-rob-roy.jpg",
          dueDate: "Starts Nov. 2023.",
          synopsis: ["Frank unwilling to join his father's business is banished to Northumberland.",
            "After his father's business is attacked, Frank races to Scotland to find the culprit."
          ],
          episodeList: [],
          screenplayLink: "/assets/features/Scott's%20Rob%20Roy.pdf",
          onGoing: true
        },
      ]
    }
  },
  mounted() {
    fetch(this.feed)
        // getting the feed contents takes time. Got it, so extract the text. This, too, takes time
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
              // all of the interesting blobs in the feed are called items, so get a list of them
              // intellij does not understand that this selector is working on the data from the feed, so it complains. It is OK, however
              const itemList = data.querySelectorAll('item')
              itemList.forEach(item => {
                try {
                  // use the * 1 to turn it into a number (I forget why, but I think that this is the reason for it)
                  const seasonNumber = item.getElementsByTagName('itunes\:season')[0].textContent * 1
                  /*
                  The books are listed (in the template above) in the order which we want to see them on the page.
                  Notice that in this
                  This may not be the order in which they appear in the feed
                  We can rely on all of the episodes being clustered together, however.
                   */
                  const bookIndex = this.bookList.findIndex(candidateBook => candidateBook.seasonNumber === seasonNumber)

                  const episodeIndex = item.getElementsByTagName('itunes\:episode')[0].textContent - 1
                  const audInfo = item.getElementsByTagName('enclosure')[0]

                  this.bookList[bookIndex].episodeList[episodeIndex] = {
                    episodeNumber: episodeIndex + 1,
                    linkSrc: audInfo.getAttribute('url'),
                    linkSize: audInfo.getAttribute('length'),
                    linkType: audInfo.getAttribute('type')
                  };
                } catch (err) {
                  console.log("Failed to process one of the episodes. Going to try to continue with the remaining episodes")
                  console.log(">" + err.message + "<")
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

#podcasts {
  h3 {
    text-align: left !important;
  }

  .bookGroup {
    padding-bottom: 1em;

    .bookDetails {
      background-color: transparent;
      border-radius: 5px;
      box-shadow: 5px 5px 10px black;
      margin: 0.5em 0.25em 0.25em;

      h3 {
        text-align: unset!important;
        font-weight: bold;

        .dueDate {
          float: right;
          font-weight: normal;
        }
      }

      a {
        margin: auto
      }


      .seasonPodcastList {
        margin: auto;

        .podcastEpisode {
          border: none;
          box-shadow: none;
          padding-left: 1em;
          // make a margin below so that the number look like they are referring to their audio
          // Can't make it the same as with the DD (number to left of audio)
          margin: auto auto 0.75em;
          /* it is important to set a min width here, otherwise bootstrap can try to overlap these on smallish screens */
          min-width: 20em;
          // do this, otherwise it is white
          background-color: inherit;

          .episodeNumber {
            margin: auto;
            width: fit-content;
          }

          audio {
            margin: 0.5em auto auto;
            height: 2em;
            background-color: white;
            width: 95%;
          }
        }
      }
    }
  }
}
</style>
