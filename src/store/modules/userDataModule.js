// The state in this module (activeUser) is responsible for investigating what kinds
// of actions are allowed for user to do (change the adverts, delete them, edit profile)
// As this data is constantly used across the website, and does not need other details of the profile
// the database entry for userBasic is separate from the rest

import * as firebase from "firebase";
import db from "../../firebase/firebaseInit";

const state = {
  activeUser: null
};

const mutations = {
  setUser: (state, payload) => {
    state.activeUser = payload;
  },
  logOut: state => {
    state.activeUser = null;
  },
  addAdvertReferenceToUserInStore: (state, payload) => {
    let registeredAdvertsUpdate = [];
    //firebase does not allow empty arrays, hence condition below
    if (state.activeUser.registeredAdverts !== undefined) {
      registeredAdvertsUpdate = state.activeUser.registeredAdverts.slice();
    }
    registeredAdvertsUpdate.push(payload);
    state.activeUser.registeredAdverts = registeredAdvertsUpdate;
  },
  deleteAdvertReferenceFromUserInStore: (state, registeredAdvertsUpdate) => {
    state.activeUser.registeredAdverts = registeredAdvertsUpdate;
  }
};

const actions = {
  signUp: ({ dispatch }, userData) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        let newUserId = data.user.uid;
        dispatch("createNewUserEntries", newUserId);
      })
      .catch(err => alert(err));
  },
  signIn: ({ commit }, userData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        db.collection("users")
          .doc(data.user.uid)
          .get()
          .then(res => commit("setUser", res.data()))
          .catch(err => alert(err));
      });
  },
  autoSignIn({ commit }, payload) {
    db.collection("users")
      .doc(payload.uid)
      .get()
      .then(res => {
        let user = res.data();
        commit("setUser", user);
      })
      .catch(err => alert(err));
  },
  logOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        commit("logOut");
      })
      .catch(err => alert(err));
  },
  deleteAdvertReferenceFromUser({ commit, state }, deletedAdvert) {
    let registeredAdvertsUpdate = state.activeUser.registeredAdverts.slice();
    registeredAdvertsUpdate = registeredAdvertsUpdate.filter(
      advertId => advertId !== deletedAdvert.id
    );
    db.collection("users")
      .doc(deletedAdvert.creatorsId)
      .update({ registeredAdverts: registeredAdvertsUpdate })
      .then(function() {
        commit("deleteAdvertReferenceFromUserInStore", registeredAdvertsUpdate);
      });
  }
};

const getters = {
  activeUserRegisteredAdverts: state => {
    if (state.activeUser !== null) {
      if (state.activeUser.registeredAdverts)
        return state.activeUser.registeredAdverts;
      else return [];
    }
  },
  activeUserId: state => {
    if (state.activeUser !== null) return state.activeUser.id;
  },
  userIsSignedIn: state => {
    if (state.activeUser !== null) {
      return true;
    } else return false;
  }
};

export default { state, mutations, actions, getters };
