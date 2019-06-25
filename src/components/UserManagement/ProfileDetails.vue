<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">{{ viewedProfile.username }}</h1>
      <p class="lead">
        {{ viewedProfile.description }}
      </p>
      <hr class="my-4" />
      <p>Favorite technologies:</p>
      <ul>
        <li
          v-for="(technology, index) in viewedProfile.technologies"
          :key="'index: ' + index"
        >
          {{ technology.name }}
        </li>
      </ul>

      <div v-if="isProfileOwner" id="modification-buttons">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{
            name: 'profileModification',
            params: { id: viewedProfile.id }
          }"
          >Edit</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    viewedProfile() {
      return this.$store.state.advertsModule.adverts.find(
        advert => advert.id == this.$route.params.id
      );
    },
    isProfileOwner() {
      if (this.$store.state.userDataModule.viewedProfile !== null) {
        return this.$store.state.userDataModule.viewedProfile.registeredAdverts.includes(
          this.viewedProfile.id
        );
      } else return false;
    }
  },
  created() {
    this.$store.dispatch("setviewedProfile", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("deactivateProfile");
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
