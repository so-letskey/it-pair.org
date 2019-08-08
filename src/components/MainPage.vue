<template>
  <div id="main" class="main-page">
    <h1 class="main-title display-1"><strong>IT</strong>Pair.org</h1>
    <div class="buttons">
      <router-link :to="{ name: 'advertsList' }"
        ><button type="button" class="btn btn-outline-dark btn-lg btn-big">
          Look for someone to practice with
        </button></router-link
      >
      <!-- <AdvertFiltering /> -->
      <p class="my-4">or</p>
      <router-link :to="{ name: 'advertAddition' }">
        <button type="button" class="btn btn-outline-secondary btn-small">
          Add your own advert
        </button></router-link
      >
    </div>
    <p class="my-5 whycare">
      Why should I even care?
    </p>
  </div>
</template>

<style scoped>
/* .btn {
  color: white !important;
} */
#main {
  background-color: #eae7dc;
}

.main-title {
  font-size: 7rem;
  color: black;
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
  border-color: #8e8d8a;
  color: black;
  background-color: #eae7dc;
}

.btn-big {
  padding: 10px 25px;
  font-size: 1.3rem;
  border-color: #8e8d8a;
  color: black;
  background-color: #eae7dc;
}

.whycare {
  color: #e85a4f;
}
</style>
