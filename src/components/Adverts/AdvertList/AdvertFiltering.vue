<template>
  <div id="searchBar" class="accordion">
    <div class="card">
      <div id="headingOne" class="card-header">
        <button
          class="btn btn-primary collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          Filters
        </button>
        <router-link :to="{ name: 'advertsList' }"
          ><button class="btn btn-primary">Search</button></router-link
        >
      </div>

      <div
        id="collapseOne"
        class="collapse"
        aria-labelledby="headingOne"
        data-parent="#searchBar"
      >
        <div class="card-body">
          <form action="" class="needs-validation" novalidate>
            <div>
              <label class="typo__label">Choose a technology</label>
              <Multiselect
                v-model="technologies"
                :options="this.$store.state.advertOptions.technologiesSingle"
                placeholder="Type to search"
                label="name"
                track-by="name"
                :max-height="100"
              ></Multiselect>
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
                  v-for="(difficultyLevel, index) in this.$store.state
                    .advertOptions.difficultyLevels"
                  :key="'difficultyLevelKey: ' + index"
                  :value="difficultyLevel"
                  >{{ difficultyLevel }}</option
                >
              </select>
            </div>
          </form>
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
      title: "",
      description: "",
      difficulty: "",
      checkBox: true,
      technologies: []
    };
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.card {
  margin-bottom: 0px;
  border-bottom: 0.5px rgb(175, 175, 175) solid !important;
}

#searchBar {
  width: 400px;
  margin: 40px auto;
}

.card-header {
  display: flex;
  justify-content: space-around;
}
</style>
