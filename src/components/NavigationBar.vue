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
        <li
          v-for="(navElement, index) in navElements"
          :key="'NavElement key: ' + index"
          class="nav-item"
        >
          <router-link
            :to="{ name: navElement.routeName }"
            tag="a"
            class="nav-link"
            >{{ navElement.name }}</router-link
          >
        </li>
        <!-- Actionable nav-item: -->
        <li v-if="this.$store.getters.userIsSignedIn" class="nav-item">
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
  computed: {
    navElements() {
      let navElementsArray = [{ routeName: "advertsList", name: "Search" }];
      if (this.$store.getters.userIsSignedIn) {
        navElementsArray.push(
          { routeName: "advertAddition", name: "Add Advert" },
          { routeName: "profileDetails", name: "My Profile" }
        );
      } else
        navElementsArray.push({ routeName: "userSignIn", name: "Sign In" });
      return navElementsArray;
    }
  },
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
