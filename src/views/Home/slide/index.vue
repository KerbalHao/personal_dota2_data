<template>
  <cube-slide ref="slide" :data="items">
    <cube-slide-item
      v-for="(item, index) in items"
      :key="index"    >
      <a :href="item.url">
        <img :src="item.image" />
      </a>
    </cube-slide-item>
  </cube-slide>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          url: "http://www.dota2.com/",
          image: require("@/assets/2.jpg")
        },
        {
          url: "http://www.dota2.com/",
          image: require("@/assets/3.jpg")
        },
        {
          url: "http://www.dota2.com/",
          image: require("@/assets/4.jpg")
        }
      ]
    };
  }
};
</script>

<style lang='stylus' scoped>
.cube-slide
  position relative
  width 100%
  height 7rem
  img 
    width 100%
    height 100%
</style>