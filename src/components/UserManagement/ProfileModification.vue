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
            <label for="username">What is your name?</label>
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
          <ul></ul>
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
            :max-height="50"
            ><span slot="noResult"
              >No elements found. Consider changing the search query.</span
            ></Multiselect
          >
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
            :max-height="50"
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
            v-model="country"
            :options="this.$store.state.advertOptions.countries"
            placeholder="Type to search"
            label="name"
            track-by="name"
          ></Multiselect>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="addition-form" class="container">
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
  </div> -->
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
  destroyed() {
    this.$store.dispatch("resetViewedProfile");
    this.$store.dispatch("resetImageUpload");
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
      this.$store.dispatch("imageUploadedToClient");
    },
    saveImage() {
      let payload = {
        id: this.viewedProfile.id,
        image: this.image
      };
      this.$store.dispatch("editImage", payload);
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
