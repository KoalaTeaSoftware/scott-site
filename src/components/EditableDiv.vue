This component uses a 'identity' _Property_ that gives the div that wraps it an HTML ID attribute. This could be used by CSS.
It depends on previous, external setting-up of the Firebase firestore stuff.
It depends on a firestore collection called "content". Each item in that collection will have:
1) A string attribute called "name" which will match to the identity property's value
2) A string attribute called "content" which is what get put on the screen

The VueShowdown component is detailed in various places
* https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
* https://vue-showdown.js.org/

<template>
  <div :id="identity" :class="myClass">
    <markDownPanel
      class="displayedContent"
      :markdown=displayedContent
      flavor="github"
      @dblclick="showEditor"
    />
    <LoadingSpinner :show-me="!!busy"/>

    <div class="modal" tabindex="-1" :id="this.modalId">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit the contents of this div.</h5>
            <br />
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    title="This will throw away any experiment that you have in this modal">
            </button>
          </div>
          <div class="modal-body">
            <ol class="text-bg-info instructions">
              <li>Having got this modal up, edit the contents</li>
              <li>Preview the changes</li>
              <li>If you are happy, re-raise this pop-up, and hit publish</li>
            </ol>
            <p class="text-bg-info">For the syntax of markdown,
              <a target="_blank" href="https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax">Click
                Here</a>
              (opens another tab)</p>
            <textarea></textarea>
            <p class="text-bg-warning">You <em>must</em> preview it. Otherwise you will not change a thing.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="preview"
                    title="Close the modal and see what it will look like">Preview
            </button>
            <button type="button" class="btn btn-light" @click="save" title="Make your changes permanent">Publish
            </button>
            <button type="button" class="btn btn-link" @click="refresh" title="Fetch the content from the database"
                    :disabled="!canRefresh">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VueShowdown} from "vue-showdown";
import {DB_HANDLE} from "@/main";

import {useUserStore} from "@/stores/userState";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner.vue";

// Note that the showdown-capable panel is given the name 'markDownPanel', and this name us used when the element is declared in the template
// noinspection JSUnusedGlobalSymbols
export default {
  props: { identity: String },
  components: {LoadingSpinner, "markDownPanel": VueShowdown },
  data() {
    return {
      busy: true,
      docId: null, // shared between the reading and writing actions
      displayedContent: "Loading ....", // this is read from the store, shown on the screen and initialises the edit panel
      modalId: this.identity + "-modal"
    };
  },
  mounted() {
    /* when the component is mounted, get the contents from the DB and display it in the dedicated area.
     * That area will interpret the MD and make it look nice
     */
    this.busy = true;

    this.readFromDB(this.identity)
      .then(firstDoc => {
        this.busy = false;
        // console.debug(`[mounted] Back from reader. ID: [${firstDoc.id}]`);
        this.docId = firstDoc.id;
        this.displayedContent = firstDoc.data().content;
      })
      .catch(err => {
        this.busy = false;
        if (err === "not-found") {
          // our own reader will catch a not-found failure, and make it more manageable
          this.displayedContent = "This is dummy text because this appears to be a brand new block of text.";
        } else {
          this.displayedContent = "An error has occurred, Please refresh the page";
          console.error(`[mounted] Back from reader. Error: [${err}]`);
        }
      });
  },
  methods: {
    readFromDB(blockName) {
      // console.log(`[readFromDB] called for [${blockName}]`);
      return new Promise((resolve, reject) => {
        const QUERY = query(collection(DB_HANDLE, "content"), where("name", "==", blockName));
        getDocs(QUERY)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // console.log(`[readFromDB] Back from firestore with data ID: [${JSON.stringify(querySnapshot.docs[0].id)}]`);
              resolve(querySnapshot.docs[0]);
            } else {
              // console.log(`[readFromDB] Back from firestore, but found nothing`);
              reject("not-found");
            }
          })
          .catch(err => {
            console.error(`[readFromDB] Back from firestore with error [${JSON.stringify(err)}]`);
            reject(err);
          });
      });
    },
    writeToDb(docId, data) {
      // console.log(`[writeToDb] ID[${docId}], data[${JSON.stringify(data)}]`);
      return new Promise((resolve, reject) => {
        if (docId == null) {
          // this is a 'new' block, so make it generate the unique ID
          addDoc(collection(DB_HANDLE, "content"), data)
            .then((docRef) => {
              // console.log(`[writeToDb] added new OK [${JSON.stringify(docRef.id)}]`);
              this.docId = docRef.id;
              resolve();
            })
            .catch(err => {
              console.error(`[writeToDb] Adding failed [${err}]`);
              reject(err);
            });

        } else {
          // We've already found and read for this block, so make sure it overwrites existing content
          setDoc(doc(DB_HANDLE, "content", docId), data)
            .then(() => {
              // console.log("[writeToDb] Saved OK");
              resolve();
            })
            .catch(err => {
              console.error(`[writeToDb] Saving failed [${err}]`);
              reject(err);
            });

        }
      });
    },
    showEditor() {
      if (useUserStore().iAmEditor || useUserStore().iAmAdministrator) {
        // take whatever is shown currently (could be different from what is in the database),
        // and show it as plain text (i.e. showing mark-down directives) in the modal
        document.getElementById(this.identity).getElementsByTagName("textarea")[0].value = this.displayedContent;

        // showing a bootstrap modal has to go this way: create an object based on the defined stuff, then call one of its methods
        const myModal = new bootstrap.Modal(document.getElementById(this.modalId), {});
        myModal.show();
      } // otherwise, just ignore the double-click
    },
    hideEditor() {
      // trying to close it in a similar way to opening it is nfg, so actually click the close button
      document.getElementById(this.identity).getElementsByClassName("btn-close")[0].click();
    },
    preview() {
      // take whatever is shown in the modal, and place that in the (interpreted) block
      // so the user can see what it looks like
      this.displayedContent = document.getElementById(this.identity).getElementsByTagName("textarea")[0].value;
      this.hideEditor();
    },
    refresh() {
      this.busy = true;
      // get whatever is in the database, and put that into the MODAL's area.
      // This is for use if the user has cocked-up with their previews, and wants to start again
      // Note that they will have to preview to get that back into what is displayed in the page
      // the other alternative would be to refresh the page, but they may lose their session
      this.readFromDB(this.identity)
        .then((firstDoc) => {
          document.getElementById(this.identity).getElementsByTagName("textarea")[0].value = firstDoc.data().content;
          this.busy = false;
        })
        .catch(err => {
          console.err(`Failed to refresh modal from DB [${err}]`);
          this.busy = false;
        });
    },
    save() {
      this.busy = true;
      // take whatever is ON THE MAIN VIEW (not in the modal), and store that in the database
      // this is hopefully OK, because they will always have previewed, then opened the modal so as to save
      const toSave = {
        "name": this.identity,
        "content": this.displayedContent
      };
      // console.debug(`[save] docID [${this.docId}]. toSave [${JSON.stringify(toSave)}]`);
      this.writeToDb(this.docId, toSave)
        .then(() => {
          // console.debug(`[save] succeeded`);
          this.hideEditor();
          this.busy = false;
        })
        .catch(err => {
          console.error(`[save] failed [${err}]`);
          this.busy = false;
        });
    }
  },
  computed: {
    myClass() {
      // add the indication that the user is privileged to edit the content
      let myClassString = "editableDiv";
      if (useUserStore().iAmEditor || useUserStore().iAmAdministrator) {
        myClassString += " amEditable";
      }
      return myClassString;
    },
    canRefresh() {
      return !!this.docId;
    }
  }
};

</script>

<style lang="scss">
.amEditable {
  border-color: #F7D059;
  border-style: inset;
  border-width: 2px;
}

.editableDiv {
  .modal-dialog {
    max-width: 80%; // otherwise, it is a mean little thing in the middle of the screen
    .instructions {
      text-align: left !important; // the list of instruction, get words near the numbers
      margin-bottom: 0; // get rid of gap between list and the next instruction
    }

    .modal-body > textarea {
      width: 90%; // otherwise, it is a mean little thing in the middle of the screen
      height: 20em; // a fairly arbitrary size, just make it reasonably big
    }
  }
}
</style>
