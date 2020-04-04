<template>
  <div id="app">
    <transition  :name='transitionName' mode='out-in'>
      <router-view></router-view>
    </transition>
    <div id="nav">
      <cube-tab-bar v-model="selectedLabelSlots" @click="clickHandler">
        <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="index">
          <!-- name为icon的插槽 -->
          <i slot="icon" :class="item.icon"></i>
          <!-- 默认插槽 -->
          <div>{{item.label}}</div>
        </cube-tab>
      </cube-tab-bar>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
      transitionName: '',
      selectedLabelSlots: "Home",
      tabs: [
        {
          label: "Home",
          icon: "cubeic-home"
        },
        {
          label: "Items",
          icon: "cubeic-like"
        },
        {
          label: "Mine",
          icon: "cubeic-person"
        }
      ],
      header: ''
    };
  },
  async mounted() {
    if (!this.initData.heroes) {
      await this.getData()
    }
  },
  computed: {
    ...mapState(['initData'])
  },
  // 1. 路径随 tab 变化而变化， 2. tab 随路径变化而变化 3. 更新后，tab 和路径保持与更新前一致
  watch: {
    $route: {
      handler(to) {
        if (!this.$route.meta.tag) return

        // 设置底部导航栏激活
        // console.log(this.$route.name)
        this.selectedLabelSlots !== this.$route.name
          ? (this.selectedLabelSlots = this.$route.name)
          : null;

        // 设置顶部名称

      // 设置动画效果
        this.transitionName = to.name !== 'Home' ? 'front' : 'back'
        
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['getData']),
    clickHandler(label) {
      this.selectedLabelSlots = label;
      this.$router.push(`/${label.toLowerCase()}`);
    }
  }
};
</script>

<style lang="stylus">
@import './index.styl';
@import './theme.styl';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  height: 100%;
  width: 100%;
  text-align: center;
  color: $color-light-grey;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  #nav {
    position: fixed;
    top: calc(100vh - 2.5rem);
    overflow hidden
    left: 0;
    right: 0;
    height: 3rem;
    z-index: 1;
    background: $color-dark-grey;
    font-size 1rem
    padding 0.3rem
    width 100vw
    .cube-tab-bar {
      height 100%
      .cube-tab{
        display flex
        flex-direction column
        height 100%
      }
    }
  }
}

.front-enter-active, .front-leave-active
  transition .1s all linear
.front-enter
  transform translate3d(100%, 0, 0)
  opacity 0
.front-leave-to
  opacity 1
  transform translate3d(-100%, 0, 0)

.back-enter-active, .back-leave-active
  transition .1s all linear
.back-enter
  transform translate3d(-100%, 0, 0)
  opacity 0
.back-leave-to
  transform translate3d(100%, 0, 0)
</style>
