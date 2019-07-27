<template>
  <div id="addition-form" class="container">
    <h1>Sign Up Form</h1>
    <form action="" class="needs-validation" novalidate>
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
            v-model.trim.lazy="$v.password.$model"
            :class="{ 'is-invalid': $v.password.$error }"
            type="password"
            name="password"
            class="form-control"
          />
          <div v-if="!$v.password.minLength">
            The password must be at least 6 digit long
          </div>
        </div>
        <div class="col-sm-12 col-md-6">
          <label for="repeatedPassword">Repeat the password</label>
          <input
            id="repeatedPassword"
            v-model.trim="$v.repeatedPassword.$model"
            :class="{ 'is-invalid': $v.repeatedPassword.$error }"
            type="password"
            name="repeatedPassword"
            class="form-control"
          />
          <div v-if="$v.repeatedPassword.$error" class="invalid-feedback">
            Passwords must be identical.
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click.prevent="signUp">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      repeatedPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatedPassword: {
      required,
      sameAsPassword: sameAs("password")
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
    signUp() {
      let userData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signUp", userData);
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
