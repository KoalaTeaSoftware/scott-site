<template>
  <div>
    <h1>Contact</h1>
    <!--
    g-3 for horizontal gutters
    novalidate so browser hands-over responsibility for validation to bootstrap
    -->
    <form
        @submit="onSubmit"
        @reset="onReset"
        id="contactForm"
        class="row g-3"
    >
      <div class="input-group mb-0">
        <span class="input-group-text" id="senderNameDesc">Your Name: </span>
        <input type="text" class="form-control" id="senderName" aria-describedby="senderNameDesc" required
               v-model="formData.name"
               :minlength="constraints.nameLengthMin" :maxlength="constraints.nameLengthMax"
               :pattern="constraints.nameRegexp">
      </div>
      <p class="mt-0" v-if="!checkName">
        Please give me a name between {{ constraints.nameLengthMin }} and {{ constraints.nameLengthMax }} letters, or
        numbers long.
      </p>
      <p class="mt-0" v-else>OK</p>

      <div class="input-group mb-0 mt-1" id="emailGroup">
        <span class="input-group-text" id="email1Desc">@: </span>
        <input type="email" class="form-control" id="email1" aria-describedby="email1Desc" required
               v-model="formData.address1"
               :minlength="constraints.emailLengthMin" :maxlength="constraints.emailLengthMax"
        >
        <!-- This is OTT because the field check mechanism provides enough feedback.
        But,interestingly enough itt visibility comes and goes as expected (with the form set up as it is)
        <div class="invalid-feedback">Please provide your email address.</div>
        -->
      </div>
      <div class="input-group mb-0 mt-0">
        <span class="input-group-text" id="email2Desc">@: </span>
        <input type="email" class="form-control" id="email2" aria-describedby="email2Desc" required
               v-model="formData.address2"
               :minlength="constraints.emailLengthMin" :maxlength="constraints.emailLengthMax">
      </div>
      <p class="mt-0" v-if="!checkEmails">
        Please provide, then confirm your email address. I ask twice to make slip-ups a little less likely.
      </p>
      <p class="mt-0" v-else>OK</p>

      <div class="input-group mb-0">
        <span class="input-group-text" id="subjectDesc">Subject: </span>
        <input type="text" class="form-control" id="subject" aria-describedby="subjectDesc" required
               v-model="formData.subject"
               :minlength="constraints.subjectLengthMin" :maxlength="constraints.subjectLengthMax">
      </div>
      <p class="mt-0" v-if="!checkSubject">
        Please provide me with a subject for your message, avoiding special characters.
      </p>
      <p class="mt-0" v-else>OK</p>

      <div class="input-group mb-0">
        <span class="input-group-text" id="messageDesc">Message:</span>
        <textarea class="form-control" id="message" aria-describedby="messageDesc" required rows="3"
                  :minlength="constraints.msgLengthMin" :maxlength="constraints.msgLengthMax"
                  v-model="formData.message" @keyup="showCount"
        ></textarea>
      </div>
      <p class="mt-0"><!-- always show this, so that the counter stays there -->
        <span v-if="!checkMessage"> Please write your message here, avoiding special characters.</span>
        <span v-else>OK</span>
        <span id="counter"> (Chars left: {{ this.remainingMsgChars }})</span>
      </p>

      <button type="submit" id="submitButton" :disabled="!checkAll">Submit</button>
      <button type="reset" id="resetButton">Reset</button>
      <p id="feedback" v-show="!!feedbackMessage">{{ feedbackMessage }}</p>
      <LoadingSpinner :show-me="!!busy"></LoadingSpinner>
    </form>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery.scss";

#contactForm {
  width: 75%;
  margin: auto;

  .input-group-text, #submitButton {
    background-color: $colour-banner-background;
    color: $colour-banner-primary-text;
    border-color: $colour-banner-background;
  }

  #submitButton:disabled {
    opacity: 0.5;
  }

  #counter {
    margin-top: 0;
    font-size: smaller;
    text-align: right;
    font-style: italic;
  }
  // the default colours are a bit primary, use our own livery
  //noinspection CssUnusedSymbol
  .bg-success {
    background-color: $colour-banner-background!important;
    color: $colour-banner-primary-text;
  }
}
</style>


<script>
import formConstraints from '../../functions/email.config.json';
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const mailService = " https://us-central1-scottland-dramas.cloudfunctions.net/sendMail"

export default {
  name: "Contact",
  components: {LoadingSpinner},
  data() {
    return {
      feedbackMessage: null,
      messageSent: false,
      formData: {
        name: "",
        address1: "",
        address2: "",
        subject: "",
        message: ""
      },
      constraints: formConstraints,
      remainingMsgChars: formConstraints.msgLengthMax,
      busy:false
    }
  },
  mounted() {
    // const currentDate = new Date();
    const subj = new URLSearchParams(window.location.search).get('subject')
    if (subj && subj.length > 0)
      this.formData.subject = subj.substring(0, (this.constraints.subjectLengthMax - 1))
  },
  methods: {
    showCount: function () {
      const elem = document.getElementById('message');
      const len = (!!elem && !!elem.value) ? elem.value.length : 0;
      this.remainingMsgChars = this.constraints.msgLengthMax - len
    },
    onSubmit: function (event) {
      event.preventDefault()
      this.busy = true;
      console.debug('Told to send an email')
      if (this.checkAll) {
        console.debug('All fields are good')
        const fields = document.getElementById("contactForm").getElementsByTagName('*');
        for (const elem of fields) {
          elem.disabled = true
        }

        const formData = this.formData
        console.debug(`form data ${JSON.stringify(formData)}`)
        console.debug(`Sending to ${mailService}`)

        fetch(
            mailService,
            {
              method: 'POST',
              mode: "cors",
              headers: {"content-type": "application/json"},
              body: JSON.stringify(formData)
            })
            .then(response => {
              console.log(`Back in the Contact form, Response.OK [${response.ok}].`);
              this.busy = false;
              if (response.ok) {
                this.giveGoodFeedback(true);
                response.text()
                    .then(text => {
                      console.log(`Response text [${text}].`);
                    })
                    .catch((err => {
                      console.log(`Unable to get response text [${err}].`);
                    }))
              } else {
                this.busy = false;
                this.giveGoodFeedback(false);
                response.text()
                    .then(text => {
                      console.log(`Response text [${text}].`);
                    })
                    .catch((err => {
                  console.log(`Unable to get response text [${err}].`);
                }))
              }
            })
        // for some reason, this catch seems to get called, even if all goes well
        // .catch(reason => {
        //   console.log("Crashed sending, Reason is not null: [" + reason !== null + "]");
        //   console.log("Crashed sending, Sending email appears to have failed: [" + reason);
        //   this.giveGoodFeedback(false);
        // })
      } else {
        console.log("There is some sort of validation failure")
        this.giveGoodFeedback(false);
        this.busy = false;
      }
    },
    onReset: function (event) {
      console.log("Resetting")
      event.preventDefault()
      this.feedbackMessage = this.formData.name = this.formData.address1 = this.formData.address2 = this.formData.subject = this.formData.message = ""
    },
    giveGoodFeedback(isGood) {
      if (!!isGood) {
        this.feedbackMessage = "Thank you for your message. We will get back to you as soon as possible."
        document.getElementById("feedback").classList.remove('bg-warning')
        document.getElementById("feedback").classList.add('bg-success')
      } else {
        this.feedbackMessage = "Unfortunately, your message could not be sent. Please try again later."
        document.getElementById("feedback").classList.add('bg-warning')
        document.getElementById("feedback").classList.remove('bg-success')
      }
    },
    markFieldValidity(fieldName, isValid) {
      // always need to check if the field exists yet, as this is called by vue as it builds the page
      if (!!document.getElementById(fieldName)) {
        if (isValid) {
          document.getElementById(fieldName).classList.add("is-valid")
          document.getElementById(fieldName).classList.remove("is-invalid")
        } else {
          document.getElementById(fieldName).classList.remove("is-valid")
          document.getElementById(fieldName).classList.add("is-invalid")
        }
      }
      // whether we could make it pretty, or not, return what we have been told, so that this method can be used 'in passing'
      return isValid;
    }
  },
  computed: {
    checkAll: function () {
      return (this.checkName && this.checkEmails && this.checkSubject && this.checkMessage)
    },
    checkName: function () {
      return this.markFieldValidity(
          "senderName",
          (this.formData.name.length > this.constraints.nameLengthMin) &&
          (this.formData.name.length <= this.constraints.nameLengthMax) &&
          (this.formData.name.match(this.constraints.nameRegexp) != null)
      )
    },
    checkEmails: function () {
      // can't rely on the browser to validate the email formats, so put it in there
      const expr = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
      if (this.markFieldValidity(
          "email1",
          (this.formData.address1.length > this.constraints.emailLengthMin) &&
          (this.formData.address1.length <= this.constraints.emailLengthMax) &&
          expr.test(this.formData.address1)
      )) {
        if (this.markFieldValidity(
            "email2",
            (this.formData.address2.length > this.constraints.emailLengthMin) &&
            (this.formData.address2.length <= this.constraints.emailLengthMax) &&
            expr.test(this.formData.address2)
        )) {
          return this.markFieldValidity(
              "email2",
              this.formData.address2 === this.formData.address1
          )
        }
      } else {
        //fields 1, or 2 proved to be invalid, so field 2 has not been evaluated, so something must be returned
        return false;
      }
    },
    checkSubject: function () {
      return this.markFieldValidity(
          "subject",
          (this.formData.subject.length > this.constraints.subjectLengthMin) &&
          (this.formData.subject.length <= this.constraints.subjectLengthMax) &&
          (this.formData.subject.match(this.constraints.subjectRegexp) != null))
    },
    checkMessage: function () {
      return this.markFieldValidity(
          "message",
          (this.formData.message.length > this.constraints.msgLengthMin) &&
          (this.formData.message.length <= this.constraints.msgLengthMax) &&
          (this.formData.message.match(this.constraints.msgRegexp) != null)
      )
    },
  }
}
</script>

