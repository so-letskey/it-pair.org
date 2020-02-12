<template>
  <div id="profile-preview-container">
    <div v-if="profilePreview === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else id="profile-preview">
      <div class="loading profile-preview__picture-container">
        <img
          id="profile-preview__profile-picture"
          :src="profilePreview.imageUrl"
          alt="Profile Picture"
        />
      </div>
      <div id="profile-preview__name">{{ profilePreview.username }}</div>
      <br />
      <router-link
        :to="{
          name: 'profileDetails',
          params: { id: id }
        }"
      >
        <button class="button advert-description-button">
          SHOW PROFILE
        </button></router-link
      >
      <!-- <button class="button advert-description-button">
        CONTACT
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  computed: {
    profilePreview() {
      return this.$store.state.profilePreviewModule.profilePreview;
    }
  },
  created() {
    this.$store.dispatch("setProfilePreview", this.id);
  },
  destroyed() {
    this.$store.dispatch("resetProfilePreview");
  }
};
</script>
