<template>
  <div class="detail">
        <cube-loading :size="40" v-show='!this.data'></cube-loading>

    <cube-scroll ref="scroll2" class="scroll-list-inner-wrap" nest-mode="free">
      <div class="hero-bg">
        <img :src="data.heroLinkImgSrc" :alt="data.name" />
        <div>
          <h2>背景故事<cube-button
              v-if="show"
              @click="toggle"
              :inline="true"
            >{{description.length > 1 ? '折叠':'展开'}}</cube-button></h2>
            <div>
            <p v-for="(paragraph,index) in description" :key="index">{{paragraph}}</p>
          </div>
        </div>
      </div>
      <div class="hero-info">
        <h2>英雄基本信息</h2>
        <span>昵称：{{data['真名']}}</span>
        <span>定位：{{data.Roles}}</span>
        <span>阵营：{{data.Team}}</span>
        <span>攻击方式: {{data.attackType}}</span>
        <span>英雄类型：{{data.AttributePrimary}}</span>
      </div>
      <div class="abilities">
        <h2>英雄技能</h2>
        <ul>
          <li class="ability" v-for="item in data.Abilities" :key="item.id">
            <img :src="`http://i1.17173cdn.com/xz7c5b/YWxqaGBf/images/data/${item.icon}`" alt />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <cube-button class='like' @click='likeHandler' :inline='true'>
      <i class="cubeic-like" :style="{'color': data.like ? 'pink' : null}"></i>收藏
    </cube-button>
  </div>
</template>

<script>
// import Header from '@/components/header
// import {showLogin} from '@/components/utils'
import { mapActions, mapState,mapMutations } from "vuex";
import { getDetail, validate} from "@/api";
export default {
  data() {
    return {
      description: [],
      data: {},
      show: false
    };
  },
  async mounted() {
    let [data] = await getDetail(this.$route.params.id);

    let description = data.heroLinkDescription;

    this.data = data;

    this.seperateP(description);

    this.setHeaderName("英雄：" + data.name);
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(["setHeaderName"]),
    ...mapMutations(['setUserData']),

    // 完成显示更多的内容
    toggle() {
      let bg = this.data.heroLinkDescription;
      if (this.description.length == 1 && this.show) {
        this.description = bg;
      } else if (this.description.length > 1) {
        this.description = [bg[0] + "。。"];
      }

      // 切换显示后，重新计算滚动条数据
      this.$nextTick(() => {
        this.$refs.scroll2.refresh();   
      });
    },

    // 将描述根据句号分段
    seperateP(longSentence) {
      // 使用 reg.exec 完成对 句号 的匹配和索引的查找
      let reg = new RegExp("。", "g");
      let matched = reg.exec(longSentence);
      let indexArray = [0];

      while (matched !== null) {
        indexArray.push(matched.index + 1);
        matched = reg.exec(longSentence);
      }

      let i = 0;
      while (i < indexArray.length - 1) {
        this.description.push(
          longSentence.slice(indexArray[i], indexArray[i + 1])
        );
        i++;
      }

      // 将修改的段落保存到 data 中
      this.data.heroLinkDescription = this.description;

      // 控制显示隐藏长文字
      if (this.description.length > 1) {
        this.show = true;
        this.description = [this.description[0] + "。。。"];
      }
    },

    // 处理点击收藏按钮后的事件
    // 1 若已登录，则将该英雄数据存储起来，并将该信息发送到后台
    // 若未登录，则要求先登录
    likeHandler() {
      validate()

      // if (this.user.userName) {
      //   this.data.like = true
      //   this.setUserData({type: 'like',content: this.data})
      // } else {
      //   showLogin.call(this)
      // }
    }
  }
};
</script>

<style lang='stylus' scoped>
.detail 
  .cube-scroll-wrapper 
    height: calc(100vh - 5.5rem);
    font-size: 0.75rem;

    .hero-bg 
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 0.05rem solid white;

      img 
        width: 50%;
        border: 0.05rem solid orange;
        margin: 1rem auto;
      div
      position relative
        h2
          position sticky
          position -webkit-sticky
          top 6rem
          button
            position absolute
            right 0
      div 
        p 
          margin: 0.5rem;
          text-align: left;
          text-indent: 2rem;
          line-height: 1rem;
        
      
    

    .hero-info 
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 0.05rem solid white;
      margin-bottom: 0.5rem;

      span 
        margin: 0.5rem;
      

      h2 
        width: 100%;
      
    

    .abilities 
      ul 
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;

        li 
          display: flex;
          flex-direction: column;
        
.like
  position absolute
  top 2rem
  right 0
  z-index 10
  
    
  


h2 
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.05rem solid white;



</style>