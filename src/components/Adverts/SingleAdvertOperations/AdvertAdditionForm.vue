<template>
  <div id="addition-form" class="container">
    <h1>Add your own advert</h1>
    <form action="" novalidate @submit.prevent>
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            name="title"
            class="form-control"
            required
          />
          <div class="valid-feedback">It works</div>
        </div>

        <div class="col-sm-12 col-md-12">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            type="text"
            name="description"
            class="form-control"
          />
          <div class="invalid-feedback">Well, duck you</div>
        </div>
      </div>
      <div>
        <label class="typo__label">Level</label>
        <Multiselect
          v-model="difficulty"
          :options="this.$store.state.advertOptions.difficultyLevels"
          placeholder="Choose the complexity level"
          label="name"
          track-by="name"
          :searchable="false"
        ></Multiselect>
      </div>
      <div>
        <label class="typo__label">Language</label>
        <Multiselect
          v-model="language"
          :options="this.$store.state.advertOptions.languages"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="150"
        ></Multiselect>
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
      <div class="form-group">
        <label for="technology-choice"
          >Define the tech stack (technologies you plan to use)</label
        >
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

      <router-link :to="{ name: 'advertsList' }"
        ><button class="btn btn-primary" @click="submitAdvert">
          Add an advert
        </button></router-link
      >
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase";
import { queryModifications } from "./AdvertOperationsMixin";

import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  mixins: [queryModifications],
  data() {
    return {
      title: "",
      description: "",
      difficulty: [],
      technologies: [],
      language: [],
      country: [],
      city: []
    };
  },
  mounted() {
    var form = document.querySelector(".needs-validation");
    form.addEventListener("submit", function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  },
  methods: {
    submitAdvert() {
      //The Firestore query is incompatible with the multiselect formatting,
      //hence two 'technologies' entries are used - one works with multiselect, the other
      //with search query
      let technologiesForQuery = this.createTechnologiesEntryForSearchQuery(
        this.technologies
      );
      let advert = {
        title: this.title,
        description: this.description,
        difficulty: this.difficulty.name,
        technologies: this.technologies,
        technologiesForQuery: technologiesForQuery,
        language: this.language.name,
        country: this.country.name,
        city: this.city.name,
        creatorsId: this.$store.getters.activeUserId,
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        modificationDate: firebase.firestore.FieldValue.serverTimestamp()
      };
      this.$store.dispatch("addNewAdvert", advert);
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
