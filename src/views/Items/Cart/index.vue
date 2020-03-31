<template>
  <div class="cartContainer">
    <div class="cart" @click="show">
      <i class="cubeic-mall"></i>
      <bubble :data="num" v-show="num > 0"></bubble>
      <div class="balls-container">
        <div v-for='(item, index) in balls' :key='index'>
          <transition
          @beforeEnter='beforeDrop'
          @enter='droping'
          @afterEnter='afterDrop'>
            <div class="ball" v-show='item.visiable'>
              <div class="inner"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
      <div class="shopList">
        <cube-popup
          ref="popup"
          :maskClosable="true"
          transition="cart"
          type="shop-list"
          position="bottom"
        >
          <div class="content">
            <div class="header">
              <span class="title">购物车</span>
              <cube-button :outline="false" :inline="true" icon="cubeic-delete" @click="clear">清空</cube-button>
            </div>
            <div class="cartList">
              <cube-scroll ref="scroll" :data="data" v-show="!empty">
                <ul class="goodsList">
                  <li class="good" v-for="good in data" :key="good._id">
                    <span class="name">{{good.name}}</span>
                    <span class="price">$ {{good.RealCost * good.num}}</span>
                    <cart-control :item="good"></cart-control>
                  </li>
                </ul>
              </cube-scroll>
              <div class="info">
                <div class="warning" v-show="empty">购物车为空</div>
                <div class="total" v-show="!empty">
                  <span>合计：</span>
                  <span>${{total}}</span>
                </div>
              </div>
              <cube-button
                :primary="true"
                :light="empty"
                @click="handleClick"
              >{{empty ? '请添加物品到购物车!!!' : '结算'}}</cube-button>
            </div>
          </div>
        </cube-popup>
      </div>
  </div>
</template>

<script>
import bubble from "@/components/Bubble";
import { mapMutations } from "vuex";
import cartControl from "../Sub/cartControl";

const BALL_LEN = 10
function createBalls() {
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({visiable: false})
  }
  return balls
}
export default {
  components: {
    bubble,
    cartControl
  },
  props: ["data"],
  data() {
    return {
      balls: createBalls(),
      dropBall:[]
    };
  },
  computed: {
    num() {
      let count = 0;
      this.data.forEach(item => {
        count += item.num;
      });
      return count;
    },
    total() {
      let total = 0;
      this.data.forEach(item => {
        total += item.num * item.RealCost;
      });
      return total;
    },
    empty() {
      return this.num === 0;
    }
  },
  methods: {
    ...mapMutations("items", ["handleCartControl"]),
    
    handleClick() {
      if (this.empty) {
        this.hide();
      }
    },
    show() {
      this.$refs.popup.show();
    },
    hide() {
      this.$refs.popup.hide();
    },

    clear() {
      this.hide();
      this.handleCartControl("clear");
    },

    drop(el) {
      for (let i = 0; i< this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.visiable){
          // 方法调用后，将一个隐藏的小球设置为可见，并将传递过来的元素设置为小球的属性，将小球保存到 dropBall 数组中，数组保存的是正在进行动画的小球
          ball.visiable = true
          ball.el = el
          this.dropBall.push(ball)
          return
        }
      }
    },
    beforeDrop(el) {
      // 在此处设置 el 开始动画的位置
      // el 是 transition 的目标元素，此处我们需要获得从 cartControl 传递过来的位置信息（已被存储到 ball.el 中)
      let ball = this.dropBall[this.dropBall.length - 1]
      let rect = ball.el.getBoundingClientRect()
      // 将 el 放到对应的 cartControl 的位置，需要计算的是 el 与其的间距 x 和 y，将单位转化为 px
      let x = rect.left - 0.75 * 20
      let y = -(window.innerHeight  - rect.top - 20 *3.25)
      el.style.display = ''

      const inner = el.getElementsByClassName('inner')[0]
      el.style.transform = `translate3d(0,${y}px,0)`
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    droping(el,done) {
      this._reflow= document.body.offsetHeight
      el.style.transform = 'translate3d(0, 0, 0)'
      const inner = el.getElementsByClassName('inner')[0]
      inner.style.transform='translate3d(0,0,0)'
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) {
      // 逐个处理已经完成动画的小球
      const ball = this.dropBall.shift()
      if (ball) {
        ball.visiable = false
        el.style.display = 'none'
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
.cartContainer {
  position: relative;

  .cart {
    width: 2rem;
    font-size: 2rem;
    position: absolute;
    background: white;
    opacity: 0.8;
    bottom: 0.15rem;
    border-radius: 50%;
    border: 0.05rem solid white;
    color: orange;
    z-index: 5;
    .ball {
      position: fixed;
      transition all 1s cubic-bezier(0.49,-0.29,0.75,0.41)
      bottom 3.25rem
      left .75rem
      z-index 9999
      .inner {
        background orange 
        width .5rem
        height .5rem
        border-radius: 50%;
        transition 1s all linear
      }
    }
  }

  .shopList {
    color: black;

    .content {
      background: white;

      .header {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        border-bottom: 0.05rem solid black;
        margin-bottom: 0.5rem;

        .title {
          margin: auto 0;
          font-size: 1rem;
        }
      }

      .cartList {
        .cube-scroll-wrapper {
          max-height: calc(100vh - 28rem);
          min-height: 2rem;

          .goodsList {
            height: 10rem;
            font-size: 0.75rem;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            .good {
              padding: 0.25rem;
              border-bottom: 0.05rem dashed black;
              display: flex;
              justify-content: space-between;

              .name {
                flex: 1;
                text-align: left;
              }

              .price {
                flex: 1;
              }
            }
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 0.75rem;
          margin: 0.25rem 0;
          padding: 0.25rem 0.25rem;
          border-top: 0.05rem solid black;

          .total {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}

.cart-enter-active, .cart-leave-active {
  transition: 1s all linear;
}

.cart-enter {
  opacity: 0;
  transform: translateY(100%);
}
</style>