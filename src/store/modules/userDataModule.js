import * as firebase from "firebase";

const state = {
  activeUser: null
};

const mutations = {
  setUser: (state, payload) => {
    state.activeUser = payload;
  },
  addAdvertReferenceToCreatorInStore: (state, payload) => {
    let registeredAdvertsUpdate = state.activeUser.registeredAdverts.slice();
    registeredAdvertsUpdate.push(payload);
    state.activeUser.registeredAdverts = registeredAdvertsUpdate;
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
          .catch(err => alert("inside firebase2 signUp" + err));
      })
      .catch(err => alert("inside user dataModule: " + err));
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
