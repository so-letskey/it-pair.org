import db from "../../firebase/firebaseInit";

const state = {
  loading: false,
  //Search parameters
  technologies: null,
  difficulty: null,
  country: null,
  language: null,
  //Paginating
  initialSearch: true,
  lastVisibleResult: undefined
};

const getters = {
  searchParameters: state => {
    let searchParameters = {
      technologies: state.technologies,
      difficulty: state.difficulty,
      country: state.country,
      language: state.language
    };
    return searchParameters;
  }
};

const mutations = {
  //Parameters
  saveParameters: (state, parameters) => {
    state.technologies = parameters.technologies;
    state.difficulty = parameters.difficulty;
    state.country = parameters.country;
    state.language = parameters.language;
  },
  resetParameters: state => {
    state.technologies = null;
    state.difficulty = null;
    state.country = null;
    state.language = null;
  },
  //Loading
  loadingStarted: state => {
    state.loading = true;
  },
  loadingFinished: state => {
    state.loading = false;
  },
  //Paginating
  setLastVisibleResult: (state, lastVisibleResult) => {
    state.lastVisibleResult = lastVisibleResult;
    state.initialSearch = false;
  },
  resetSearchStatus: state => {
    state.lastVisibleResult = undefined;
    state.initialSearch = true;
  }
};

const actions = {
  saveParameters: ({ commit }, parameters) => {
    commit("saveParameters", parameters);
  },
  resetParameters: ({ commit }) => {
    commit("resetParameters");
  },
  loadAdverts: (context, searchParameters) => {
    // The filtering queries in db.collection.where need both paramDatabaseEntryNames
    // (name of entry in database) and paramValue (value we are filtering for).
    // As we have to dinamically populate each request, we do so with the use of
    // the databaseEntryNames object and a for loop
    context.commit("loadingStarted");
    //Static variables
    const pageLimit = 2;
    let databaseEntryNames = {
      difficulty: "difficulty",
      technologies: "technologiesForQuery",
      language: "language",
      country: "country"
    };
    //Dynamic variables
    let paramCounter = 0;
    let paramValues = [];
    let paramDatabaseEntryNames = [];

    for (let key in searchParameters) {
      if (searchParameters[key] !== null) {
        paramCounter++;
        //We separate paramValues from technologies, as later on they use different firestore
        //query methods ('array-contains' and '==')
        if (key !== "technologies") {
          paramValues.push(searchParameters[key].name);
          paramDatabaseEntryNames.push(databaseEntryNames[key]);
        }
      }
    }
    if (context.state.initialSearch) {
      if (paramCounter === 0) {
        db.collection("adverts")
          .orderBy("creationDate", "desc")
          .limit(pageLimit)
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            let lastVisibleResult =
              querySnapshot.docs[querySnapshot.docs.length - 1];
            context.dispatch("setLastVisibleResult", lastVisibleResult);
            context.dispatch("finishFiltering", advertsArray);
          });
      } else if (searchParameters.technologies === null) {
        if (paramCounter === 1) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 2) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .where(paramDatabaseEntryNames[1], "==", paramValues[1])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 3) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .where(paramDatabaseEntryNames[1], "==", paramValues[1])
            .where(paramDatabaseEntryNames[2], "==", paramValues[2])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 2) {
          db.collection("adverts")
            .where(
              "technologiesForQuery",
              "array-contains",
              searchParameters.technologies.name
            )
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        }
      }
    } else if (context.state.lastVisibleResult) {
      if (paramCounter === 0) {
        db.collection("adverts")
          .orderBy("creationDate", "desc")
          .startAfter(context.state.lastVisibleResult)
          .limit(pageLimit)
          .get()
          .then(querySnapshot => {
            let advertsArray = [];
            querySnapshot.forEach(advert => {
              advertsArray.push(advert.data());
            });
            let lastVisibleResult =
              querySnapshot.docs[querySnapshot.docs.length - 1];
            context.dispatch("setLastVisibleResult", lastVisibleResult);
            context.dispatch("finishFiltering", advertsArray);
          });
      } else if (searchParameters.technologies === null) {
        if (paramCounter === 1) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 2) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .where(paramDatabaseEntryNames[1], "==", paramValues[1])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 3) {
          db.collection("adverts")
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .where(paramDatabaseEntryNames[1], "==", paramValues[1])
            .where(paramDatabaseEntryNames[2], "==", paramValues[2])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        } else if (paramCounter === 2) {
          db.collection("adverts")
            .where(
              "technologiesForQuery",
              "array-contains",
              searchParameters.technologies.name
            )
            .where(paramDatabaseEntryNames[0], "==", paramValues[0])
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
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
            .orderBy("creationDate", "desc")
            .limit(pageLimit)
            .get()
            .then(querySnapshot => {
              let advertsArray = [];
              querySnapshot.forEach(advert => {
                advertsArray.push(advert.data());
              });
              context.dispatch("finishFiltering", advertsArray);
            });
        }
      }
    } else {
      context.dispatch("finishFiltering");
    }
  },
  setLastVisibleResult: (context, lastVisibleResult) => {
    context.commit("setLastVisibleResult", lastVisibleResult);
  },
  finishFiltering: (context, advertsArray) => {
    context.commit("loadingFinished");
    //checks if any data was passed. If not, simply finishes search
    if (advertsArray) {
      if (context.state.initialSearch) {
        context.commit("loadAdverts", advertsArray);
      } else {
        context.commit("appendAdverts", advertsArray);
      }
    }
  },
  resetSearch: context => {
    context.commit("resetSearchStatus");
    context.commit("resetAdverts");
  }
};

export default { state, getters, mutations, actions };
