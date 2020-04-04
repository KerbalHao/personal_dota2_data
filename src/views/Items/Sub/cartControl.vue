<template>
  <div class="cartControl">
    <transition name='move'>
    <i v-show="item.num > 0" class="cubeic-remove"  @click.stop="toCart(item,'minus')"></i>
    </transition>
    <transition name='fade'>
    <span v-show="item.num > 0">{{item.num > 0 ? item.num : ''}}</span>
    </transition>
    <i class="cubeic-add" @click.stop="toCart(item,'plus',$event)"></i>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {showLogin} from '@/components/utils'
import {validate} from '@/api/index'
export default {
  props: ['item'],
  methods: {
    ...mapActions( ['handleCartControl']),
    // 子组件计数后，将数量传递到父组件，由父组件进行重新渲染
    async toCart(item,str, event) {
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
    },
  },
}
</script>

<style lang='stylus' scoped>

.cartControl
  display flex
  color orange
  justify-content space-around
  .move-enter-active,.move-leave-active
    transition .4s all  linear
  .move-enter, .move-leave-to
    transform translate3d(2rem,0,0) rotate(180deg)
    opacity 0
  .fade-enter-active,.fade-leave-active
    transition .4s all linear
  .fade-enter, .fade-leave-to,.fade-enter-to,.fade-leave
    opacity 0
  span 
    margin 0 .25rem
</style>