<template>
  <div class="home">
    <router-view></router-view>
      <Slide></Slide>
      <cube-button @click="showMutiPicker">筛选英雄</cube-button>
      <List :heroBase="passHero"></List>
  </div>
</template>

<script>
import Slide from "./slide";
import List from "./heroList";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      passHero: [],
      showDetail: false
    };
  },

  components: {
    Slide,
    List
  },
  mounted() {
    if (this.heroBase.length === 0) {
      this.getHero();
    }
    this.passHero = this.heroBase;
  },
  computed: {
    ...mapState("home", ["heroBase"])
  },
  methods: {
    ...mapActions("home", ["getHero"]),

    getFilters(props) {
      // 需要将 heroBase 中每个英雄的的字符串 filters 转化成数组，累积获得 filters 的数组
      let filters = [],
        heroBase = JSON.parse(JSON.stringify(this.heroBase));
      heroBase.forEach(item => {
        // 将每个英雄的相关属性转化成数组形式
        let filter = item[props].split(",");
        // 将所有英雄的相关属性汇总成一个大数组，而后剔除重复项
        filters = filters.concat(filter).reduce((pre, cur) => {
          if (!pre.includes(cur)) {
            return pre.concat(cur);
          }
          return pre;
        }, []);
      });
      return filters;
    },

    showMutiPicker() {
      // 格式化各筛选器内容
      let roles = [{ text: "全部", value: "all" }].concat(
        this.getFilters("roles").map(item => {
          return { text: item, value: item };
        })
      );
      let heroType = [{ text: "全部", value: "all" }].concat(
        this.getFilters("heroType").map(item => {
          return { text: item, value: item };
        })
      );
      let attackType = [{ text: "全部", value: "all" }].concat(
        this.getFilters("attackType").map(item => {
          return { text: item, value: item };
        })
      );

      if (!this.mutiPicker) {
        this.mutiPicker = this.$createPicker({
          title: "筛选英雄",
          data: [heroType, attackType, roles],
          onSelect: this.selectHandle,
          // onCancel: this.cancelHandle
        });
      }
      this.mutiPicker.show();
    },

    // 确定选择后，filter 出符合条件的英雄
    selectHandle(selectedVal) {
      /*
       * 筛选英雄
       * param {array<String>} selectedVal
       */
      let [heroType, attackType, roles] = selectedVal;

      // 若都是 all 则直接返回 store 中的 heroBase
      if (heroType === "all" && attackType === "all" && roles === "all") {
        this.passHero = this.heroBase;
        return;
      }

      // 通过 chain 连续筛选合适的英雄
      this.passHero = this.heroBase
        .filter(item => {
          if (item.heroType === heroType || heroType === "all") return true;
        })
        .filter(item => {
          if (item.attackType === attackType || attackType === "all")
            return true;
        })
        .filter(item => {
          if (item.roles.includes(roles) || roles === "all") return true;
        });    },

  }
};
</script>
<style lang='stylus' scoped>
.home {
  display: flex;
  flex-direction: column;
  button {
    height 2.5rem
  }
}
  
</style>
