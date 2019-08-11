<template>
  <div id="main" class="main-page">
    <h1 class="main-title display-1"><strong>IT</strong>Pair.org</h1>
    <div class="buttons">
      <router-link :to="{ name: 'advertsList' }"
        ><button type="button" class="myBtn-big">
          Look for someone to practice with
        </button></router-link
      >
      <!-- <AdvertFiltering /> -->
      <p class="my-4">or</p>
      <router-link :to="{ name: 'advertAddition' }">
        <button type="button" class="myBtn-small">
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

.myBtn-big {
  border: 1px solid #8e8d8a;
  border-radius: 5px;
  background: #eae7dc;
  margin-top: 18px;
  transition: all 100ms linear;
  font-size: 16px;
  height: 55px;
  width: 300px;
  color: #8e8d8a;
  border: 1px solid #5f5f5d;
  color: #4b4b48;
}

.myBtn-small {
  border: 1px solid #8e8d8a;
  border-radius: 5px;
  background: #eae7dc;
  margin-top: 6px;
  transition: all 100ms linear;
  font-size: 14px;
  height: 45px;
  width: 200px;
  color: #8e8d8a;
  border: 1px solid #5f5f5d;
  color: #4b4b48;
}
</style>
