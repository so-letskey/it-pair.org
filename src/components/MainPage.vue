<template>
  <div id="main" class="main-page">
    <h1 class="main-title display-1"><strong>IT</strong>Pair.org</h1>
    <div class="buttons-container">
      <router-link :to="{ name: 'advertsList' }"
        ><button
          type="button"
          class="button main-page-button main-page-button--big"
        >
          Look for someone to code with
        </button></router-link
      >
      <p class="my-4">or</p>
      <router-link :to="{ name: 'advertAddition' }">
        <button
          type="button"
          class="button main-page-button main-page-button--small"
        >
          Add your own advert
        </button></router-link
      >
    </div>
    <p class="my-5 red-text">
      Why should I even care?
    </p>
  </div>
</template>
