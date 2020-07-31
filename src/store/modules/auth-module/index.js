import axios from 'axios';

const state = {
  token: localStorage.getItem("LearnOnlineToken") || '',
};

const mutations = {
  login(state, token) {
    state.token = token
  },
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
    ).catch((e) => {
      throw e.response.data.non_field_errors[0]
    })
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
    context.commit('profile/setUserData', {}, {root: true});
  },
};


const getters = {
  isAuthenticated: (state) => {
    return !!state.token
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
