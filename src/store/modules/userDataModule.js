import * as firebase from "firebase";

const state = {
  activeUser: null
};

const mutations = {
  setUser: (state, payload) => {
    state.activeUser = payload;
  }
};

const actions = {
  signUp: ({ commit }, userData) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        let newUser = {
          id: data.user.uid,
          registeredAdverts: ["-LhPqljbaGAFRpIB8Ehu"]
        };
        commit("setUser", newUser);
      })
      .catch(err => alert(err));
  },
  signIn: ({ commit }, userData) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        let newUser = {
          id: data.user.uid,
          registeredAdverts: []
        };
        commit("setUser", newUser);
      })
      .catch(err => alert(err));
  }
};

const getters = {
  activeUser(state) {
    return state.activeUser;
  }
};

export default { state, mutations, actions, getters };
