import axios from 'axios';

const state = {
  userData: {}
};

const mutations = {
  setUserData(state, payload) {
    state.userData = payload
  },
  setFirstNameAndLastName(state, payload) {
    state.userData.fisrt_name = payload.first_name;
    state.userData.last_name = payload.last_name
  },
  removeDeactivatedClass(state, payload) {
    state.userData.created_classes = state.userData.created_classes.filter((classroom) => {
      return classroom.id !== payload;
    })
  },
  addCreatedClass(state, payload) {
    state.userData.created_classes.push({
      id: payload.id,
      creator: payload.creator,
      description: payload.description,
      name: payload.name,
      other_owners: payload.other_owners_data,
      is_online: false
    })
  },
  updateOtherOwners(state, payload) {
    state.userData.created_classes.forEach((classroom) => {
      if (classroom.id === payload.id) {
        classroom.other_owners = payload.other_owners;
      }
    })
  },
  updateNameDescription(state, payload){
    state.userData.created_classes.forEach((classroom) => {
      if (classroom.id === payload.id) {
        classroom.name = payload.name;
        classroom.description = payload.description;
      }
    })
  }
};


const actions = {
  fetchUserData(context) {
    return axios.get("http://127.0.0.1:8000/api/accounting/get_user_info").then((response) => {
      context.commit('setUserData', response.data);
      return response.data
    }).catch((response) => {
      context.dispatch('logout');
    })
  },
  editUser(context, payload) {
    return axios.put("http://127.0.0.1:8000/api/accounting/edit", payload).then((response) => {
      context.commit('setFirstNameAndLastName', payload)
    })
  },
  changePassword(context, payload) {
    return axios.post("http://127.0.0.1:8000/api/accounting/change_password", payload).catch((error) => {
      throw error.response.data
    })
  }
};


const getters = {
  getUserData: (state) => {
    return state.userData
  },
  isUserFetched: (state) => {
    return Object.keys(state.userData).length !== 0
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
