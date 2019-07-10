import db from "../../firebase/firebaseInit";

const state = {
  technologies: [],
  difficulty: "",
  country: [],
  language: []
};

const mutations = {
  setParameters: (state, parameters) => {
    state.technologies = parameters.technologies;
    state.difficulty = parameters.difficulty;
  },
  resetParameters: state => {
    state.technologies = [];
    state.difficulty = "";
  }
};

const actions = {
  setParameters: ({ commit }, parameters) => {
    commit("setParameters", parameters);
  },
  resetParameters: ({ commit }) => {
    commit("resetParameters");
  }
};

export default { state, mutations, actions };
