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
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="username">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            class="form-control"
            required
          />
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="username">Surname</label>
          <input
            id="surname"
            v-model="surname"
            type="text"
            name="surname"
            class="form-control"
            required
          />
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
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="gitHubUsername">GitHub username</label>
          <input
            id="gitHubUsername"
            v-model="gitHubUsername"
            type="text"
            name="gitUsername"
            class="form-control"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="portfolioLink">Portfolio link</label>
          <input
            id="portfolioLink"
            v-model="portfolioLink"
            type="text"
            name="portfolioLink"
            class="form-control"
            required
          />
        </div>
      </div>

      <div>
        <label class="typo__label">Language (communication)</label>
        <Multiselect
          v-model="language"
          :options="this.$store.state.advertOptions.languages"
          placeholder="Choose language(s)"
          label="name"
          track-by="name"
          :multiple="true"
          :max-height="150"
        ></Multiselect>
      </div>

      <div class="form-group">
        <label for="technology-choice">Technology Stack</label>
        <Multiselect
          id="technology-choice"
          v-model="technologies"
          class="multiselect"
          :options="this.$store.state.advertOptions.technologiesGrouped"
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

      <div>
        <label class="typo__label">Country</label>
        <Multiselect
          v-model="country"
          :options="this.$store.state.advertOptions.countries"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="200"
          open-direction="above"
        ></Multiselect>
      </div>
      <div>
        <label class="typo__label">City</label>
        <Multiselect
          v-model="city"
          :options="this.$store.state.advertOptions.countries"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="200"
          open-direction="above"
        ></Multiselect>
      </div>

      <div>
        <button @click.prevent="onPickFile">Upload Image</button>
        <input
          ref="fileInput"
          type="file"
          style="display: none"
          accept="image/*"
          @change="onFilePicked"
        />
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
      name: "",
      surname: "",
      description: "",
      gitHubUsername: "",
      portfolioLink: "",
      language: [],
      technologies: [],
      country: [],
      city: [],
      imageUrl: "",
      image: null
    };
  },
  computed: {
    viewedProfile() {
      return this.$store.state.profileDetailModule.viewedProfile;
    }
  },
  created() {
    this.username = this.viewedProfile.username;
    this.name = this.viewedProfile.name;
    this.surname = this.viewedProfile.surname;
    this.description = this.viewedProfile.description;
    this.gitHubUsername = this.viewedProfile.gitHubUsername;
    this.portfolioLink = this.viewedProfile.portfolioLink;
    this.language = this.viewedProfile.language;
    this.technologies = this.viewedProfile.technologies
      ? this.viewedProfile.technologies
      : [];
    this.country = this.viewedProfile.country;
    this.city = this.viewedProfile.city;
  },
  methods: {
    editProfile() {
      let profileDetails = {
        username: this.username,
        name: this.name,
        surname: this.surname,
        description: this.description,
        gitHubUsername: this.gitHubUsername,
        portfolioLink: this.portfolioLink,
        language: this.language,
        technologies: this.technologies,
        country: this.country,
        city: this.city,
        id: this.id
      };
      let profilePreview = {
        username: this.username,
        id: this.id
      };
      let payload = {
        profileDetails,
        profilePreview,
        image: this.image
      };
      this.$store.dispatch("editProfile", payload);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
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
