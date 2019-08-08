<template>
  <nav class="mniam navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'mainPage' }" tag="a">
      <strong>IT</strong>Pair.org</router-link
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
            ><span class="nav-itemz"> {{ navElement.name }}</span></router-link
          >
        </li>
        <!-- Actionable nav-item: -->
        <li v-if="this.$store.state.userDataModule.activeUser" class="nav-item">
          <router-link
            :to="{
              name: 'profileDetails',
              params: { id: this.$store.state.userDataModule.activeUser.id }
            }"
            tag="a"
            class="nav-link"
            >My Profile</router-link
          >
        </li>
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
        navElementsArray.push({
          routeName: "advertAddition",
          name: "Add Advert"
        });
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

.mniam {
  background-color: #eae7dc !important;
}

.nav-itemz {
  color: #8e8d8a !important;
}
</style>
