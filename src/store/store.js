import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    adverts: [
      { title: "Mario-like game", description: "Great fun" },
      { title: "Nice Website", description: "For fun and for money" }
    ]
  }
});
