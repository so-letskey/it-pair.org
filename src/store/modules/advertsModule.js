// This module is responsible for operating on adverts state, and adverts entries in database

import * as firebase from "firebase";
import db from "../../firebase/firebaseInit";

const state = {
  adverts: [],
  activeAdvert: null
};

const mutations = {
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
  },
  setActiveAdvert: (state, advert) => {
    state.activeAdvert = advert;
  },
  deactivateAdvert: state => {
    state.activeAdvert = null;
  },
  loadAdverts: (state, adverts) => {
    state.adverts = adverts;
  },
  resetAdverts: state => {
    state.adverts = [];
  }
};

const actions = {
  addNewAdvert: ({ commit }, advert) => {
    // add advert to database
    db.collection("adverts")
      .add(advert)
      .then(response => {
        let id = response.id;
        //add easily accessible id entry
        db.collection("adverts")
          .doc(id)
          .update({
            id: id
          })
          .catch(err => alert(err));
        // add advert reference in creator entry in db
        db.collection("users")
          .doc(advert.creatorsId)
          .update({
            registeredAdverts: firebase.firestore.FieldValue.arrayUnion(id)
          })
          .catch(err => alert(err));

        commit("addAdvertReferenceToUserInStore", id);
      });
  },
  editAdvert: (context, advert) => {
    db.collection("adverts")
      .doc(advert.id)
      .update(advert)
      .catch(err => alert(err));
  },
  deleteAdvert: ({ commit, dispatch }, advert) => {
    db.collection("adverts")
      .doc(advert.id)
      .delete()
      .then(function() {
        commit("deleteAdvertFromStore", advert.id);
        dispatch("deleteAdvertReferenceFromUser", advert);
      })
      .catch(err => alert(err));
  },
  setActiveAdvert: ({ commit }, advertId) => {
    db.collection("adverts")
      .doc(advertId)
      .get()
      .then(advert => commit("setActiveAdvert", advert.data()));
  },
  deactivateAdvert: ({ commit }) => {
    commit("deactivateAdvert");
  },
  resetAdverts: ({ commit }) => {
    commit("resetAdverts");
  }
};

const getters = {
  activeAdvert: state => {
    if (state.activeAdvert === null) return {};
    else return state.activeAdvert;
  }
};

export default { state, mutations, actions, getters };
