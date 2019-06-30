// This module operates on user state, user entry in database and user authentication.

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
        dispatch("createUserEntry", newUserId);
        dispatch("createUserDetailEntry", newUserId);
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
  async createUserEntry({ commit }, newUserId) {
    let newUser = {
      id: newUserId,
      registeredAdverts: []
    };
    await db
      .collection("users")
      .doc(newUserId)
      .set(newUser);

    commit("setUser", newUser);
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
