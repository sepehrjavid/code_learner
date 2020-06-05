import axios from 'axios';

const state = {
  token: localStorage.getItem("BTIUToken") || '',
  userData: null
};

const mutations = {
  login(state, token) {
    state.token = token
  },
  setUserData(state, payload) {
    state.userData = payload
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
        localStorage.setItem("BTIUToken", 'JWT ' + token);
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
      localStorage.setItem("BTIUToken", 'JWT ' + token);
      axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    });
  },
  logout(context) {
    context.commit('login', null);
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem("BTIUToken");
    this.$router.push("/login");
  },
  fetchUserData(context) {
    return axios.get("http://127.0.0.1:8000/api/accounting/get_user_info").then((response) => {
      context.commit('setUserData', response.data);
      return response.data
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
