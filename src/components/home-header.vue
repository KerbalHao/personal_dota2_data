<template>
  <div class="header">
    <i class="cubeic-back" v-if="$route.path.includes('home/')" @click="goBack"></i>
    <!-- <i  class='cubeic-location' v-if="$route.path.includes('items')"></i> -->
    <slot>{{text}}</slot>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    text: {
      type: String,
      default: "首页"
    }
  },
  computed: {
 },
  methods: {
    ...mapMutations(['setHeaderName']),
    goBack() {
      this.setHeaderName(this.text.slice(0,2))
      this.$router.push('/home');
    }
  }
};
</script>

<style lang='stylus' scoped>
.header {
  position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    font-size: 1rem;
    height: 2rem;
    width: 100%;
    font-weight: bold;
    text-align: center;
    line-height: 2rem;
    background: #333;
  .cubeic-back {
    position absolute 
    left 0.5rem
  }
  .cubeic-location {
    float right
    margin-right .5rem
  }
}
</style>