<template>
  <div id="item">
    <headers text='物品'></headers>
    <cube-loading :size="40" v-show='!this.data'></cube-loading>
    <drawer :filters="category" @confirm="confirm"></drawer>
    <h2>{{name}}</h2>
    <scroll-nav :items="data"></scroll-nav>
    <cart :data="toCart" ref='cart'></cart>
  </div>
</template>

<script>
import scrollNav from "./scrollNav/";
import Drawer from "./Drawer/";
import cart from "./Cart/";
import Headers from '@/components/headers'
import { mapState, mapActions, mapMutations} from 'vuex'

export default {
  data() {
    return {
      data: [],
      backup: [],
      name: "全部",
    };
  },
  async mounted() {
    if (this.initData.items == undefined || this.initData.items.length  === 0) await this.getData()
    this.data = this.initData.items;
    // 初始化传递到 Drawer 组件的数据
    this.setCatagory();
    // console.log(this)
  },
  computed: {
    ...mapState(['initData','category']),
    toCart() {
      if (!this.initData.items) return []
      return this.initData.items.filter(item => {
        if (item.num !== 0) {
          return true
        }
      })
    }
  },
  methods: {
    ...mapActions(['getData']),
    ...mapMutations( ['setCatagory']),

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
    scrollNav,
    Drawer,
    cart,
    Headers
  }
};
</script>

<style lang='stylus' scoped>
#item
  height calc(100vh - 4.5rem)

h2
  font-size 1rem
  height 1rem
  color orange
  margin .5rem
</style>