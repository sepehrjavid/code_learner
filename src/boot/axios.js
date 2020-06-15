import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
const token = localStorage.getItem('LearnOnlineToken');
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
}
