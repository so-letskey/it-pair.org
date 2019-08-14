<template>
  <div id="profile-preview-container">
    Witold S. <br />
    <!-- {{ viewedProfile.description }} -->
    <router-link
      :to="{
        name: 'profileDetails',
        params: { id: creatorsId }
      }"
    >
      <button class="btn btn-info btn-lg">
        Show Profile
      </button></router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    creatorsId: {
      type: String,
      default: ""
    }
  },
  computed: {
    viewedProfile() {
      return this.$store.state.profileDetailModule.viewedProfile;
    }
  },
  created() {
    console.log(this.creatorsId);
    this.$store.dispatch("setViewedProfile", this.creatorsId);
  },
  destroyed() {
    this.$store.dispatch("resetViewedProfile", this.creatorsId);
  }
};
</script>

<style scoped>
#profile-preview-container {
  border-left: 1px solid #5f5f5d;
  /* border-bottom: 1px solid #5f5f5d; */
  width: 400px;
  margin: 50px 0px 0px 0px;

  height: 150px;
  padding: 30px;
}
</style>
