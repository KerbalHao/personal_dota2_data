<template>
  <div id="header">
    <i class="cubeic-back" v-if="show" @click="goBack"></i>
    <!-- <i  class='cubeic-location' v-if="$route.path.includes('items')"></i> -->
    <slot>{{text}}</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
      this.show = this.$route.path.includes('home/')||this.$route.path.includes('mine/')
    },
  props: {
    text: {
      type: String,
      default: "首页"
    }
  },
  computed: {
 },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='stylus' scoped>
#header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
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