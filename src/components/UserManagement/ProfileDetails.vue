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
              <!-- {{ viewedProfile.username }} -->
              Witek S.
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
          <div
            v-if="isProfileOwner"
            id="profile-description__picture-edit-button-container"
          >
            <button
              class="button profile-description__picture-edit-button"
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
              class="button profile-description__picture-edit-button"
              disabled
            >
              Save
            </button>
            <button
              v-else
              class="button profile-description__picture-edit-button"
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
              id="profile-description__image-upload-info"
              >Saved successfully!</span
            >
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
          <!-- {{ viewedProfile.description }} -->
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam unde
          officiis, placeat repellat beatae labore magnam quos. Reprehenderit
          dolore qui alias, vero corporis neque unde minima odio adipisci iste
          ut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          dolorem quam fugit molestiae nostrum fuga facilis dignissimos harum
          eaque earum!
        </p>
      </div>
      <div id="profile-description__detail-level">
        <div
          id="profile-description__experience"
          class="profile-description__detail-element-container"
        >
          <span class="profile-description__detail-element-title"
            >Skills & Experience</span
          >
          <br />
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
            <li>
              Website created for a student organisation in Vanilla JS
              (www.sknchak.p.lodz.pl)
            </li>
            <li>FreeCodeCamp 4/7 modules finished with projects</li>
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
              :key="'index: ' + index"
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
        <div class="profile-description__detail-element-container">
          <span class="profile-description__detail-element-title"
            >Contact email</span
          >
          <br />
          witek454@gmail.com
        </div>
      </div>
      <div v-if="isProfileOwner" id="modification-buttons">
        <router-link
          class="button"
          :to="{
            name: 'profileModification',
            params: { id: viewedProfile.id }
          }"
          >Edit</router-link
        >
      </div>
    </div>

    <!-- <div id="profile-description__contact-info"></div> -->

    <!-- 

      <p v-if="viewedProfile.name && viewedProfile.surname">
        <u><strong>Name:</strong></u
        >Witold S.
        {{ viewedProfile.name + " " + viewedProfile.surname }}
      </p> -->
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
  },
  methods: {
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
