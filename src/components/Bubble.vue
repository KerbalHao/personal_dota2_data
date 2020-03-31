<template>
  <i class="circle">{{data}}</i>
</template>

<script>
export default {
  props: ['data']
};
</script>

<style lang='stylus' scoped>
.circle {
  border-radius: 50%;
  width: 1rem;
      border .05rem solid white

  height: 1rem;
  font-size: 1rem;
  color: white;
  background: red;
  position: absolute;
  z-index: 11;
  right: 0;
  top: 0;
}
</style>