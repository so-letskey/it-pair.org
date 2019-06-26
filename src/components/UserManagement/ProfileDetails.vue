<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">{{ viewedProfile.username }}</h1>
      <p class="lead">
        {{ viewedProfile.description }}
      </p>
      <hr class="my-4" />
      <div v-if="viewedProfile.technologies" id="technologies">
        <p>Favorite technologies:</p>
        <ul>
          <li
            v-for="(technology, index) in viewedProfile.technologies"
            :key="'index: ' + index"
          >
            {{ technology.name }}
          </li>
        </ul>
      </div>
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
      return this.$store.getters.viewedProfile;
    },
    isProfileOwner() {
      if (this.$store.state.userDataModule.activeUser !== null) {
        return (
          this.$store.state.userDataModule.activeUser.id ===
          this.viewedProfile.id
        );
      } else return false;
    }
  },
  created() {
    this.$store.dispatch("setViewedProfile", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("resetViewedProfile");
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
