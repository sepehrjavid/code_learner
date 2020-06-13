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
    ).catch((response) => {
      throw response.data
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
