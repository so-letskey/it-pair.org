import db from "../../firebase/firebaseInit";

const state = {
  loading: false,
  //Search parameters
  technologies: null,
  difficulty: null,
  country: null,
  city: null,
  language: null,
  //Paginating
  initialSearch: true,
  lastVisibleResult: undefined,
  //One of these is shown in case of no Results AT ALL to display,
  //the other when there is nothing more to append while scrolling the page
  noResultsToDisplay: false,
  noResultsLeftToDisplay: false
};

const getters = {
  searchParameters: state => {
    let searchParameters = {
      technologies: state.technologies,
      difficulty: state.difficulty,
      country: state.country,
      city: state.city,
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
    state.city = parameters.city;
    state.language = parameters.language;
  },
  resetParameters: state => {
    state.technologies = null;
    state.difficulty = null;
    state.country = null;
    state.city = null;
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
    state.noResultsToDisplay = false;
    state.noResultsLeftToDisplay = false;
  },
  noResultsToDisplay: state => {
    state.noResultsToDisplay = true;
  },
  noResultsLeftToDisplay: state => {
    state.noResultsLeftToDisplay = true;
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
    let databaseEntryNames = {
      difficulty: "difficulty",
      technologies: "technologiesForQuery",
      language: "language",
      country: "country",
      city: "city"
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
    if (paramCounter === 0) {
      let searchQuery = db.collection("adverts");
      context.dispatch("manageSearchQuery", searchQuery);
    } else if (searchParameters.technologies === null) {
      if (paramCounter === 1) {
        let searchQuery = db
          .collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 2) {
        let searchQuery = db
          .collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 3) {
        let searchQuery = db
          .collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 4) {
        let searchQuery = db
          .collection("adverts")
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2])
          .where(paramDatabaseEntryNames[3], "==", paramValues[3]);
        context.dispatch("manageSearchQuery", searchQuery);
      }
    } else {
      if (paramCounter === 1) {
        let searchQuery = db
          .collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          );
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 2) {
        let searchQuery = db
          .collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 3) {
        let searchQuery = db
          .collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 4) {
        let searchQuery = db
          .collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2]);
        context.dispatch("manageSearchQuery", searchQuery);
      } else if (paramCounter === 5) {
        let searchQuery = db
          .collection("adverts")
          .where(
            "technologiesForQuery",
            "array-contains",
            searchParameters.technologies.name
          )
          .where(paramDatabaseEntryNames[0], "==", paramValues[0])
          .where(paramDatabaseEntryNames[1], "==", paramValues[1])
          .where(paramDatabaseEntryNames[2], "==", paramValues[2])
          .where(paramDatabaseEntryNames[3], "==", paramValues[3]);
        context.dispatch("manageSearchQuery", searchQuery);
      }
    }
  },
  manageSearchQuery: (context, searchQuery) => {
    let paginationLimit = 2;
    if (context.state.initialSearch) {
      searchQuery
        .orderBy("creationDate", "desc")
        .limit(paginationLimit)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size === 0) {
            context.commit("noResultsToDisplay");
            context.commit("loadingFinished");
          } else {
            context.dispatch("manageSearchResults", querySnapshot);
            if (querySnapshot.size < paginationLimit) {
              context.commit("noResultsLeftToDisplay");
            }
          }
        });
    } else if (context.state.lastVisibleResult) {
      searchQuery
        .orderBy("creationDate", "desc")
        .startAfter(context.state.lastVisibleResult)
        .limit(paginationLimit)
        .get()
        .then(querySnapshot => {
          context.dispatch("manageSearchResults", querySnapshot);
          if (querySnapshot.size < paginationLimit) {
            context.commit("noResultsLeftToDisplay");
          }
        });
    } else {
      context.dispatch("finishSearch");
    }
  },
  manageSearchResults: (context, querySnapshot) => {
    let advertsArray = [];
    querySnapshot.forEach(advert => {
      advertsArray.push(advert.data());
    });
    let lastVisibleResult = querySnapshot.docs[querySnapshot.docs.length - 1];
    context.dispatch("setLastVisibleResult", lastVisibleResult);
    context.dispatch("finishSearch", advertsArray);
  },
  setLastVisibleResult: (context, lastVisibleResult) => {
    context.commit("setLastVisibleResult", lastVisibleResult);
  },
  finishSearch: (context, advertsArray) => {
    context.commit("loadingFinished");
    //Checks if any data was passed. If not, dispatches a command to display info for the user.
    if (advertsArray) {
      if (context.state.initialSearch) {
        context.commit("loadAdverts", advertsArray);
      } else {
        context.commit("appendAdverts", advertsArray);
      }
    } else {
      //No results left to show
      context.commit("noResultsLeftToDisplay");
    }
  },
  resetSearch: context => {
    context.commit("resetSearchStatus");
    context.commit("resetAdverts");
  }
};

export default { state, getters, mutations, actions };
