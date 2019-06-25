// This module operates on user state, user entry in database and user authentication.

import * as firebase from "firebase";

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
        firebase
          .database()
          .ref("/users/" + data.user.uid)
          .once("value")
          .then(res => {
            commit("setUser", res.val());
          })
          .catch(err => alert(err));
      });
  },
  autoSignIn({ commit }, payload) {
    firebase
      .database()
      .ref("/users/" + payload.uid)
      .once("value")
      .then(response => {
        let user = response.val();
        commit("setUser", user);
      });
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
  createUserDetailEntry({ commit }, newUserId) {
    let newUser = {
      id: newUserId,
      registeredAdverts: []
    };
    firebase
      .database()
      .ref("users")
      .child(newUserId)
      .set(newUser)
      .then(function() {
        commit("setUser", newUser);
      })
      .catch(err => alert(err));
  },
  deleteAdvertReferenceFromUser({ commit, state }, deletedAdvert) {
    let registeredAdvertsUpdate = state.activeUser.registeredAdverts.slice();
    registeredAdvertsUpdate = registeredAdvertsUpdate.filter(
      advertId => advertId !== deletedAdvert.id
    );
    firebase
      .database()
      .ref("/users/" + deletedAdvert.creatorsId)
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
