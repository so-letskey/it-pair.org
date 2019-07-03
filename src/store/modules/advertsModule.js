// This is a module responsible for operating on adverts state, and adverts entries in database

import * as firebase from "firebase";
import db from "../../firebase/firebaseInit";

const state = {
  adverts: [],
  activeAdvert: null
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
  },
  setActiveAdvert: (state, advert) => {
    state.activeAdvert = advert;
  },
  deactivateAdvert: state => {
    state.activeAdvert = null;
  }
};

const actions = {
  addNewAdvert: ({ commit }, advert) => {
    // add advert to database
    db.collection("adverts")
      .add(advert)
      .then(response => {
        let id = response.id;
        advert.id = id;
        //add easily accessible id entry
        db.collection("adverts")
          .doc(id)
          .update({ id: id })
          .catch(err => alert(err));
        // add advert reference in creator entry in db
        db.collection("users")
          .doc(advert.creatorsId)
          .update({
            registeredAdverts: firebase.firestore.FieldValue.arrayUnion(id)
          })
          .catch(err => console.log(err));

        commit("addAdvertReferenceToUserInStore", id);
        commit("addNewAdvert", advert);
      });
  },
  editAdvert: ({ commit }, advert) => {
    db.collection("adverts")
      .doc(advert.id)
      .set(advert)
      .then(function() {
        commit("updateAdvertsInStore", advert);
      })
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
  loadAdverts: (context, searchParameters) => {
    db.collection("adverts")
      .where(
        "technologiesForQuery",
        "array-contains",
        searchParameters.technologies.name
      )
      .where("difficulty", "==", searchParameters.difficulty)
      .get()
      .then(querySnapshot => {
        let advertsArray = [];
        querySnapshot.forEach(advert => {
          advertsArray.push(advert.data());
        });
        context.state.adverts = advertsArray;
      });
  },
  setActiveAdvert: ({ commit }, advertId) => {
    db.collection("adverts")
      .doc(advertId)
      .get()
      .then(advert => commit("setActiveAdvert", advert.data()));
  },
  deactivateAdvert: ({ commit }) => {
    commit("deactivateAdvert");
  }
};

const getters = {
  activeAdvert: state => {
    if (state.activeAdvert === null) return {};
    else return state.activeAdvert;
  }
};

export default { state, mutations, actions, getters };
