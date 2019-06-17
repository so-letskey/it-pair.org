import Vue from "vue";
import Vuex from "vuex";

import advertsModule from "./modules/advertsModule";
import userDataModule from "./modules/userDataModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    advertsModule,
    userDataModule
  }
});
