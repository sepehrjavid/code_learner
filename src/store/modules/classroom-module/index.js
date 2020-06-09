import axios from "axios";

const state = {
  searchedClassrooms: []
};

const mutations = {
  setSearchedClassrooms(state, payload) {
    state.searchedClassrooms = payload;
  }
};


const actions = {
  deactivate(context, id) {
    return axios.delete("http://127.0.0.1:8000/api/classrooms/deactivate/" + id.toString()).then((response) => {
      context.commit('auth/removeDeactivatedClass', id, {root: true});
    })
  },
  searchForClassrooms(context, query) {
    return axios.get(
      "http://127.0.0.1:8000/api/classrooms/list",
      {
        params: {
          q: query
        }
      }).then((response) => {
      context.commit('setSearchedClassrooms', response.data)
    })
  }
};


const getters = {
  getSearchedClasses: (state) => {
    return state.searchedClassrooms
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
