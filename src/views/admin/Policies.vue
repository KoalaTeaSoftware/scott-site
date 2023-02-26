<template>
  <div class="container" id="policies">
    <h1>Policies</h1>
    <!--    <EditableDiv identity="policies"></EditableDiv>-->
    <div class="displayedContent"><h2 id="privacy">Privacy</h2>
      <p>We collect no data directly from your use of this site.</p>
      <p>Google Analytics collects statistics, and we will make legitimate use of that data. We are unable to, and
        will not attempt to, identify you personally from this data. We can not be held responsible for the use that
        Google or other such parties put this data to.
      </p>
      <p>Clearly, if you use the Contact form, or contact us in some other way, we will know, and use for legitimate
        purposes, the data that you send to us. We will make every effort to keep that data private.
      </p>
      <h2 id="cookies">Cookies</h2>
      <p>The project itself makes no deliberate, direct use of cookies.</p>
      <p>As a result of visits to our pages, the following cookies may be placed by other services on your
        browsing device, for example:
      </p>
      <ul>
        <li>Google Analytics (they are called things like _GA, and _GA*)</li>
        <li>YouTube</li>
        <li>doubleclick.net - this is a marketing platform owned by Google</li>
      </ul>
      <p>This is not an exhaustive list, and we may integrate other services which may place their own cookies.</p>
      <p>We have no control over these cookies from other service suppliers, and you by using this web site are
        agreeing to the presence of these cookies on your device. If this concerns you, we suggest that you browse
        the internet for strategies for controlling these data on your own device.
      </p>
      <h2 id="other-terms--conditions">Other Terms &amp; Conditions</h2>
      <p>The project claims copyright for the site, and any content that originates from it. We make no such claims over
        content produced by others. We always endeavor to supply contact details for those other producers.
      </p>
      <p>Whilst we make every effort to ensure that our content is error-free, we are not responsible for things
        like errors in our content, the content of any external sites we link to etc.
      </p>
    </div>
  </div>
</template>

<script>
// import EditableDiv from "@/components/EditableDiv.vue";

export default {
  name: "Policies",
  // components: {EditableDiv}
}
</script>

<style>
#policies {
  text-align: left;
}

</style>
