<template>
  <div id="addition-form" class="container">
    <h1>Add your own advert</h1>
    <form action="" class="needs-validation" novalidate>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <div class="form-group">
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
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="description">Description</label>
          <input
            id="description"
            v-model="description"
            type="text"
            name="description"
            class="form-control is-invalid"
          />
          <div class="invalid-feedback">Well, duck you</div>
        </div>
      </div>
      <label for="level">Level</label>
      <select id="level" v-model="level" name="level" class="form-control">
        <option value="beginner">Easy</option>
        <option value="medium">Medium</option>
        <option value="advanced">Advanced</option>
      </select>
      <div class="form-group">
        <div class="form-check">
          <input
            id="technologies"
            v-model="checkBox"
            type="checkbox"
            class="form-check-input"
          />
          <label for="technologies" class="form-check-label"
            >Choose the technologies you plan to use in your project</label
          >
        </div>
      </div>
      <router-link :to="{ name: 'advertsList' }"
        ><button class="btn btn-primary" @click="submitAdvert">
          Add an advert
        </button></router-link
      >
      <button @click="consoleLogStore">log</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      level: "",
      checkBox: true
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
        id: Math.floor(Math.random() * 100)
      };
      console.log(advert);
      this.$store.dispatch("addNewAdvert", advert);
    },
    consoleLogStore() {
      console.log(this.$store.state.adverts);
    }
  }
};
</script>

<style scoped>
#addition-form {
  background-color: beige;
  margin-top: 50px;
  border-radius: 20%;
  padding: 70px;
}
</style>
