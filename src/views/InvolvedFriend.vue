<template>
  <div class="container" id="friend">
    <h1>Friends</h1>
    <div class="row align-items-center">
      <div class="col-3">
        <img class="img-fluid" src="/assets/welc-caro/sir-walter-scott.jpg" alt="Sir Walter Scott himself">
      </div>
      <div class="col">

        <P>Our Friends are, perhaps, our most important individual supporters. Friends are not necessarily supporters,
          but
          have chosen to help the Scott Dramas Project in some other big way
        </P>
        <p>
          Friends can show their support for the work of the Scottland Project in almost any way. For example:
        </p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Make a significant donation</li>
          <li class="list-group-item">Allow us to film a feature at your large period house</li>
          <li class="list-group-item">As a person, or organisation of considerable community standing, you could
            publicly
            endorse our aims
          </li>
        </ul>
        <p>
          We will honour our Friends by inscribing their name on our Friends' Roll of Honour; unless, of course, you
          tell us
          not to.
        </p>
        <p>Friends automatically receive the benefits of a Gold supporter</p>
      </div>
      <p class="lead">To become a friend please <a href="/contact?subject=Becoming a Friend of the project">make contact using our contact page</a></p>
    </div>
  </div>

</template>

<script>
export default {
  name: "InvolvedFriend"
}
</script>

<style lang="scss">
#friend{
  .list-group-item {
    background-color: inherit;
    font-weight: bold;
    border: none;
  }
  .list-group{
    padding-bottom: 1.5em;
  }
}

</style>
