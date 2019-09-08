<template>
  <div id="profile-description__main-bootstrap-container" class="container">
    <div v-if="viewedProfile === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else id="profile-description__content-container">
      <div id="profile-description__upper-level">
        <div id="profile-description__name">
          <div>
            <h1 class="display-4">
              {{ viewedProfile.username }}
            </h1>
          </div>
        </div>
        <div id="profile-description__picture-container">
          <div id="profile-description__picture-shape" class="loading">
            <img
              v-if="imageUrl === ''"
              id="profile-description__profile-picture"
              :src="viewedProfile.imageUrl"
              alt="Profile Picture"
            />
            <img
              v-else
              id="profile-description__profile-picture"
              :src="imageUrl"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
      <div
        v-if="viewedProfile.description !== ''"
        id="profile-description__description-level"
      >
        <span class="profile-description__detail-element-title">About Me</span>
        <br />
        <p id="profile-description__description">
          {{ viewedProfile.description }}
        </p>
      </div>
      <div id="profile-description__detail-level">
        <div
          v-if="
            viewedProfile.skillList[0] != null &&
              viewedProfile.skillList.length != 0 &&
              viewedProfile.skillList[0].value !== ''
          "
          id="profile-description__experience"
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >Skills & Experience</span
          >
          <br />
          <ul>
            <li
              v-for="(skill, index) in viewedProfile.skillList"
              :key="'skill key: ' + index"
            >
              {{ skill.value }}
            </li>
          </ul>
        </div>
        <div
          v-if="
            viewedProfile.gitHubUsername && viewedProfile.gitHubUsername !== ''
          "
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >GitHub username</span
          ><br />
          {{ viewedProfile.gitHubUsername }}
          <br />
        </div>
        <div
          v-if="
            viewedProfile.portfolioLink && viewedProfile.portfolioLink !== ''
          "
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >Link to the portfolio</span
          >
          <br />
          <a :href="viewedProfile.portfolioLink">{{
            viewedProfile.portfolioLink
          }}</a>
          <br />
        </div>
        <div
          v-if="viewedProfile.email && viewedProfile.email != ''"
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >Contact email</span
          >
          <br />
          {{ viewedProfile.email }}
        </div>
        <div
          v-if="
            viewedProfile.technologies.length !== 0 &&
              viewedProfile.technologies !== undefined
          "
          class="profile-description__detail-element-container"
        >
          <p>
            <span class="profile-description__detail-element-title"
              >Tech Stack</span
            >
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
        <div
          v-if="viewedProfile.language"
          class="profile-description__detail-element-container"
        >
          <p>
            <span class="profile-description__detail-element-title"
              >Communicative languages</span
            >
          </p>
          <ul>
            <li
              v-for="(language, index) in viewedProfile.language"
              :key="'Language key: ' + index"
            >
              {{ language.name }}
            </li>
          </ul>
        </div>
        <div
          v-if="viewedProfile.country"
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >Place of stay</span
          >
          <br />
          <span v-if="viewedProfile.city">{{ viewedProfile.city.name }}, </span>
          {{ viewedProfile.country.name }}
        </div>
      </div>
      <div v-if="isProfileOwner" id="modification-buttons">
        <router-link
          class="btn-primary btn"
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
  data() {
    return {
      imageUrl: "",
      image: null
    };
  },
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
    this.$store.dispatch("resetImageUpload");
  }
};
</script>
