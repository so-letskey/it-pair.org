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
  addNewAdvert: ({ commit, getters }, advert) => {
    // add advert to database
    firebase
      .database()
      .ref("adverts")
      .push(advert)
      .then(response => {
        let id = response.key;
        advert.id = id;
        // add advert reference in creator object in database
        firebase
          .database()
          .ref("/users/" + advert.creatorsId)
          .update({
            registeredAdverts: [
              ...getters.activeUserRegisteredAdverts,
              response.key
            ]
          });
        commit("addAdvertReferenceToCreatorInStore", id);
        commit("addNewAdvert", advert);
      })
      .catch(err => alert(err));
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
