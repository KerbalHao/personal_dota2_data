<template>
  <div class="detail">
    <headers :text='`英雄：${data.name}`'></headers>
        <cube-loading :size="40" v-show='!this.data'></cube-loading>

    <cube-scroll ref="scroll2" class="scroll-list-inner-wrap" nest-mode="free">
      <div class="hero-bg">
        <img :src="data.heroLinkImgSrc" :alt="data.name" />
        <div>
          <h2>背景故事
            <cube-button
              @click="toggle"
              :inline="true"
            >{{description.length > 1 ? '折叠':'展开'}}
            </cube-button>
          </h2>
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
            <img :src="item.icon" alt />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </cube-scroll>
    <cube-button class='like' @click='likeHandler' :inline='true'>
      <i class="cubeic-like" :style="{'color': data.like ? 'orange' : null}"></i>{{data.like ? "已收藏" : "点击收藏"}}
    </cube-button>
  </div>
</template>

<script>
import {showLogin} from '@/components/utils'
import Headers from "@/components/headers.vue";
import {  mapState,mapActions } from "vuex";
import {  validate } from "@/api";
export default {
  data() {
    return {
      description: [],
      data: {},
      show: false,
      id: ''
    };
  },
  mounted() {
    let data  = this.initData.heroes.filter(item => item.id === parseFloat(this.$route.params.id))[0]
    this.id = this.$route.params.id
    this.data = data;
    this.description = data.heroLinkDescription.length > 1? [data.heroLinkDescription[0] + '。。。'] : data.heroLinkDescription
  },
  computed: {
    ...mapState(['initData']),
  },
  methods: {
    ...mapActions(['likeHeroHandler']),

    // 完成显示更多的内容
    toggle() {
      let bg = this.data.heroLinkDescription;
      if (this.description.length == 1) {
        this.description = bg;
      } else if (this.description.length > 1) {
        this.description = [bg[0] + "。。"];
      }

      // 切换显示后，重新计算滚动条数据
      this.$nextTick(() => {
        this.$refs.scroll2.refresh();   
      });
    },


    // 处理点击收藏按钮后的事件
    // 1 若已登录，将该信息发送到后台
    // 若未登录，则要求先登录
    async likeHandler() {
      let res = await validate()
      if (res.code == 0) {
        await this.likeHeroHandler({id:this.data.id,userName:this.initData.userName})
      } else {
        showLogin.call(this)
      }
    }
  },
  components: {
    Headers
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
          height 8rem
          display: flex;
          flex-direction: column;
          width 3rem
        
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