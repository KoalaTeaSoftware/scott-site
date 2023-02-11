This uses the straight Bootstrap 3 embedding, rather than the bootstrap-vue one, because the bootstrap-vue version does not
appear to want to play. Rather than spend any longer trying to find out why, I use the first effective solution.

See the comments in the props section to see how to use this component.

Note:
* Rose creates her posts using the app, which creates all items as regular
Therefore, it is imperative that she use the right hash tags.
* Also, this does not creat item-titles, but shoves h2 elements into the regular-body

It depends on a proxy to a Tumblr blog, which returns a bag of XML. It processes that XML and draws a div containing
appropriate elements for different types of post. For the moment, the range of types supported is rather narrow.

<template>
  <div class="tumblrBlogRoll">
    <LoadingSpinner/>
    <div v-for="(post) in fullPostList" class="post">
      <div class="postHolder">

        <h2 v-if="post.title">{{ post.title }}</h2>
        <img v-if="post.imgLink" class="img-fluid" :src="post.imgLink" alt="'Image to go with '+post.title">
        <div v-if="post.vidLink" class="embed-responsive embed-responsive-16by9">
          <iframe
              :title="post.title"
              :src="post.vidLink + '?showinfo=0&modestbranding=0'"
              class="embed-responsive-item vid-viewer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
        </div>
        <div v-if="post.text" v-html="post.text"></div>
      </div>

      <div class="postListTail">
        <a v-if="redirectLocation" :href="redirectLocation" class="more ext-link" target="_blank"> read more ... </a>
      </div>
    </div>
  </div>
</template>

<script>
/* readXML is defined, although it does not seem necessary for it to persist (compared to the interpreted data),
 * so as to force coercion of the response, when it is being processed, into a string
 */
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import firebase from "firebase/compat";

export default {
  name: "TumblrBlock",
  components: {LoadingSpinner},
  props: {
    /**
     * If this is anything other than zero, then this will show only the first post, and that will have its text trimmed
     * To this length, plus an anchor tag using the next property
     */
    trimLength: String,

    /**
     * Used (if the trimLength is anything other than zero) in the trailing anchor tag
     * Something like /novels is most likely, but I don't see why it shouldn't be an entire URL
     * The target is going to be _self
     */
    redirectLocation: String,

    /**
     * Use this in order to get a block that contains only posts of a certain type.
     * The type that you give has to correspond to some tag that you give some posts in the target blog
     * If you don't give a value to this, it will come through as "undefined", and the product will be the entire blog
     * (well, actually, just the default max number of entries)
     * If you give a value that does not match any of your tags, then you risk getting nothing back
     */
    blogType: String,

    /**
     * It should output no more than this number of posts
     * Has to be a string because (it seems) the builder makes it into one, but it should be a number
     */
    maxNumPosts: String
  },
  data() {
    return {
      busy: true,
      readXML: "",
      parsedXML: null,
      fullPostList: [],
      mutableMax: 1
    }
  },
  mounted: function () {
    const functions = firebase.functions();
    const readTumblr = functions.httpsCallable("readTumblr")

    // const tumblrProxy = "https://us-central1-daily-dilettante.cloudfunctions.net/readTumblr";

    let toSend = {
      blogType: this.blogType,
      maxCount: this.maxNumPosts,
    }

    readTumblr(toSend)
        .then(response => {
          console.debug("Back in 'then' from readTumble call");
          console.debug(`Response is ${response}`);
          // if (response.ok) {
          //   console.debug("th response is OK");
          //   // This will create a promise carrying the relevant data  - Despite best efforts, it will be the text of the message
          //   return response.text()
          // } else {
          //   console.error(`Failed to read Tumblr. Server returned ${response.status}: ${response.statusText}. Therefore using the dummy text`)
          //   return dummyText
          // }
        })
        .catch(function (err) {
          console.log('Crashed trying to get the tumblr feed [%s]', err);
        });
    this.busy = false
  },
  methods: {
    /**
     * Uses browser-built-in stuff to parse the XML into something nice
     *
     * @param xmlData - an XML element
     * @returns {string} - the value, or content of the element in a useful string
     */
    xmlToString: function (xmlData) {
      let xmlString;
      //IE
      if (window.ActiveXObject) {
        xmlString = xmlData.xml;
      }
      // code for Mozilla, Firefox, Opera, etc.
      else {
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
      }
      return xmlString;
    },

    /**
     * A quick-ish and apparently robust way of un-encoding html
     * Interestingly enough, this element never becomes visible.
     *
     * @param html
     * @returns {string}
     */
    decodeHtml: function (html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
}
</script>
