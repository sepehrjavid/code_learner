import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth-module/index'
import classroom from './modules/classroom-module/index'
import profile from './modules/profile-module/index'
import quiz from './modules/quiz-module/index'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      classroom,
      profile,
      quiz
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
