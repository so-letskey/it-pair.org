<template>
  <div id="addition-form" class="container">
    <h1>Edit advert</h1>
    <form action="" class="needs-validation" novalidate>
      <div class="row">
        <div class="col-sm-12 col-md-6">
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
        <label for="difficulty">Difficulty</label>
        <select
          id="difficulty"
          v-model="difficulty"
          name="difficulty"
          class="form-control"
        >
          <option
            v-for="(difficultyLevel, index) in this.$store.state.advertOptions
              .difficultyLevels"
            :key="'difficultyLevelKey: ' + index"
            :value="difficultyLevel"
            >{{ difficultyLevel }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="technology-choice">Technologies used</label>
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
import { queryModifications } from "./AdvertOperationsMixin";

import Multiselect from "vue-multiselect";

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
      activeAdvert: this.$store.state.advertsModule.adverts.find(
        advert => advert.id == this.id
      ),
      title: "",
      description: "",
      difficulty: "",
      technologies: []
    };
  },
  created() {
    this.title = this.activeAdvert.title;
    this.description = this.activeAdvert.description;
    this.difficulty = this.activeAdvert.difficulty;
    this.technologies = this.activeAdvert.technologies;
  },
  methods: {
    editAdvert() {
      let technologiesForQuery = this.createTechnologiesEntryForSearchQuery(
        this.technologies
      );
      let advert = {
        title: this.title,
        description: this.description,
        difficulty: this.difficulty,
        technologies: this.technologies,
        technologiesForQuery: technologiesForQuery,
        creatorsId: this.$store.getters.activeUserId,
        id: this.id,
        erej: ["1", "2"]
      };
      this.$store.dispatch("editAdvert", advert);
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
