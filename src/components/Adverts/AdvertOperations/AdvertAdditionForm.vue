<template>
  <div id="addition-form" class="container">
    <h1>Add your own advert</h1>
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
            >{{ difficultyLevel }}</option
          >
        </select>
      </div>
      <div class="form-group">
        <label for="technology-choice"
          >Choose the technologies you plan to use</label
        >
        <Multiselect
          id="technology-choice"
          v-model="technologies"
          class="multiselect"
          :options="this.$store.state.advertOptions.technologies"
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
    <div>
      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      title: "",
      description: "",
      difficulty: "",
      checkBox: true,
      technologies: []
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
      let advert = {
        title: this.title,
        description: this.description,
        difficulty: this.difficulty,
        technologies: this.technologies,
        creatorsId: this.$store.getters.activeUserId
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
