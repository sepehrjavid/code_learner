import axios from "axios";

const state = {
  searchedClassrooms: [],
  searchedUsers: []
};

const mutations = {
  setSearchedClassrooms(state, payload) {
    state.searchedClassrooms = payload;
  },
  setSearchedUsers(state, payload) {
    state.searchedUsers = payload
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
  },
  searchForUser(context, query) {
    return axios.get("http://127.0.0.1:8000/api/accounting/user_list",
      {
        params: {
          q: query
        }
      }).then((response) => {
      context.commit('setSearchedUsers', response.data)
    })
  },
  createClass(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/classrooms/create", payload).catch((error) => {
      throw error.response.data.name
    }).then((response) => {
      context.commit('auth/addCreatedClass', response.data, {root: true});
    })
  }
};


const getters = {
  getSearchedClasses: (state) => {
    return state.searchedClassrooms
  },
  getSearchedUsers: (state) => {
    return state.searchedUsers
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
