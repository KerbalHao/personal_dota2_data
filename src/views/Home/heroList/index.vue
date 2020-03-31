<template>
  <cube-scroll ref="scroll2" class="scroll-list-inner-wrap" nest-mode="free">
    <ul class="cube-scroll-list">
      <li class="cube-scroll-item" v-for="item in heroBase" :key="item.id">
        <router-link :to='`home/${item.id}`'>
          <img :src="item.thumbImg" :alt="item.name" />
          <span>{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </cube-scroll>
</template>

<script>
export default {
  props: ['heroBase'],
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
      margin-bottom 3.5rem
      a
        img
          width 100%
</style>