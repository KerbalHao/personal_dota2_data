import Vue from 'vue'
import Vuex from 'vuex'
import { fetchUser, fetchData, editData, postItem,postBought, setLogout,clearItem,postRegister } from '@/api'
import { parse, stringify, arrayDuplicate } from '@/components/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initData: parse(localStorage.getItem('userData'))||parse(localStorage.getItem('initData')) || {},
    userData: parse(localStorage.getItem('userData'))||{},
    category: [],
    total: 0
  },
  mutations: {
    setInitData(state, payload) {
      localStorage.setItem('initData', stringify(payload))
      state.initData = payload
    },
    setUserData(state, payload) {
      let { personalData } = payload
      state.userData = personalData
      localStorage.setItem(`userData`, stringify(personalData))
      // 将 initData 赋值为 用户的个人数据
      state.initData = state.userData
    },
    likeHeroHandler(state, payload) {
      state.initData.heroes.forEach(item => {
        if (item.id === payload) {
          item.like = !item.like
        }
      })
      localStorage.setItem(`userData`, stringify(state.initData))
    },
    setCatagory(state) {
      let data = state.initData.items
      data = data.reduce((pre, cur) => {
        let item = {category: cur.Category, num: cur.num}
        pre.push(item);
        return pre;
      }, []);
      // drawer 组件要求的是二维数组
      // 此处，通过 initData 计算获得用户的每个 category 中的物品数量
      state.category = [[{category:"全部", num: state.total}].concat(arrayDuplicate(data))]
    },

    handleCartControl(state, payload) {
      // 处理 清空购物车的情况
      if (payload == 'clear') {
        state.userData.items = state.initData.items.map(item => {
          if (item.num !== 0) {
            item.num = 0
          }
          return item
        })
        // state.category[0].forEach(item => {
        //   if (item.num !== 0) {
        //     item.num = 0
        //   }
        // })
      } else {
        // 处理购物组件数字
        state.userData.items = state.initData.items.map(item => {
          if (item.numId == payload.numId) {
            item.num = item.num + payload.num
          }
          return item
        })
  
        // 处理 drawer 组件数字
        // state.category[0].forEach(item => {
        //   if (item.category === payload.category) {
        //     if (item.category === '全部') {
        //       return
        //     }
        //     item.num += payload.num
        //     state.total += payload.num
        //   }
        // })
        // state.category[0][0].num = state.total
      }

      localStorage.setItem(`userData`, stringify(state.userData))
      state.initData = state.userData
    },
    handleBuyItem(state, payload) {
      console.log(payload)
      state.userData.items = state.initData.items.map(item => {
        for(let i = 0; i< payload.length;i++) {
          if (item.numId == payload[i].numId){
            item.num = 0
            item.bought = true
            item.bought_num += parseFloat(payload[i].bought_num)

          }
        }
        return item
      })
      localStorage.setItem(`userData`, stringify(state.userData))
      state.initData = state.userData
    },
    handleLogout(state) {
      localStorage.removeItem('userData')
      localStorage.removeItem('token')
      state.userData = {}
      state.initData = parse(localStorage.getItem('initData'))
    }
  },
  actions: {
    // 获得初始数据
    async getData({ commit }, cb) {
      let data = await fetchData(cb) || {}
      commit('setInitData', data)
    },
    // 登录
    async setUser({ commit }, payload,cb) {
      let res = await fetchUser(payload,cb)
      if (res.code == 1) return
      commit('setUserData', res)
    },


    // 收藏英雄
    async likeHeroHandler({ commit }, payload,cb) {
      await editData(payload,cb)
      commit('likeHeroHandler', payload.id)
    },

    //
    async handleCartControl({ commit }, payload,cb) {
 
        if (payload.numId) {
          await postItem({ numId: payload.numId, num: payload.num },cb)
        }
      commit('handleCartControl', payload)
    },

    async handleClear({commit},payload,cb) {
      await clearItem(cb)
      commit('handleCartControl', payload)

    },

    async handleBuy({commit}, payload,cb) {
      let data = payload.map(item => {
        return {
          numId: item.numId,
          bought_num: item.num,
        }
      })
      await postBought(data,cb)
      commit('handleBuyItem', data)
    },

    async handleLogout({commit},cb) {
      await setLogout(cb)
      commit('handleLogout')
    },
    async handleRegister({commit}, payload, cb) {
      let res = await postRegister(payload, cb)
      if (res.code == 1) return res.code
      commit('setUserData', res)
    }
  },
})
