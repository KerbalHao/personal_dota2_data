<template>

<div class="login">
  <headers text='用户登录'></headers>
  <div class="header">
    <img src='@/assets/user.jpg'>
  </div>
  <cube-form  :model="model" @submit.prevent="submitHandler" >
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>  
      <cube-form-group>
        <cube-button type="submit" :primary='true'>登录</cube-button>
      </cube-form-group>
    </cube-form>
    <cube-button type="submit" @click="showRegister">注册</cube-button>

</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import headers from '@/components/headers'
import { errCB } from '@/components/utils'

export default {
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        userName: '',
        passWord: '',
      },
      fields: [
        {
          type: 'input',
          modelKey: 'userName',
          label: '用户名',
          props: {
            placeholder: '请输入用户名'
          },
          trigger: blur,
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'passWord',
          label: '密码',
          props: {
            type:'password',
            placeholder: '请输入密码'
          },
          trigger: blur,
          rules: {
            required: true
          }
        }
      ],
      from: '/home'
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapActions(['setUser']),
     async submitHandler() {
      await this.setUser(this.model,errCB.bind(this))
      this.$nextTick(() => {
        if (this.userData.userName !== undefined && this.userData.userName !=='dota2' ) {
          this.$createToast({
            txt: this.userData.userName + '登陆成功',
            time: 500,
            type: 'correct',
            onTimeout: () => {
              this.$router.go(-1)
            }
          }).show()
        } else {
          this.$createToast({
            txt: '登陆失败，请检查用户名或密码是否正确',
            time: 500,
            type: 'error',
          }).show()
        }       
      })
    }, 
    showRegister() {
      this.$router.push('/mine/resister')
    },
  },
  components: {
    headers
  }
}
</script>


<style lang='stylus' scoped>
.header
    position relative
    border .05rem solid white
    border-top 0
    background black
    background-size 25%
    height 10rem
    line-height 10rem
    img 
      width 5rem
      border-radius 50%
      border .05rem solid black
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
</style>