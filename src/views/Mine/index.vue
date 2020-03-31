<template>
  <div id="mine">
    <router-view v-if='!showLogin'></router-view>
    <div class="mine" v-if='showLogin'>
      <div class="header">
        <img src="@/assets/user.jpg" />
        <router-link to="mine/login">
          <cube-button :inline="true" :primary="true">登录</cube-button>
        </router-link>
        <!-- <span>{{user.userName}}</span> -->
      </div>

      <ul class="list">
        <li v-for="(item,index) in list" :key="index">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
let list = [
  {
    text: "我的收藏",
    value: "favourite"
  },
  {
    text: "我的购买",
    value: "bought"
  }
];
export default {
  data() {
    return {
      list,
      showLogin: true
    };
  },
  computed: {
    ...mapState(['user'])
  },
};
</script>

<style lang='stylus' scoped>
#mine {
  height: 100%;

  .header {
    position: relative;
    border: 0.05rem solid white;
    border-top: 0;
    background-image: url('../../assets/dota2.jpg');
    background-size: 25%;
    height: 10rem;
    line-height: 10rem;

    img {
      width: 5rem;
      border-radius: 50%;
      border: 0.05rem solid black;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    button {
      vertical-align: bottom;
      margin-bottom: 0.5rem;
    }
  }

  .list {
    margin-top: 1rem;
    width: 100%;
    text-align: left;

    li {
      border: 0.05rem solid white;
      padding: 1rem;
      font-size: 0.75rem;
    }
  }
}
</style>