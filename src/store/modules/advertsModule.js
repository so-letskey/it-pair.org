// This is a module responsible for operating on adverts state, and adverts entries in database

import * as firebase from "firebase";

const state = {
  adverts: []
};

const mutations = {
  addNewAdvert: (state, payload) => {
    state.adverts.push(payload);
  },
  updateAdvertsInStore: (state, payload) => {
    let newAdvertList = state.adverts.filter(
      advert => advert.id !== payload.id
    );
    newAdvertList.push(payload);
    state.adverts = newAdvertList;
  },
  deleteAdvertFromStore: (state, deletedAdvertId) => {
    let newAdvertList = state.adverts.filter(
      advert => advert.id !== deletedAdvertId
    );
    state.adverts = newAdvertList;
  }
};

const actions = {
  addNewAdvert: ({ commit, getters }, advert) => {
    // add advert to database
    firebase
      .database()
      .ref("adverts")
      .push(advert)
      .then(response => {
        let id = response.key;
        advert.id = id;
        // add advert reference in creator entry in database
        firebase
          .database()
          .ref("/users/" + advert.creatorsId)
          .update({
            registeredAdverts: [
              ...getters.activeUserRegisteredAdverts,
              response.key
            ]
          });
        commit("addAdvertReferenceToCreatorInStore", id);
        commit("addNewAdvert", advert);
      })
      .catch(err => alert(err));
  },
  editAdvert: ({ commit }, advert) => {
    firebase
      .database()
      .ref("/adverts/" + advert.id)
      .set(advert)
      .then(function() {
        commit("updateAdvertsInStore", advert);
      })
      .catch(err => alert(err));
  },
  deleteAdvert: ({ commit, dispatch }, advert) => {
    firebase
      .database()
      .ref("/adverts/" + advert.id)
      .remove()
      .then(function() {
        commit("deleteAdvertFromStore", advert.id);
        dispatch("deleteAdvertReferenceInUser", advert);
      })
      .catch(err => alert(err));
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
};

export default { state, mutations, actions };
