<template>
  <div class="container advert-description-container">
    <div v-if="activeAdvert === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else id="advert-description">
      <h1 class="display-4">{{ activeAdvert.title }}</h1>
      <div id="advert-description-grid">
        <div id="description-column">
          <p class="lead">{{ activeAdvert.description }}</p>
        </div>
        <div id="profile-preview-column">
          <ProfilePreview :id="activeAdvert.creatorsId" />
        </div>
        <div id="key-info-column">
          <!-- This additional div is necessary for the correct display of the red line -->
          <div id="key-info">
            <div id="key-info-container">
              <span id="key-info__tech-stack"
                ><strong>Tech stack </strong>
                <ul>
                  <li
                    v-for="(technology, index) in activeAdvert.technologies"
                    :key="index"
                  >
                    {{ technology.name }}
                  </li>
                </ul>
              </span>
              <strong>Language: </strong> {{ activeAdvert.language }} <br />
              <strong>Country: </strong>{{ activeAdvert.country }} <br />
              <strong>City: </strong>{{ activeAdvert.city }} <br />
              <strong>Level: </strong>{{ activeAdvert.difficulty }} <br />
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="isAdvertOwner" id="modification-buttons">
        <router-link
          class="btn btn-primary btn-lg"
          :to="{
            name: 'advertModification',
            params: { id: activeAdvert.id }
          }"
          >Edit</router-link
        >
        <router-link
          :to="{
            name: 'advertsList'
          }"
        >
          <button class="btn btn-danger btn-lg" @click="deleteAdvert">
            Delete
          </button></router-link
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import ProfilePreview from "./ProfilePreview.vue";

export default {
  components: {
    ProfilePreview
  },
  computed: {
    activeAdvert() {
      return this.$store.state.advertsModule.activeAdvert;
    },
    isAdvertOwner() {
      if (this.$store.state.userDataModule.activeUser !== null) {
        return this.$store.state.userDataModule.activeUser.registeredAdverts.includes(
          this.activeAdvert.id
        );
      } else return false;
    }
  },
  beforeCreate() {
    this.$store.dispatch("setActiveAdvert", this.$route.params.id);
  },
  destroyed() {
    this.$store.dispatch("deactivateAdvert");
  },
  methods: {
    deleteAdvert() {
      this.$store.dispatch("deleteAdvert", this.activeAdvert);
    }
  }
};
</script>
