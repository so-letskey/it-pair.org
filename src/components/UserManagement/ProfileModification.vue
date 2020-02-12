<template>
  <div id="profile-modification__main-bootstrap-container" class="container">
    <div v-if="viewedProfile === null" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else id="profile-modification__content-container">
      <div id="profile-modification__upper-level">
        <div id="profile-modification__name">
          <div>
            <label for="username"
              >What name would you like to be displayed?</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              name="username"
              class="form-control"
              required
            />
          </div>
        </div>
        <div id="profile-modification__picture-container">
          <div id="profile-modification__picture-shape" class="loading">
            <img
              v-if="imageUrl === ''"
              id="profile-modification__profile-picture"
              :src="viewedProfile.imageUrl"
              alt="Profile Picture"
            />
            <img
              v-else
              id="profile-modification__profile-picture"
              :src="imageUrl"
              alt="Profile Picture"
            />
          </div>
          <div id="profile-modification__picture-edit-button-container">
            <button
              class="button profile-modification__picture-edit-button"
              @click.prevent="onPickFile"
            >
              Upload
            </button>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFilePicked"
            />
            <button
              v-if="
                !this.$store.state.imageUploadHandling.imageUploadedToClient
              "
              class="button profile-modification__picture-edit-button"
              disabled
            >
              Save
            </button>
            <button
              v-else
              class="button profile-modification__picture-edit-button"
              @click.prevent="saveImage"
            >
              <span v-if="!this.$store.state.imageUploadHandling.imageLoading"
                >Save</span
              >
              <img
                v-else
                class="button-loader"
                src="../../../public/img/loading-gif-40-3.gif"
              />
            </button>
            <span
              v-if="this.$store.state.imageUploadHandling.imageUploadedToServer"
              id="profile-modification__image-upload-info"
              >Saved successfully!</span
            >
          </div>
        </div>
      </div>
      <div id="profile-modification__description-level">
        <span class="profile-modification__detail-element-title">About Me</span>
        <br />
        <textarea
          id="description"
          v-model="description"
          type="text"
          name="description"
          class="form-control"
        />
      </div>
      <div id="profile-modification__detail-level">
        <div
          id="profile-modification__experience"
          class="profile-modification__detail-element-container"
        >
          <span class="profile-modification__detail-element-title"
            >Skills & Experience</span
          >
          <br />
          <div v-for="(skill, index) in skillList" :key="index">
            <input
              id="singleSkill"
              :key="index"
              v-model="skill.value"
              type="text"
              :name="'singleSkill' + index"
              class="form-control"
            />
            <button class="button" @click="deleteSkill(index)">Delete</button>
          </div>
          <button class="button" @click="addSkill">Add Skill</button>
        </div>
        <div class="profile-modification__detail-element-container">
          <span class="profile-modification__detail-element-title"
            >GitHub username</span
          ><br />
          <input
            id="gitHubUsername"
            v-model="gitHubUsername"
            type="text"
            name="gitUsername"
            class="form-control"
            required
          />
        </div>
        <div class="profile-modification__detail-element-container">
          <span class="profile-modification__detail-element-title"
            >Link to the portfolio</span
          >
          <input
            id="portfolioLink"
            v-model="portfolioLink"
            type="text"
            name="portfolioLink"
            class="form-control"
            required
          />
        </div>
        <div class="profile-modification__detail-element-container">
          <span class="profile-modification__detail-element-title"
            >Contact email</span
          >
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            class="form-control"
            required
          />
        </div>
        <div class="profile-modification__detail-element-container">
          <p>
            <span class="profile-modification__detail-element-title"
              >Tech Stack</span
            >
          </p>
          <Multiselect
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
        <div class="profile-modification__detail-element-container">
          <p>
            <span class="profile-modification__detail-element-title"
              >Communicative languages</span
            >
          </p>
          <Multiselect
            v-model="language"
            :options="this.$store.state.advertOptions.languages"
            placeholder="Choose language(s)"
            label="name"
            track-by="name"
            :multiple="true"
          ></Multiselect>
        </div>
        <div class="profile-modification__detail-element-container">
          <span class="profile-modification__detail-element-title"
            >Place of stay</span
          >
          <br />
          Country:
          <Multiselect
            v-model="country"
            :options="this.$store.state.advertOptions.countries"
            placeholder="Type to search"
            label="name"
            track-by="name"
          ></Multiselect>
          City:
          <Multiselect
            v-model="city"
            :options="this.$store.state.advertOptions.cities"
            placeholder="Type to search"
            label="name"
            track-by="name"
          ></Multiselect>
        </div>
        <button class="button" @click="editProfile">Save Changes</button>
      </div>
    </div>
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
      skillList: [],
      gitHubUsername: "",
      portfolioLink: "",
      language: [],
      technologies: [],
      country: [],
      city: [],
      email: "",
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
    this.$store.dispatch("setViewedProfile", this.$route.params.id);
    this.username = this.viewedProfile.username;
    this.description = this.viewedProfile.description;
    this.skillList = this.viewedProfile.skillList;
    this.gitHubUsername = this.viewedProfile.gitHubUsername;
    this.portfolioLink = this.viewedProfile.portfolioLink;
    this.email = this.viewedProfile.email;
    this.language = this.viewedProfile.language;
    this.technologies = this.viewedProfile.technologies
      ? this.viewedProfile.technologies
      : [];
    this.country = this.viewedProfile.country;
    this.city = this.viewedProfile.city;
  },
  destroyed() {
    this.$store.dispatch("resetViewedProfile");
    this.$store.dispatch("resetImageUpload");
  },
  methods: {
    editProfile() {
      let profileDetails = {
        username: this.username,
        description: this.description,
        skillList: this.skillList,
        gitHubUsername: this.gitHubUsername,
        portfolioLink: this.portfolioLink,
        email: this.email,
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
        profilePreview
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
      this.$store.dispatch("imageUploadedToClient");
    },
    saveImage() {
      let payload = {
        id: this.viewedProfile.id,
        image: this.image
      };
      this.$store.dispatch("editImage", payload);
    },
    addSkill() {
      this.skillList.push({ value: "" });
    },
    deleteSkill(index) {
      this.skillList.splice(index, 1);
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

#username {
  width: 250px;
  font-size: 2rem;
  margin: 0 auto;
  text-align: center;
}

#description {
  margin-top: 20px;
  min-height: 80px;
  height: 120px;
  font-size: 1.2rem;
}
</style>
