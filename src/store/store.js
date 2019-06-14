import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    adverts: []
  },
  mutations: {
    addNewAdvert: (state, payload) => {
      state.adverts.push(payload);
    }
  },
  actions: {
    addNewAdvert: (context, payload) => {
      context.commit("addNewAdvert", payload);
    },
    loadAdverts: context => {
      firebase
        .database()
        .ref("adverts")
        .once("value")
        .then(data => {
          let advertsArray = [];
          let tempData = data.val();
          for (let key in tempData) {
            let tempObj = tempData[key];
            tempObj.id = key;
            advertsArray.push(tempObj);
          }
          context.state.adverts = advertsArray;
        });
    }
  }
});
