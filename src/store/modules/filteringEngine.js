import db from "../../firebase/firebaseInit";

const state = {
  technologies: [],
  difficulty: [],
  country: [],
  language: []
};

const mutations = {
  setParameters: (state, parameters) => {
    state.technologies = parameters.technologies;
    state.difficulty = parameters.difficulty;
    state.country = parameters.country;
    state.language = parameters.language;
  },
  resetParameters: state => {
    state.technologies = [];
    state.difficulty = [];
    state.country = [];
    state.language = [];
  }
};

const actions = {
  setParameters: ({ commit }, parameters) => {
    commit("setParameters", parameters);
  },
  resetParameters: ({ commit }) => {
    commit("resetParameters");
  },
  loadAdverts: (context, searchParameters) => {
    // The filtering queries in db.collection.where need both paramDatabaseEntryNames
    // (name of entry in database) and paramValue (value we are filtering for).
    // As we have to dinamically populate each request, we do so with the use of
    // the databaseEntryNames object and a for loop
    let databaseEntryNames = {
      difficulty: "difficulty",
      technologies: "technologiesForQuery",
      language: "language",
      country: "country"
    };
    let paramCounter = 0;
    let paramValues = [];
    let paramDatabaseEntryNames = [];

    for (let key in searchParameters) {
      console.log(key);
      if (searchParameters[key].length !== 0) {
        // (length !== 0) means that the user chose a value to filter for
        paramCounter++;
        if (key !== "technologies") {
          paramValues.push(searchParameters[key].name);
          paramDatabaseEntryNames.push(databaseEntryNames[key]);
        }
      }
    }
    if (paramCounter === 0) {
      db.collection("adverts")
        .get()
        .then(querySnapshot => {
          let advertsArray = [];
          querySnapshot.forEach(advert => {
            advertsArray.push(advert.data());
          });
          context.commit("loadAdverts", advertsArray);
        });
    } else if (searchParameters.technologies.length === 0) {
      if (paramCounter === 1) {
        db.collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      } else if (paramCounter === 2) {
        db.collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      } else if (paramCounter === 3) {
        db.collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      }
    } else {
      if (paramCounter === 1) {
        db.collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      } else if (paramCounter === 2) {
        db.collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      } else if (paramCounter === 3) {
        db.collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      } else if (paramCounter === 4) {
        db.collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2])
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            context.commit("loadAdverts", advertsArray);
          });
      }
    }
  }
};

export default { state, mutations, actions };
