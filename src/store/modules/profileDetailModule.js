// This module concerns the userDetail database entry, and viewing and modification of different user profiles,
// It is split from the userDataModule for clarity purposes

// This module uses the async/await functionality both for training, and optimalization purposes
import * as firebase from "firebase";
import db from "../../firebase/firebaseInit";

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
      technologies: [],
      username: "undefined_username",
      description: "undefined_description"
    };
    db.collection("userDetails")
      .doc(newUserId)
      .set(newUserDetail)
      .catch(err => alert(err));
  },
  async setViewedProfile({ commit }, userId) {
    // The registeredAdverts entry is stored in a different entry than detailed information, (users / userDetails)
    // hence they both have to be combined in the next operation, so that viewedProfile object
    // will contain all necessary data to be shown in the ProfileDetails.vue component.
    try {
      let [userBasic, userDetails] = await Promise.all([
        db
          .collection("users")
          .doc(userId)
          .get(),
        db
          .collection("userDetails")
          .doc(userId)
          .get()
      ]);
      let userData = { ...userBasic.data(), ...userDetails.data() };
      commit("setViewedProfile", userData);
    } catch (err) {
      alert(err);
    }
  },
  resetViewedProfile({ commit }) {
    commit("resetViewedProfile");
  },
  editProfile(context, payload) {
    let profileDetails = payload.profileDetails;
    //Image handling
    const filename = payload.image.name;
    const ext = filename.slice(filename.lastIndexOf("."));
    //First we upload the image, and then upload updated object
    //profileDetails with imageUrl
    firebase
      .storage()
      .ref("users/" + profileDetails.id + "." + ext)
      .put(payload.image)
      .then(fileData => {
        return fileData.ref.getDownloadURL();
      })
      .then(downloadUrl => {
        profileDetails.imageUrl = downloadUrl;
        return db
          .collection("userDetails")
          .doc(profileDetails.id)
          .update(profileDetails);
      })
      .catch(err => alert(err));
  }
};

export default { state, actions, mutations };
