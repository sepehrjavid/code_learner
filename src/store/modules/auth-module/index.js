import axios from 'axios';

const state = {
  token: localStorage.getItem("LearnOnlineToken") || '',
  userData: null
};

const mutations = {
  login(state, token) {
    state.token = token
  },
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
  }
};


const actions = {
  login(context, payload) {
    return axios.post(
      "http://127.0.0.1:8000/api/accounting/login",
      payload
    ).then((response) => {
        let token = response.data.token;
        context.commit('login', token);
        localStorage.setItem("LearnOnlineToken", 'JWT ' + token);
        axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
      }
    )
  },
  signup(context, payload) {
    return axios.post(
      "http://127.0.0.1:8000/api/accounting/signup",
      payload
    ).then((response) => {
      let token = response.data.token;
      context.commit('login', token);
      localStorage.setItem("LearnOnlineToken", 'JWT ' + token);
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    });
  },
  logout(context) {
    context.commit('login', null);
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem("LearnOnlineToken");
    this.$router.push({name: "Home"});
  },
  fetchUserData(context) {
    return axios.get("http://127.0.0.1:8000/api/accounting/get_user_info").then((response) => {
      context.commit('setUserData', response.data);
      return response.data
    })
  },
  editUser(context, payload) {
    return axios.put("http://127.0.0.1:8000/api/accounting/edit", payload).then((response) => {
      context.commit('setFirstNameAndLastName', payload)
    })
  }
};


const getters = {
  isAuthenticated: (state) => {
    return !!state.token
  },
  getUserData: (state) => {
    return state.userData
  },
  isUserFetched: (state) => {
    return state.userData !== null
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
