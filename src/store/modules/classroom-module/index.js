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
      context.commit('profile/removeDeactivatedClass', id, {root: true});
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
      context.commit('profile/addCreatedClass', response.data, {root: true});
    })
  },
  addOwnerToClass(context, payload) {
    return axios.put("http://127.0.0.1:8000/api/classrooms/add_owner/" + payload.id.toString(), payload.body).then((response) => {
      context.commit('profile/updateOtherOwners', response.data, {root: true});
    }).catch((error) => {
      throw error.response.data.other_owners
    })
  },
  editClass(context, payload) {
    return axios.put(
      "http://127.0.0.1:8000/api/classrooms/edit/" + payload.id.toString(),
      payload.body
    ).then((response) => {
      context.commit('profile/updateNameDescription', response.data, {root: true});
    }).catch((error) => {
      if (error.response.data.name !== undefined) {
        throw error.response.data.name;
      } else if (error.response.data.description !== undefined) {
        throw error.response.data.description;
      }
    })
  },
  toggleEnrolled(context, id) {
    return axios.get("http://127.0.0.1:8000/api/classrooms/toggle_enrolled/" + id.toString()).then((response) => {
      context.commit('profile/toggleEnrolledClasses', {body: response.data, id: id}, {root: true});
    })
  },
  quitOwnership(context, id) {
    return axios.delete("http://127.0.0.1:8000/api/classrooms/quit_ownership/" + id.toString()).then((response) => {
      context.commit('profile/removeOwnership', id, {root: true});
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
