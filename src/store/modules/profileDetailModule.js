// This module concerns the userDetail database entry, and viewing and modification of different user profiles,
// It is split from the userDataModule for clarity purposes

// This module uses the async/await functionality both for training, and optimalization purposes

import * as firebase from "firebase";

const state = {
  viewedProfile: null
};

const mutations = {
  setViewedProfile: (state, userData) => {
    state.viewedProfile = userData;
  },
  resetViewedProfile: state => {
    state.viewedProfile = null;
  }
};

const actions = {
  createUserDetailEntry(context, newUserId) {
    let newUserDetail = {
      id: newUserId,
      language: "undefined_language",
      localisation: "undefined_localisation",
      technologies: [],
      username: "undefined_username",
      description: "undefined_description"
    };
    firebase
      .database()
      .ref("userDetails")
      .child(newUserId)
      .set(newUserDetail)
      .catch(err => alert(err));
  },
  async setViewedProfile({ commit }, userId) {
    // The registeredAdverts entry is stored in a different entry than detailed information, (users/userDetails)
    // hence they both have to be combined in the next operation, so that viewedProfile object
    // will contain all necessary data to be shown in the ProfileDetails.vue component.
    try {
      let userDataArray = await Promise.all([
        firebase
          .database()
          .ref("/users/" + userId)
          .once("value"),
        firebase
          .database()
          .ref("/userDetails/" + userId)
          .once("value")
      ]);
      let userData = { ...userDataArray[0].val(), ...userDataArray[1].val() };
      commit("setViewedProfile", userData);
    } catch (err) {
      alert(err);
    }
  },
  resetViewedProfile({ commit }) {
    commit("resetViewedProfile");
  }
};

export default { state, actions, mutations };
