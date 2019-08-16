// This module concerns the userPreview database entry, which is used for the userPreview in advert description component

import db from "../../firebase/firebaseInit";

const state = {
  profilePreview: null
};

const mutations = {
  setProfilePreview: (state, userData) => {
    state.profilePreview = userData;
  },
  resetProfilePreview: state => {
    state.profilePreview = null;
  }
};

const actions = {
  setProfilePreview({ commit }, userId) {
    db.collection("userPreview")
      .doc(userId)
      .get()
      .then(userPreview => commit("setProfilePreview", userPreview.data()));
  },
  resetProfilePreview({ commit }) {
    commit("resetProfilePreview");
  }
};

export default { state, actions, mutations };
