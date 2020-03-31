<template>
  <div id="item">
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
import { mapState,mapActions, mapMutations} from 'vuex'

export default {
  data() {
    return {
      data: [],
      backup: [],
      name: "全部",
    };
  },
  async mounted() {
    if (this.items.length  === 0) await this.getItems()
    this.data = this.items;
    // 初始化传递到 Drawer 组件的数据
    this.setCatagory([this.initCategory()]);
    // console.log(this)
  },
  computed: {
    ...mapState('items',['items','category']),
    toCart() {
      return this.items.filter(item => {
        if (item.num !== 0) {
          return true
        }
      })
    }
  },
  methods: {
    ...mapActions('items',['getItems']),
    ...mapMutations('items', ['setCatagory']),
    initCategory() {
      /*
       * 获得 items 中的所有分类
       */

      let data = this.items
      // 将 Category 整合到一个数组中,并将每个分类中选中的数量设置为0， 结构类似 [{category, num}]
      data = data.reduce((pre, cur) => {
        let item = {category: cur.Category, num: 0}
        pre.push(item);
        return pre;
      }, []);
      return [{category:"全部", num: 0}].concat(this.arrayDuplicate(data));
    },

    arrayDuplicate(data = []) {
      // 数组去重

      let temp = {};

      for (let i = 0; i < data.length; i++) {
        let cur = data[i].category;
        if (temp[cur] === cur || !cur) {
          data[i] = data[data.length - 1];
          data.length--;
          i--;
          continue;
        }
        temp[cur] = cur;
      }
      temp = null;
      return data;
    },

    confirm(category) {
      /*
       ** 用于父子通信，等待子组件传递回需要的数据，进行数据筛选分类
       */

      this.name = category;
      this.data = this.items.filter(item => {
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
    cart
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