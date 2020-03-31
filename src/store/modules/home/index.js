import { homePage } from "../../../api"

export default {
  namespaced: true,
  state: {
    heroBase: JSON.parse(localStorage.getItem('heroBase')) || [],
  },
  mutations: {
    getHero(state, payload) {
      state.heroBase = payload
      localStorage.setItem('heroBase', JSON.stringify(state.heroBase))      
    },
  },
  actions: {
    async getHero({commit}) {
      let hero = await homePage()
      console.log(hero)
      commit('getHero', hero)
    }
  }
}
