// This document needs small refactoring

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'welcomePage' }" tag="a"
      ><strong>IT</strong>Pair</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
          <router-link :to="{ name: 'welcomePage' }" tag="a" class="nav-link"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'advertsList' }" tag="a" class="nav-link"
            >Search</router-link
          >
        </li>
        <li v-if="this.$store.state.userDataModule.activeUser" class="nav-item">
          <router-link :to="{ name: 'advertAddition' }" tag="a" class="nav-link"
            >Add Advert</router-link
          >
        </li>
        <li
          v-if="!this.$store.state.userDataModule.activeUser"
          class="nav-item"
        >
          <router-link :to="{ name: 'userSignIn' }" tag="a" class="nav-link"
            >Sign In</router-link
          >
        </li>
        <li v-if="this.$store.state.userDataModule.activeUser" class="nav-item">
          <a class="nav-link" @click="dispatchLogOut"
            ><span class="pointer">Log Out</span></a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    dispatchLogOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer !important;
}
</style>
