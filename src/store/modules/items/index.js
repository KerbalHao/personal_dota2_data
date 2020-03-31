import { getItems } from "../../../api"

export default {
  namespaced: true,
  state: {
    items: [],
    category: []
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload
      localStorage.setItem('items', JSON.stringify(state.items))
    },
    setCatagory(state, payload){
      state.category = payload
    },
    handleCartControl(state,payload) {
      // 处理 清空购物车的情况
      if (payload === 'clear') {
        state.items.forEach(item => {
          if (item.num !== 0) {
            item.num = 0
          }
        })
        state.category[0].forEach(item => {
          if (item.num !== 0) {
            item.num = 0
          }
        })
      }
            // 处理购物组件数字

      state.items.forEach(item => {
        if (item._id === payload.id) {
          item.num += payload.num
        }
      })

      // 处理 drawer 组件数字
      state.category[0].forEach(item => {
        if (item.category === payload.category) {
          if (item.category === '全部') {
            item.num = payload.num
            return
          }
          item.num += payload.num
        }
      })

    }
  },
  actions: {
    async getItems({commit}) {
      let items = await getItems()
      items.forEach(item => (item.num = 0))
      commit('setItems', items)
    }
  }
}
