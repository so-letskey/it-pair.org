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
        <label for="level">Level</label>
        <select id="level" v-model="level" name="level" class="form-control">
          <option value="beginner">Easy</option>
          <option value="medium">Medium</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div class="form-group">
        <label for="technology-choice"
          >Choose the technologies you plan to use</label
        >
        <Multiselect
          id="technology-choice"
          v-model="value"
          class="multiselect"
          :options="options"
          :multiple="true"
          group-values="libs"
          group-label="language"
          :group-select="false"
          placeholder="Type to search"
          track-by="name"
          label="name"
          ><span slot="noResult"
            >Oops! No elements found. Consider changing the search query.</span
          ></Multiselect
        >
      </div>

      <router-link :to="{ name: 'advertsList' }"
        ><button class="btn btn-primary" @click="submitAdvert">
          Add an advert
        </button></router-link
      >
      <button @click="consoleLogStore">log</button>
    </form>
    <div>
      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import * as firebase from "firebase";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      title: "",
      description: "",
      level: "",
      checkBox: true,
      options: [
        {
          language: "Javascript",
          libs: [{ name: "Vue.js" }, { name: "Adonis" }]
        },
        {
          language: "Ruby",
          libs: [
            { name: "Rails", category: "Backend" },
            { name: "Sinatra", category: "Backend" }
          ]
        },
        {
          language: "Other",
          libs: [
            { name: "Laravel", category: "Backend" },
            { name: "Phoenix", category: "Backend" }
          ]
        }
      ],
      value: []
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
        description: this.description
      };

      firebase
        .database()
        .ref("adverts")
        .push(advert)
        .then(response => {
          advert.id = response.key;
          this.$store.dispatch("addNewAdvert", advert);
        })
        .catch(err => alert(err));
    },
    consoleLogStore() {
      console.log(this.$store.state.adverts);
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
