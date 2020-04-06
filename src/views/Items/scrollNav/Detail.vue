<template>
<!-- 封装 popup 组件，实现点击展示详情效果 -->
  <cube-popup type="extend-popup" ref="popup" :maskClosable="true">
    

    <div class="detail">
      <div class="header">
        <img :src="item.icon" alt />
      <div class="detail-info">
        <h2><span>物品名：</span><span>{{item.name}}</span></h2>
        <div class="price"><span>售价：</span><span>${{item.RealCost}}</span></div>
      </div>
      </div>
      <div class="detail-data">
        <div class="detail-category"><span>分类：</span><span>{{item.Category}}</span></div>
        <div class="detail-prop" v-if="item.Lines &&item.Lines.length>0">
          <span>属性：</span>
          <div class="lines">
          <span v-for="state in item.Lines" :key="state">
            {{state}}
            <br />
          </span>
          </div>
        </div>
        <div class="materialOf" v-if="item.MaterialOf && item.MaterialOf.length > 0" >
          <span>可合成：</span>
          <div class="ordinary" >
            <cube-scroll ref="scroll" :data="item.MaterialOf">
              <div class="contentOfMaterialOf">
                <div v-for='item in item.MaterialOf' :key='item.numId' class='listM'>
                  <img :src="item.icon" alt=""><br>
                  <div class="info">
                    <span>{{item.name}}<br>${{item.RealCost}}</span>
                  </div>
                </div>
              </div>
            </cube-scroll>
          </div>
        </div>
        <div class="materials" v-if='item.Materials && item.Materials.length > 0' >
          <span>材料:</span>
          <div class="material">
            <cube-scroll ref="scroll" :data="item.Materials">
              <div class="contentOfMaterial">
                <span class='listM' v-for='item in item.Materials' :key='item.numId'>
                  <img :src="item.icon" alt=""><br>
                  {{item.name}}<br>
                  ${{item.RealCost}}
                </span>
              </div>
            </cube-scroll>
          </div>
        </div>
      </div>
      <cube-button :primary='true' v-show='item.num === 0' @click="addToCart(item,'plus')" v-if='!bought'>加入购物车</cube-button>
      <div class="cart-control" v-if='!bought' v-show='item.num > 0' >
        <cart-control :item='item' ></cart-control>
      </div>
    </div>
  </cube-popup>

</template>
<script type="text/ecmascript-6">
import cartControl from '../Sub/cartControl'
import {validate} from '@/api'
import {showLogin} from '@/components/utils'
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      item: {},
      bought: false
    };
  },
  components: {
    cartControl
  },
  methods: {
    ...mapActions(['handleCartControl']),

    show(item) {
      /*
      ** 接收父元素通过函数传递过来的 item，并赋值给 this.item 用于渲染
      */
      this.item = item;
      if (this.$route.path.includes('mine')) {
        this.bought = true
      } else {
        this.bought = false
      }
      this.$refs.popup.show();
    },

    async addToCart(item, str) {
      let res = await validate()
      if (res.code == 0) {
        if (str == 'minus') {
         await this.handleCartControl({numId: item.numId, num: -1,category: item.Category})
        } else if (str == 'plus') {
          await this.handleCartControl({numId: item.numId, num: 1,category: item.Category})
          // 将事件的主题传递给父组件
          this.$emit('add', event.target)
        }
      } else {
        showLogin.call(this)
      }
    }
  }
};
</script>
<style lang='stylus'>
.cube-popup
  font-size .65rem
  .cube-popup-content
    .detail
      background white
      display flex
      flex-direction column
      width calc(100vw - 4rem)
      overflow auto
      margin auto
      padding .5rem 
      justify-content space-between
      color black
      text-align left
      .header
        display flex
        border-bottom .05rem solid black
        justify-content space-between
        font-weight bold
        font-size 1rem
        padding-bottom .5rem
        margin-bottom .5rem
        img
          width 5rem
          border .05rem solid orange 
          margin-right .5rem
        .detail-info
          flex 1
          display flex
          flex-direction column
          justify-content center
          h2
            font-weight bold
            display flex
            justify-content space-between
            margin-bottom .5rem
            span
              flex 1
            span:last-of-type
              text-align right
          .price
            text-align left
            display flex
            justify-content space-around
            span
              flex 1
            span:last-of-type
              text-align right

      
      .detail-data
        display flex
        flex-direction column
        justify-content space-between
        .detail-category
          margin-bottom .25rem
          padding-bottom .25rem
          display flex
          justify-content space-around
          border-bottom .05rem dashed black
          span
            flex 1
          span:last-of-type
            text-align right
        .detail-prop
          display flex
          margin-bottom .25rem
          padding-bottom .25rem
          display flex
          justify-content space-around
          border-bottom .05rem dashed black
          span
            flex 1
          .lines
            text-align right 
        .materialOf
          display flex
          margin-bottom .5rem
          justify-content space-between
          border-bottom .05rem solid black
          padding-bottom .5rem
          span
            flex 1
          .ordinary
            flex 2
            width 100%
            text-align center
            // border .05rem solid orange
            .cube-scroll-wrapper
              border .05rem solid black
              height 6rem
              .contentOfMaterialOf
                display flex
                flex-wrap wrap
                justify-content space-between
                .listM
                  margin .5rem
                  img
                    width 3rem
            
              
            img
              border .05rem solid orange
        .materials
          display flex
          margin-bottom .5rem
          justify-content space-between
          border-bottom .05rem solid black
          padding-bottom .5rem
          span
            flex 1
          .material
            flex 2
            width 100%
            text-align center
            .cube-scroll-wrapper
              border .05rem solid black
              height 6rem
              .contentOfMaterial
                display flex
                flex-wrap wrap
                justify-content space-between
                .listM
                  margin .5rem
                  img
                    width 3rem

      .cart-control
        border-top .05rem solid black
        padding-top .05rem
        text-align center
        font-size 1rem
        color orange
        display flex
        justify-content center
</style>