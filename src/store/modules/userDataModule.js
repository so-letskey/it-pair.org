import * as firebase from "firebase";

const state = {
  activeUser: null
};

const mutations = {
  setUser: (state, payload) => {
    state.activeUser = payload;
  },
  addAdvertReferenceToCreatorInStore: (state, payload) => {
    let registeredAdvertsUpdate = [];
    if (state.activeUser.registeredAdverts !== undefined) {
      registeredAdvertsUpdate = state.activeUser.registeredAdverts.slice();
    }
    registeredAdvertsUpdate.push(payload);
    state.activeUser.registeredAdverts = registeredAdvertsUpdate;
  },
  logOut: state => {
    state.activeUser = null;
  }
};

const actions = {
  signUp: ({ commit }, userData) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(data => {
        let newUserId = data.user.uid;
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
  }
};

export default { state, mutations, actions, getters };
