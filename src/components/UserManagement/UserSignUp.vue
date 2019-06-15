<template>
  <div id="addition-form" class="container">
    <h1>Sign Up Form</h1>
    <form action="" class="needs-validation" novalidate>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="title">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            class="form-control"
            required
          />
          <div class="valid-feedback">It works</div>
        </div>

        <div class="col-sm-12 col-md-6">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="text"
            name="password"
            class="form-control"
          />
          <div class="invalid-feedback">Well, duck you</div>
        </div>
      </div>
      <router-link :to="{ name: 'advertsList' }"
        ><button class="btn btn-primary" @click="signUp">
          Sign Up
        </button></router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      let emailData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signUp", emailData);
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

.form-group {
  margin-bottom: 15px;
}
</style>
