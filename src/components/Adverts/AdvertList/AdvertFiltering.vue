<template>
  <div id="searchBar" class="accordion">
    <div class="card">
      <div
        id="collapseOne"
        aria-labelledby="headingOne"
        data-parent="#searchBar"
      >
        <div class="card-body">
          <form action="" class="needs-validation" novalidate>
            <div class="row">
              <div class="col-sm-12 col-md-12">
                <label class="typo__label">TECHNOLOGY</label>
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
                <label class="typo__label">COUNTRY</label>
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
                <label class="typo__label">CITY</label>
                <Multiselect
                  v-model="country"
                  :options="this.$store.state.advertOptions.countries"
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
                <label class="typo__label">LEVEL</label>
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
                <label class="typo__label">LANGUAGE</label>
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
          <div class="buttons">
            <button class="myBtn" @click="resetParameters">
              RESET
            </button>
            <button class="myBtn" @click="dispatchSearchQuery">
              SEARCH
            </button>
          </div>
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
      country: this.$store.state.filteringEngine.country
    };
  },
  methods: {
    dispatchSearchQuery() {
      let searchParameters = {
        difficulty: this.difficulty,
        technologies: this.technologies,
        language: this.language,
        country: this.country
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
      this.$store.dispatch("resetParameters");
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.card {
  margin-bottom: 0px;
  border: 1px #8e8d8a solid !important;
  border-radius: 5px !important;
  background-color: #eae7dc;
}

#searchBar {
  width: 900px;
  margin: 40px auto;
}

.card-header {
  display: flex;
  justify-content: space-around;
}

.typo__label {
  color: #e85a4f;
  margin-bottom: 0px;
  margin-left: 2px;
  font-size: 13px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  padding-right: 0px;
}

.myBtn {
  border: 1px solid #8e8d8a;
  border-radius: 5px;
  background: white;
  margin-top: 18px;
  transition: all 100ms linear;
  margin-left: 10px;
  font-size: 14px;
  height: 38px;
  width: 90px;
  color: #8e8d8a;
  border: 1px solid #5f5f5d;
  color: #4b4b48;
}

.myBtn:hover {
  border: 1px solid #4b4b48;
  color: #4b4b48;
}
</style>
