import Vue from "vue";
import Vuex from "vuex";

import advertsModule from "./modules/advertsModule";
import advertOptions from "./modules/advertOptions";
import userDataModule from "./modules/userDataModule";
import profilePreviewModule from "./modules/profilePreviewModule";
import profileDetailModule from "./modules/profileDetailModule";
import profileOptions from "./modules/profileOptions";
import filteringEngine from "./modules/filteringEngine";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    advertsModule,
    advertOptions,
    filteringEngine,
    userDataModule,
    profilePreviewModule,
    profileDetailModule,
    profileOptions
  }
});
