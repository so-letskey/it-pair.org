import * as firebase from "firebase";

const state = {
  adverts: []
};

const mutations = {
  addNewAdvert: (state, payload) => {
    state.adverts.push(payload);
  }
};

const actions = {
  addNewAdvert: (context, payload) => {
    context.commit("addNewAdvert", payload);
  },
  loadAdverts: context => {
    firebase
      .database()
      .ref("adverts")
      .once("value")
      .then(data => {
        let advertsArray = [];
        let tempData = data.val();
        for (let key in tempData) {
          let tempObj = tempData[key];
          tempObj.id = key;
          advertsArray.push(tempObj);
        }
        context.state.adverts = advertsArray;
      });
  }
};

export default { state, mutations, actions };
