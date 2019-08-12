<template>
  <div id="main" class="main-page">
    <h1 class="main-title display-1"><strong>IT</strong>Pair.org</h1>
    <div class="buttons">
      <router-link :to="{ name: 'advertsList' }"
        ><button type="button" class="myBtn myBtn-big">
          Look for someone to practice with
        </button></router-link
      >
      <p class="my-4">or</p>
      <router-link :to="{ name: 'advertAddition' }">
        <button type="button" class="myBtn myBtn-small">
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

.whycare {
  color: #e85a4f;
}

.myBtn {
  border: 1px solid #5f5f5d;
  border-radius: 5px;
  background: #eae7dc;
  transition: all 100ms linear;
  color: black;
}

.myBtn-big {
  margin-top: 18px;
  font-size: 16px;
  height: 55px;
  width: 300px;
}

.myBtn-small {
  margin-top: 6px;
  font-size: 14px;
  height: 45px;
  width: 200px;
}
</style>
