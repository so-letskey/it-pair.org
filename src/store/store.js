import Vue from "vue";
import Vuex from "vuex";

import advertsModule from "./modules/advertsModule";
import advertOptions from "./modules/advertOptions";
import userDataModule from "./modules/userDataModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    advertsModule,
    advertOptions,
    userDataModule
  }
});
