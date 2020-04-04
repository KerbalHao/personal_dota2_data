<template>
  <div id="mine">
    <headers text="用户中心"></headers>
    <router-view v-if="!showLogin"></router-view>
    <div class="mine" v-if="showLogin">
      <div class="header">
        <img src="@/assets/user.jpg" />
        <router-link to="mine/login" v-if="!showName">
          <cube-button :inline="true" :primary="true">登录</cube-button>
        </router-link>
        <div  v-else>
          <div class="user-name">{{userName}}</div>
          <cube-button :inline="true" :primary="true" @click='logout'>注销</cube-button>

        </div>
      </div>

      <ul class="list">
        <li v-for="(item,index) in list" :key="index">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/headers";
import {validate} from '@/api'
import { mapState, mapActions } from "vuex";
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
      showLogin: true,
      showName: false,
      userName: ''
    };
  },
  components: {
    Headers
  },
  computed: {
    ...mapState(["userData"])
  },
  async mounted() {
    let res = await validate()
    console.log(res)
    if (res.code == 0) {
      this.showName = true
      console.log(this.userData)
      this.userName = this.userData.userName

    } else {
      this.showName = false
    }
  },
  methods: {
    ...mapActions(['handleLogout']),
    async logout() {
       this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        content: `是否确认登出账号？`,
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: async () => {
          await this.handleLogout()
          this.showName = false
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '您已成功登出'
          }).show()
        },
      }).show()
    }
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

    .user-name {
      color: black
      position: absolute
      left 50%
      transform translate3d(-50%, 130%,0)
      height  1rem

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