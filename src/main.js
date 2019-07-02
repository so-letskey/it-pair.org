import Vue from "vue";
import App from "./App.vue";

// Router
import VueRouter from "vue-router";
import { routes } from "./router/routes";

// Store setup
import { store } from "./store/store";

import VueResource from "vue-resource";

// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as firebase from "firebase";

Vue.use(VueRouter);
Vue.use(VueResource);

export const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#app",
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  mounted() {
    this.$store.dispatch("loadAdverts");
  },
  render: h => h(App)
});
