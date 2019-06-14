import Vue from "vue";
import App from "./App.vue";

// Router
import VueRouter from "vue-router";
import { routes } from "./routes";

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
    firebase.initializeApp({
      apiKey: "AIzaSyB34MLUkLm7ujthyCLAXKXRvzV_jpjhvr4",
      authDomain: "it-pair.firebaseapp.com",
      databaseURL: "https://it-pair.firebaseio.com",
      projectId: "it-pair",
      storageBucket: "it-pair.appspot.com",
      appId: "1:113512295049:web:9439a28aa30fbd5c"
    });
  },
  mounted() {
    this.$store.dispatch("loadAdverts");
  },
  render: h => h(App)
});
