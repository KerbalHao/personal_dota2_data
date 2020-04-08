<template>
  <div class="home">
    <headers text="英雄"></headers>
    <Slide></Slide>
    <cube-loading :size="40" v-show="initData.heroes!==undefined && initData.heroes.length == 0"></cube-loading>
    <cube-button
      @click="showMutiPicker"
      v-show="initData.heroes!==undefined && initData.heroes.length !== 0"
    >筛选英雄</cube-button>
    <List :heroes="passHero"></List>
  </div>
</template>

<script>
import Headers from "@/components/headers.vue";
import Slide from "./slide";
import List from "./heroList";
import { mapState, mapActions } from "vuex";
// import { errCB } from '@/components/utils'

export default {
  data() {
    return {
      passHero: []
    };
  },

  components: {
    Slide,
    List,
    Headers
  },
  async mounted() {
    // 等待 APP.vue 中请求返回数据，在此组件中重复赋值，直到 passHero 得到值，停止计时器
    let timer
    if (this.passHero.length == 0) {
      timer = setInterval(() => {
        this.passHero = this.initData.heroes
        if (this.passHero.length != 0) clearInterval(timer)
      }, 300);
    }
  },
  computed: {
    ...mapState(["initData"])
  },
  methods: {
    ...mapActions(["getData"]),
    getFilters(props) {
      // 需要将 heroes 中每个英雄的的字符串 filters 转化成数组，累积获得 filters 的数组
      let filters = [],
        heroes = this.initData.heroes;
      heroes.forEach(item => {
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
      let Roles = [{ text: "全部", value: "all" }].concat(
        this.getFilters("Roles").map(item => {
          return { text: item, value: item };
        })
      );
      let AttributePrimary = [{ text: "全部", value: "all" }].concat(
        this.getFilters("AttributePrimary").map(item => {
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
          data: [AttributePrimary, attackType, Roles],
          onSelect: this.selectHandle
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
      let [AttributePrimary, attackType, Roles] = selectedVal;
      // 若都是 all 则直接返回 store 中的 heroes
      if (
        AttributePrimary === "all" &&
        attackType === "all" &&
        Roles === "all"
      ) {
        this.passHero = this.initData.heroes;
        return;
      }

      // 通过 chain 连续筛选合适的英雄
      this.passHero = this.initData.heroes
        .filter(item => {
          if (
            item.AttributePrimary === AttributePrimary ||
            AttributePrimary === "all"
          )
            return true;
        })
        .filter(item => {
          if (item.attackType === attackType || attackType === "all")
            return true;
        })
        .filter(item => {
          if (item.Roles.includes(Roles) || Roles === "all") return true;
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.home {
  display: flex;
  flex-direction: column;

  button {
    height: 2.5rem;
  }
}

.cube-loading {
  margin: auto;
}
</style>
