import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    adverts: [],
    signedUp: false
  },
  mutations: {
    addNewAdvert: (state, payload) => {
      state.adverts.push(payload);
    },
    signUp: state => {
      state.signedUp = true;
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
    },
    signUp: ({ commit }, userData) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, userData.password)
        .then(data => commit("signUp"))
        .catch(err => alert(err));
    }
  }
});
