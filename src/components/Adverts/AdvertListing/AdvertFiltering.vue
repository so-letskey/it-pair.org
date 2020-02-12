<template>
  <div id="filtering-container">
    <div
      id="collapseOne"
      aria-labelledby="headingOne"
      data-parent="#filtering-container"
    >
      <div class="card-body">
        <form action="" class="needs-validation" novalidate>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <label class="filter-label">TECHNOLOGY</label>
              <Multiselect
                v-model="technologies"
                :options="this.$store.state.advertOptions.technologiesSingle"
                placeholder="Type to search technology"
                label="name"
                track-by="name"
                :max-height="200"
                open-direction="below"
              ></Multiselect>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <label class="filter-label">COUNTRY</label>
              <Multiselect
                v-model="country"
                :options="this.$store.state.advertOptions.countries"
                placeholder="Type to search a country"
                label="name"
                track-by="name"
                :max-height="130"
                open-direction="below"
              ></Multiselect>
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="filter-label">CITY</label>
              <Multiselect
                v-model="city"
                :options="this.$store.state.advertOptions.cities"
                placeholder="Type to search a city"
                label="name"
                track-by="name"
                :max-height="130"
                open-direction="below"
              ></Multiselect>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <label class="filter-label">LEVEL</label>
              <Multiselect
                v-model="difficulty"
                :options="this.$store.state.advertOptions.difficultyLevels"
                placeholder="Choose the difficulty level"
                label="name"
                track-by="name"
                open-direction="above"
                :searchable="false"
              ></Multiselect>
            </div>
            <div class="col-sm-12 col-md-6">
              <label class="filter-label">LANGUAGE</label>
              <Multiselect
                v-model="language"
                :options="this.$store.state.advertOptions.languages"
                placeholder="Type to search communication language"
                label="name"
                track-by="name"
                :max-height="150"
                open-direction="above"
              ></Multiselect>
            </div>
          </div>
        </form>
        <div class="advert-filtering-buttons-container">
          <button
            class="button advert-filtering-button"
            @click="resetParameters"
          >
            RESET
          </button>
          <button
            class="button advert-filtering-button"
            @click="dispatchSearchQuery"
          >
            SEARCH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: { Multiselect },
  data() {
    return {
      difficulty: this.$store.state.filteringEngine.difficulty,
      technologies: this.$store.state.filteringEngine.technologies,
      language: this.$store.state.filteringEngine.language,
      country: this.$store.state.filteringEngine.country,
      city: this.$store.state.filteringEngine.country
    };
  },
  methods: {
    dispatchSearchQuery() {
      let searchParameters = {
        difficulty: this.difficulty,
        technologies: this.technologies,
        language: this.language,
        country: this.country,
        city: this.city
      };
      this.$store.dispatch("resetSearch");
      this.$store.dispatch("saveParameters", searchParameters);
      this.$store.dispatch("loadAdverts", searchParameters);
    },
    resetParameters() {
      this.difficulty = null;
      this.technologies = null;
      this.language = null;
      this.country = null;
      this.city = null;
      this.$store.dispatch("resetParameters");
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
