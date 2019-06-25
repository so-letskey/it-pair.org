// This module concerns viewing and modification of different user profiles
// It is split from the userDataModule for clarity purposes

import * as firebase from "firebase";

const state = {
  viewedProfile: null
};

const actions = {
  async setViewedProfile({ commit }, userId) {
    let response = await firebase
      .database()
      .ref("/users/" + userId)
      .once("value");

    console.log(response);
    // .then(response => {
    //     let profileDetails = response.val();
    //     commit("setViewedProfileDetails", profileDetails);
    // })
  }
};

export default { state, actions };
