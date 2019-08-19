<template>
  <div id="profile-description__main-bootstrap-container" class="container">
    <div v-if="viewedProfile === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else id="profile-description__content-container">
      <div id="profile-description__name">
        <h1 class="display-4">{{ viewedProfile.username }}</h1>
      </div>
      <div id="profile-description__picture-container" class="loading">
        <img
          id="profile-description__profile-picture"
          :src="viewedProfile.imageUrl"
          alt="Profile Picture"
        />
      </div>
      <div id="profile-description__description">
        <u><strong>About Me</strong></u> <br />
        <p class="lead">
          {{ viewedProfile.description }}
        </p>
      </div>
      <div id="profile-description__experience">
        <u><strong>Skills & Experience</strong></u> <br />
        <ul>
          <li>
            ITPair.org - fully functioning website created in Vue.js and
            integrated with Firebase
          </li>
          <li>
            Website created for a student organisation in Vanilla JS
            (www.sknchak.p.lodz.pl)
          </li>
          <li>FreeCodeCamp 4/7 modules finished with projects</li>
          <li>
            Colt Steele's Advanced developers bootcamp finished with projects
          </li>
        </ul>
        <span v-if="viewedProfile.gitHubUsername">
          <u><strong>GitHub username:</strong></u>
          {{ viewedProfile.gitHubUsername }}
          <br />
        </span>
        <span v-if="viewedProfile.portfolioLink">
          <u><strong>Link to the portfolio:</strong></u>
          <a :href="viewedProfile.portfolioLink">{{
            viewedProfile.portfolioLink
          }}</a>
          <br />
        </span>
      </div>
      <div id="profile-description__side-info">
        <div v-if="viewedProfile.technologies">
          <p>
            <u><strong>Tech Stack:</strong></u>
          </p>
          <ul>
            <li
              v-for="(technology, index) in viewedProfile.technologies"
              :key="'index: ' + index"
            >
              {{ technology.name }}
            </li>
          </ul>
        </div>
        <div v-if="viewedProfile.language">
          <p>
            <u><strong>Communicative languages:</strong></u>
          </p>
          <ul>
            <li
              v-for="(language, index) in viewedProfile.language"
              :key="'index: ' + index"
            >
              {{ language.name }}
            </li>
          </ul>
        </div>
      </div>
      <div id="profile-description__contact-info"></div>

      <!-- <span v-if="viewedProfile.country">
        <strong>Country:</strong> {{ viewedProfile.country.name }} <br />
      </span>
      <span v-if="viewedProfile.city">
        <strong>City:</strong> {{ viewedProfile.city.name }} <br />
      </span> -->

      <!-- <p v-if="viewedProfile.name && viewedProfile.surname">
          <strong>Name:</strong>
          {{ viewedProfile.name + " " + viewedProfile.surname }}
        </p> -->

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
