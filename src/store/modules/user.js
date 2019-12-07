import * as types from '../mutation-types'

const state = {
  userInfo: {
    name: '测试用户信息'
  },
  activeDetailList: {}
}

const getters = {
  getUserInfo: state => state.userInfo,
  getActiveDetailList: state => state.activeDetailList
}

const mutations = {
  [types.SET_USER_INFO] (state, payload) {
    state.userInfo = payload
  },
  [types.SET_ACTIVE_DETAIL_LIST] (state, payload) {
    state.activeDetailList = payload
  }
}

const actions = {
  saveUserInfoAsync (context, payload) {
    context.commit('SET_USER_INFO', payload)
  },
  saveActiveDetailList (context, payload) {
    context.commit('SET_ACTIVE_DETAIL_LIST', payload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
