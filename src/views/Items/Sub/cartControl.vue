<template>
  <div class="cartControl">
    <transition name='move'>
    <i v-show="item.num > 0" class="cubeic-remove"  @click.stop="removeCart(item)"></i>
    </transition>
    <transition name='fade'>
    <span v-show="item.num > 0">{{item.num > 0 ? item.num : ''}}</span>
    </transition>
    <i class="cubeic-add" @click.stop="addCart(item,$event)"></i>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props: ['item'],
  methods: {
    ...mapMutations('items', ['handleCartControl']),
    // 子组件计数后，将数量传递到父组件，由父组件进行重新渲染
    addCart(item,event) {
      this.handleCartControl({id: item._id, num: 1,category: item.Category})
      // 将事件的主题传递给父组件
      this.$emit('add', event.target)
    },
    removeCart(item) {
      this.handleCartControl({id: item._id, num: -1,category: item.Category})
    }
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