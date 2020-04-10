<template>
  <div class="scroll-list-wrap">
    <cube-scroll ref="scroll" :data="items">
      <ul class="items-list">
        <li class="item" v-for="(item,index) in items" :key="index"  @click="showDetail(item, item.bought)">
          <div class="item-info">
            <img :src="item.icon" />
            <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="price">$ {{item.RealCost}}</div>
              <div class="bought" v-show='item.bought'>已购买 {{item.bought_num}} 件</div>
            </div>
          </div>
          <div class="control" v-if='!bought'>
            <cart-control :item='item' @add='onAdd'></cart-control>
          </div>
        </li>
      </ul>
    </cube-scroll>
      <detail ref="detail"></detail>
  </div>
</template>

<script>
import Detail from "./Detail";
import cartControl from '../Sub/cartControl'
export default {
  components: {
    Detail,
    cartControl
  },
  props: {
    items: {
      type: Array,
      default: () => {
        [];
      }
    },
    bought: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showDetail(item, bought) {
      this.$refs.detail.show(item, bought);
    },
    onAdd(el) {
      // 调用父组件中的 Cart 组件中的 drop 方法实现小球动画
      this.$parent.$refs.cart.drop(el)
    }
  },
};
</script>

<style lang='stylus' scoped>

.scroll-list-wrap
  .cube-scroll-wrapper
    height calc(100vh - 6.5rem)
    font-size .75rem
    .cube-scroll-content
      .cube-scroll-list-wrapper 
        ul
          display flex
          justify-content space-around
          flex-direction column
          margin-top .5rem
          border-top .05rem solid white
          padding-top .5rem
          li
            display flex
            justify-content space-between
            padding-bottom .5rem
            margin-bottom .5rem
            border-bottom .05rem solid white
            img
              border .05rem solid orange
              margin 0 .5rem
            .item-info
              display flex
              .info
                display flex
                justify-content flex-end
                flex-direction column
                div
                  margin-bottom .5rem
                  text-align  left
            .control
              color: orange;
              margin: auto 0;              
              font-size 1rem

</style>