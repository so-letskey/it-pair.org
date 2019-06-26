<template>
  <div id="addition-form" class="container">
    <h1>Edit Profile</h1>
    <form action="" class="needs-validation" novalidate>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            name="username"
            class="form-control"
            required
          />
          <div class="valid-feedback">It works</div>
        </div>

        <div class="col-sm-12 col-md-6">
          <label for="description">Description</label>
          <input
            id="description"
            v-model="description"
            type="text"
            name="description"
            class="form-control"
          />
          <div class="invalid-feedback">Well, duck you</div>
        </div>
      </div>

      <div class="form-group">
        <label for="language">Language</label>
        <select
          id="language"
          v-model="language"
          name="language"
          class="form-control"
        >
          <option
            v-for="(languageEntry, index) in this.$store.state.profileOptions
              .languages"
            :key="'languageKey: ' + index"
            :value="languageEntry"
            >{{ languageEntry }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="technology-choice">Preffered technologies</label>
        <Multiselect
          id="technology-choice"
          v-model="technologies"
          class="multiselect"
          :options="this.$store.state.advertOptions.technologies"
          :multiple="true"
          group-values="libs"
          group-label="language"
          :group-select="false"
          placeholder="Type to search"
          track-by="name"
          label="name"
          ><span slot="noResult"
            >No elements found. Consider changing the search query.</span
          ></Multiselect
        >
      </div>

      <router-link
        :to="{
          name: 'profileDetails',
          params: { id: id }
        }"
        ><button class="btn btn-primary" @click="editProfile">
          Save changes
        </button></router-link
      >
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      username: "",
      description: "",
      language: "",
      technologies: []
    };
  },
  computed: {
    viewedProfile() {
      return this.$store.state.profileDetailModule.viewedProfile;
    }
  },
  created() {
    this.username = this.viewedProfile.username;
    this.description = this.viewedProfile.description;
    this.language = this.viewedProfile.language;
    this.technologies = this.viewedProfile.technologies
      ? this.viewedProfile.technologies
      : [];
  },
  methods: {
    editProfile() {
      let profileDetails = {
        username: this.username,
        description: this.description,
        language: this.language,
        technologies: this.technologies,
        id: this.id
      };
      this.$store.dispatch("editProfile", profileDetails);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
#addition-form {
  background-color: beige;
  margin-top: 50px;
  border-radius: 20%;
  padding: 70px;
}

.form-group {
  margin-bottom: 15px;
}

.multiselect {
  margin-bottom: 15px;
}
</style>
