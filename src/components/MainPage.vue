<template>
  <div id="main" class="main-page">
    <h1 class="main-title display-1"><strong>IT</strong>Pair.org</h1>
    <div class="buttons">
      <button type="button" class="btn btn-outline-dark btn-lg btn-big">
        Look for someone to practice with
      </button>
      <!-- <AdvertFiltering /> -->
      <p class="my-4">or</p>
      <button type="button" class="btn btn-outline-secondary btn-small">
        Add your own advert
      </button>
    </div>
    <p class="my-5 whycare">
      Why should I even <span style="color: #05386b"> care?</span>
    </p>
  </div>
</template>

<script>
import AdvertFiltering from "./Adverts/AdvertList/AdvertFiltering.vue";

export default {
  components: {
    AdvertFiltering
  }
};
</script>

<style scoped>
/* .btn {
  color: white !important;
} */
#main {
  background-color: #5cdb95;
}

.main-title {
  font-size: 7rem;
  color: #05386b;
}

.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 130px;
}

.buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.btn-small {
  padding: 10px 25px;
  color: #edf5e1;
  background-color: #05386b;
}

.btn-big {
  padding: 10px 25px;
  font-size: 1.3rem;
  color: #edf5e1;
  background-color: #05386b;
}

.whycare {
  color: #edf5e1;
}
</style>
