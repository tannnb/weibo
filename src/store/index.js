import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import User from './modules/user'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    User
  },
  state: {
    // 根路由页面转场过渡 route-push route-pop
    transitionName: ''
  },
  mutations: {
    setPageTransition (state, params) {
      state.transitionName = `route-${params}`
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
