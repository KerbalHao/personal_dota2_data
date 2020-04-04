<template>
  <div class="drawer">
    <i class="cubeic-location" @click="showDrawer">
    <!-- <bubble :data='total' v-show='total > 0'></bubble> -->
    </i>
    <cube-drawer ref="drawer" title="请选择" :data="filters" @select="selectHandler" >
      <cube-drawer-panel
        v-for="(panel, index) in filters"
        :key="index"
        :index="index"
        :data="panel"
      >
        <cube-drawer-item v-for="(item, i) in panel" :item="item" :key="i" :index="i">{{item.category}}
        <!-- <bubble :data='item.num' v-show='item.num > 0'></bubble> -->
        </cube-drawer-item>
      </cube-drawer-panel>
    </cube-drawer>
  </div>
</template>

<script>
// import bubble from "@/components/Bubble"
// import {  mapState} from 'vuex'

export default {
  components: {
    // bubble
  },
  computed: {
    // ...mapState(['total'])
  },
  props: ["filters"],
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },
    selectHandler(selectedValue,selectedIndex) {
      /*
       ** 将 item 通过 $emit 事件 confirm 发送到父组件
       */
      selectedValue = null
      let item = this.filters[0][selectedIndex]
      this.name = item.category;
      this.$emit("confirm", this.name);
    },
  },
};
</script>

<style lang='stylus' scoped>
.cubeic-location {
  position: absolute;
  right: 1rem;
  top 2.5rem
  z-index: 1;
  font-size: 1rem;
  .circle {
    height .75rem
    width .75rem
    font-size .5rem
    left 1rem
    line-height .75rem
  }
}



.cube-drawer {
  position: absolute;
  z-index: 5;
  top: 2rem;
  right: 0;
  height: calc(100vh - 4.7rem);
  font-size: 0.5rem;
  bottom: 3rem;
  left: 0;
  overflow: auto;
  color: #333;
  overflow-x: hidden;
  li{
    .circle{
      // color black
      right 1rem
      top 50%
      font-size .75rem
      transform translateY(-50%)
      line-height 1rem
    }
  }
}
</style>