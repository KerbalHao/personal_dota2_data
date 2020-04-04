<template>
  <cube-scroll ref="scroll2" class="scroll-list-inner-wrap" nest-mode="free">
    <ul class="cube-scroll-list">
      <li class="cube-scroll-item" v-for="item in heroes" :key="item.id">
        <router-link :to='`home/${item.id}`'>
          <img :src="item.hoverImgSrc" :alt="item.name" />
          <span>{{item.name}} </span><br><i class='cubeic-like' v-show='item.like'> </i>
        </router-link>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
export default {
  props: ['heroes'],
  
};
</script>

<style lang='stylus' scoped>
.cube-scroll-wrapper
  height calc(100vh - 14rem)
  ul
    margin-top .5rem
    display flex
    flex-wrap wrap
    justify-content space-around
    li
      font-size .75rem
      width 4rem
      padding-left 0
      line-height 1rem
      margin-bottom 1.5rem
      a
        img
          width 100%
</style>