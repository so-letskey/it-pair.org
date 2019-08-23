import * as firebase from "firebase";
import db from "../../firebase/firebaseInit";

const state = {
  imageLoading: false,
  imageUploadedToClient: false,
  imageUploadedToServer: false
};

const mutations = {
  imageUploadedToClient: state => {
    state.imageUploadedToClient = true;
    state.imageUploadedToServer = false;
  },
  startImageLoading: state => {
    state.imageLoading = true;
    state.imageUploadedToServer = false;
  },
  imageUploadedSuccessfully: state => {
    state.imageLoading = false;
    state.imageUploadedToClient = false;
    state.imageUploadedToServer = true;
  },
  resetImageUpload: state => {
    state.imageLoading = false;
    state.imageUploadedToClient = false;
    state.imageUploadedToServer = false;
  }
};

const actions = {
  uploadInitiated(context) {
    context.commit("uploadInitiated");
  },
  imageUploadedToClient(context) {
    context.commit("imageUploadedToClient");
  },
  editImage(context, payload) {
    context.commit("startImageLoading");
    const filename = payload.image.name;
    const ext = filename.slice(filename.lastIndexOf("."));
    firebase
      .storage()
      .ref("users/" + payload.id + "." + ext)
      .put(payload.image)
      .then(fileData => {
        return fileData.ref.getDownloadURL();
      })
      .then(downloadUrl => {
        return db
          .collection("userPreview")
          .doc(payload.id)
          .update({ imageUrl: downloadUrl });
      })
      .then(function() {
        context.commit("imageUploadedSuccessfully");
      })
      .catch(err => alert(err));
  },
  resetImageUpload(context) {
    context.commit("resetImageUpload");
  }
};

export default { state, actions, mutations };
