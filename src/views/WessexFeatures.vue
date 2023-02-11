<template>
  <div id="wessexFeatures">
    <div class="container" id="wessex-features">
      <h1>Thomas Hardy's Wessex Dramas</h1>
      <h2>A Duo of Anthology Features:</h2>

      <div class="row align-items-center">
        <h3>Hardy's Hand of Fate: 2023</h3>
        <p>Everyone is welcome to audition for this feature's, cast and crew roles.
          Please drop us a line using our <a href="/contact>subject=Hardy's Hand of Fate - Auditions">contact form</a>
        </p>

        <div class="row align-items-center">
          <div class="col-3 col-md-2">
            <img id="poster" class="img-fluid"
                 src="/assets/wessex/features/hardys-hand-of-fate/hand-of-fate-poster.jpg"
                 alt="Poster for the Hardy's Hand of Fate feature"
            >
          </div>
          <div class="col">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Screenplay</th>
                <th scope="col">Possible shooting dates</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>Interlopers at the Knap</th>
                <td><a target="_blank"
                       href="https://www.dropbox.com/s/pa7rb75yxg6y1ln/Interlopers%20At%20The%20Knap%20D1%20R1.pdf?dl=0">Screenplay</a>
                </td>
                <td>2 weekends June '23</td>
              </tr>

              <tr>
                <th>Netty Sargent's Copyhold</th>
                <td><a target="_blank"
                       href="https://www.dropbox.com/s/hr18jmd1730aet5/Netty%20Sergeant%27s%20Copyhold%20D1.pdf?dl=0">Screenplay</a>
                </td>
                <td>2 weekends April '23</td>
              </tr>

              <tr>
                <th>The Winters and the Palmleys</th>
                <td><a target="_blank"
                       href="https://www.dropbox.com/s/yyyzp7794wts68u/The%20Winters%20and%20the%20Palmleys.pdf?dl=0">Screenplay</a>
                </td>
                <td>2 weekends May '23</td>
              </tr>

              <tr>
                <th>The History of the Hardcombes</th>
                <td><a target="_blank"
                       href="https://www.dropbox.com/s/v4w85a49ntvn09h/the%20history%20of%20the%20hardcomes%20D1.pdf?dl=0">Screenplay</a>
                </td>
                <td>2 weekends July '23</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <h3>Hardy's Regrets: 2022</h3>
        <p>This feature has now been produced and is starting its year of the festivals' circuit. DVDs are available for
          purchase on this web site and on
          <a href="https://rosegoldthorp.com/" target="_blank" title="Rose's web site"> rosegoldthorp.com </a>
          (Casts and crews will naturally receive free downloads)
        </p>

        <div class="row align-items-center">
          <div class="col-3 col-md-2">
            <img id="poster" class="img-fluid"
                 src="/assets/wessex/features/hardys-regrets/hardys-regrets-poster.jpg"
                 alt="Poster for the film">
          </div>

          <div class="col">
            <table class="table">
              <tr>
                <th>The Superstitious Man</th>
                <td>
                  <a target="_blank"
                     href="https://www.dropbox.com/s/84fyxi7g2273rn4/The%20Superstitious%20Man%20D1%20R3.pdf?dl=0">Screenplay</a>
                </td>
              </tr>
              <tr>
                <th>The Withered Arm</th>
                <td>
                  <a target="_blank"
                     href="https://www.dropbox.com/s/mc71pgg068p0tmz/The%20Withered%20Arm%20D1%20R3.pdf?dl=0">Screenplay</a>
                </td>
              </tr>
              <tr>
                <th>The Three Strangers</th>
                <td>
                  <a target="_blank"
                     href="https://www.dropbox.com/s/vbmwyjz74gbwlm0/The%20Three%20Strangers%20D1.pdf?dl=0">Screenplay</a>
                </td>
              </tr>
              <tr>
                <th>What the Shepherd Saw</th>
                <td>
                  <a target="_blank"
                     href="https://www.dropbox.com/s/bvxpq7bj76dywkd/What%20The%20Shepherd%20Saw%20D1%20R3.pdf?dl=0">Screenplay</a>
                </td>
              </tr>
            </table>
          </div>

          <div class="col">
            <div class="embed-responsive embed-responsive-16by9">
              <p class="help">Not playing nicely on your iPad?<br/>Try picture-in-picture, or maximising the player.</p>
              <video id="hrTrailer" controls preload="auto" class="embed-responsive-item w-100"
                     poster="/assets/wessex/features/hardys-regrets/posterImage.jpg">
                <source src="/assets/wessex/features/hardys-regrets/hardysRegretsTrailer@720p30.mp4"
                        type="video/mp4">
              </video>
            </div>
            <p class="CTA">The DVD can be purchased on <a href="https://gumroadrose.gumroad.com/l/hardysregretsdvd"
                                                          target="_blank">Gumroad</a></p>
            <p class="CTA">The movie can also be downloaded (streamed) from <a href="https://gumroadrose.gumroad.com/l/hardysregretsdownload"
                                                          target="_blank">Gumroad</a></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WessexFeatures",
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import "src/assets/livery";

#wessexFeatures {
  // the text looks a bit piddly on the chrome simulation of iPads
  font-size: larger;

  tr {
    border-bottom-color: $colour-banner-background;
  }

  th {
    font-family: branded-font, "Times New Roman", Times, serif;
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
}

</style>
