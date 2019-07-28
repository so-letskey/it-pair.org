<template>
  <div id="addition-form" class="container">
    <h1>Sign In Form</h1>
    <form action="" @submit.prevent>
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <label for="title">Email</label>
          <input
            id="email"
            v-model.trim.lazy="$v.email.$model"
            :class="{ 'is-invalid': $v.email.$error }"
            type="text"
            name="email"
            class="form-control"
          />
          <div class="valid-feedback">It works</div>
          <div class="invalid-feedback">Enter a valid email adress</div>
        </div>

        <div class="col-sm-12 col-md-6">
          <label for="password">Password</label>
          <input
            id="password"
            v-model.trim="$v.password.$model"
            :class="{ 'is-invalid': $v.password.$error }"
            type="password"
            name="password"
            class="form-control"
          />
          <div class="invalid-feedback">Enter your password</div>
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="signIn">
        Sign In
      </button>
    </form>
    <br />
    Don't have an account yet?
    <router-link :to="{ name: 'userSignUp' }"
      ><button class="btn btn-primary">
        Sign Up
      </button>
    </router-link>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    activeUser() {
      return this.$store.state.userDataModule.activeUser;
    }
  },
  watch: {
    activeUser(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    signIn() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let userData = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("signIn", userData);
      }
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

.form-input--error {
  color: red;
}
</style>
