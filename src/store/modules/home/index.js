import { homePage } from "../../../api"
export default {
  namespaced: true,
  state: {
    heroBase: JSON.parse(localStorage.getItem('heroBase')) ||[],
  },
  mutations: {
    setHero(state, payload) {
      console.log(1)
      state.heroBase = payload
      localStorage.setItem('heroBase', JSON.stringify(state.heroBase))      
    },
  },
  actions: {
    async getHero({commit}) {
      let hero = await homePage()
      commit('setHero', hero)
    }
  }
}
