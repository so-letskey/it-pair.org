<template>
  <div id="addition-form" class="container">
    <h1>Edit advert</h1>
    <form action="" novalidate @submit.prevent>
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <label for="title">Title</label>
          <input
            id="title"
            v-model.trim.lazy="$v.title.$model"
            :class="{ 'is-invalid': $v.title.$error }"
            type="text"
            name="title"
            class="form-control"
            required
          />
          <div v-if="$v.title.$error" class="invalid-message">
            Enter a valid title
          </div>
        </div>

        <div class="col-sm-12 col-md-12">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model.trim.lazy="$v.description.$model"
            :class="{ 'is-invalid': $v.description.$error }"
            type="text"
            name="description"
            class="form-control"
          />
          <div v-if="$v.description.$error" class="invalid-message">
            Enter a valid description
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="typo__label">Level</label>
        <Multiselect
          v-model.trim.lazy="$v.difficulty.$model"
          :class="{ 'is-invalid-multiselect': $v.difficulty.$error }"
          :options="this.$store.state.advertOptions.difficultyLevels"
          placeholder="Choose the complexity level"
          label="name"
          track-by="name"
          :searchable="false"
        ></Multiselect>
        <div v-if="$v.difficulty.$error" class="invalid-message">
          Select difficulty
        </div>
      </div>
      <div class="form-group">
        <label class="typo__label">Language</label>
        <Multiselect
          v-model.trim.lazy="$v.language.$model"
          :class="{ 'is-invalid-multiselect': $v.language.$error }"
          :options="this.$store.state.advertOptions.languages"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="150"
        ></Multiselect>
        <div v-if="$v.language.$error" class="invalid-message">
          Select language of communication
        </div>
      </div>
      <div class="form-group">
        <label class="typo__label">Country</label>
        <Multiselect
          v-model.trim.lazy="$v.country.$model"
          :class="{ 'is-invalid-multiselect': $v.country.$error }"
          :options="this.$store.state.advertOptions.countries"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="200"
          open-direction="above"
        ></Multiselect>
        <div v-if="$v.country.$error" class="invalid-message">
          Select the country of your stay
        </div>
      </div>
      <div class="form-group">
        <label class="typo__label">City</label>
        <Multiselect
          v-model.trim.lazy="$v.city.$model"
          :class="{ 'is-invalid-multiselect': $v.city.$error }"
          :options="this.$store.state.advertOptions.cities"
          placeholder="Type to search"
          label="name"
          track-by="name"
          :max-height="200"
          open-direction="above"
        ></Multiselect>
        <div v-if="$v.city.$error" class="invalid-message">
          Select the city of your stay
        </div>
      </div>
      <div class="form-group">
        <label for="technology-choice"
          >Define the tech stack (technologies you plan to use)</label
        >
        <Multiselect
          id="technology-choice"
          v-model.trim.lazy="$v.technologies.$model"
          :class="{ 'is-invalid-multiselect': $v.technologies.$error }"
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
        <div v-if="$v.technologies.$error" class="invalid-message">
          Choose at least one technology you plan to use
        </div>
      </div>

      <router-link
        :to="{
          name: 'advertDescription',
          params: { id: id }
        }"
        ><button class="btn btn-primary" @click="editAdvert">
          Save changes
        </button></router-link
      >
    </form>
  </div>
</template>

<script>
import * as firebase from "firebase";
import Multiselect from "vue-multiselect";
import { required } from "vuelidate/lib/validators";
import { queryModifications } from "./AdvertOperationsMixin";

export default {
  components: {
    Multiselect
  },
  mixins: [queryModifications],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeAdvert: this.$store.state.advertsModule.activeAdvert,
      title: "",
      description: "",
      difficulty: [],
      technologies: [],
      country: [],
      city: [],
      language: []
    };
  },
  validations: {
    title: {
      required
    },
    description: {
      required
    },
    language: {
      required
    },
    difficulty: {
      required
    },
    country: {
      required
    },
    city: {
      required
    },
    technologies: {
      required
    }
  },
  created() {
    // The unexpected object formatting used here in a few entries is necessary, because
    // of the difference between the notation multiselect uses => { name: 'Poland' }
    // and the formatting of the entry in database => 'Poland' (from which this.activeAdvert
    // takes its data)
    // It is difficult to standardize this formatting because multiselect is an
    // outside component, and firestore needs simple formatting for a search query.
    this.title = this.activeAdvert.title;
    this.description = this.activeAdvert.description;
    this.difficulty = { name: this.activeAdvert.difficulty };
    this.technologies = this.activeAdvert.technologies;
    this.country = { name: this.activeAdvert.country };
    this.city = { name: this.activeAdvert.city };
    this.language = { name: this.activeAdvert.language };
  },
  methods: {
    editAdvert() {
      // Validation
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
          modificationDate: firebase.firestore.FieldValue.serverTimestamp(),
          id: this.id
        };
        this.$store.dispatch("editAdvert", advert);
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
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

.invalid-message {
  margin-top: 2px;
  font-size: 12px;
  color: red;
}
</style>

<style>
.is-invalid-multiselect .multiselect__tags {
  border-color: red !important;
}
</style>
