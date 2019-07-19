<template>
  <div class="container">
    <div v-if="viewedProfile === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="jumbotron">
      <h1 class="display-4">{{ viewedProfile.username }}</h1>
      <p class="lead">
        {{ viewedProfile.description }}
      </p>
      <hr class="my-4" />
      <div v-if="viewedProfile.gitHubUsername">
        <p>
          <strong>GitHub username:</strong> {{ viewedProfile.gitHubUsername }}
        </p>
      </div>
      <div v-if="viewedProfile.portfolioLink">
        <p>
          <strong>Link to the portfolio:</strong>
          {{ viewedProfile.portfolioLink }}
        </p>
      </div>
      <div v-if="viewedProfile.country">
        <p><strong>Country:</strong> {{ viewedProfile.country.name }}</p>
      </div>
      <div v-if="viewedProfile.city">
        <p><strong>City:</strong> {{ viewedProfile.city.name }}</p>
      </div>
      <div v-if="viewedProfile.technologies" id="technologies">
        <p><strong>Tech Stack:</strong></p>
        <ul>
          <li
            v-for="(technology, index) in viewedProfile.technologies"
            :key="'index: ' + index"
          >
            {{ technology.name }}
          </li>
        </ul>
      </div>
      <div v-if="viewedProfile.language" id="technologies">
        <p><strong>Communicative languages:</strong></p>
        <ul>
          <li
            v-for="(language, index) in viewedProfile.language"
            :key="'index: ' + index"
          >
            {{ language.name }}
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
      return this.$store.state.profileDetailModule.viewedProfile;
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
