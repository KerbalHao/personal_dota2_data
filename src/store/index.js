import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import items from './modules/items'
import {fetchUser} from '@/api'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerName: '英雄',
    user: {},
    userData: {}
  },
  mutations: {
    setHeaderName(state, payload){
      state.headerName = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setUserData(state, payload) {
      // 将 like, bought 和 cart 作为 userData 的属性储存
      if (payload.type in state.userData) {
        state.userData[payload.type] = state.userData[payload.type].concat(payload.content)
        state.userData[payload.type] = state.userData[payload.type].filter(item => {
          return item._id !== payload.content._id
        })
      } else {
        state.userData[payload.type] = [payload.content]
      }
    }
  },
  actions: {
    setHeaderName({commit}, payload) {
      commit('setHeaderName', payload)
    },
    async setUser({commit}, payload) {
      let res = await fetchUser(payload)
      commit('setUser', res)
    }
  },
  modules: {
    home,
    items
  }
})
