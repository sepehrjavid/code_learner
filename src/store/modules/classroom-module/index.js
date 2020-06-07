import axios from "axios";

const state = {};

const mutations = {

};


const actions = {
  deactivate(context, id) {
    return axios.delete("http://127.0.0.1:8000/api/classrooms/deactivate/" + id.toString()).then((response) => {
      context.commit('auth/removeDeactivatedClass', id, {root: true});
    })
  }
};


const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
