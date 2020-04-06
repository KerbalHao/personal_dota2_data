<template>
  <div class="bought">
    <headers text='我的购买'></headers>
    <drawer :filters="category" @confirm="confirm"></drawer>
    <h2>已购买物品</h2>
    <scroll-nav :items='items' :bought='true'></scroll-nav>
    <footer>总计： ${{total}}</footer>
  </div>
</template>

<script>
import Headers from "@/components/headers";
import scrollNav from '../../Items/scrollNav' 
import Drawer from "../../Items/Drawer";

import {mapState} from 'vuex'
export default {
  data() {
    return {
      items: [],
      total: 0
    }
  },
  mounted() {
    let total = 0
    this.items = this.userData.items.filter(item => item.bought)
    this.items.forEach(item => {
      total += item.bought_num * item.RealCost
    })
    this.total = total

  },
  computed: {
    ...mapState(['userData','category'])
  },
  methods: {
        confirm(category) {
      /*
       ** 用于父子通信，等待子组件传递回需要的数据，进行数据筛选分类
       */

      this.name = category;
      this.data = this.initData.items.filter(item => {
        if (item.Category === category) {
          return true;
        }
        if (category === "全部") {
          return true;
        }
      });
    },
  },

  components: {
    Headers,
    scrollNav,
    Drawer
  }
}
</script>

<style lang='stylus'>
h2
  font-size 1rem
  height 1rem
  color orange
  z-index 100
  margin .5rem
footer
  position fixed
  bottom 3rem
  left 50%
  transform translateX(-50%)
  color orange
  font-size 1.5rem
  // width 100%
</style>