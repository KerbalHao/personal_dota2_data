<template>

  <div class="login">
    <headers text='用户注册'></headers>
    <cube-form  :model="model" @submit.prevent="resister">
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>  
      <cube-form-group>
    <cube-button type="submit">注册</cube-button>
  </cube-form-group>
      </cube-form>
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
    }
  },
  computed: {
    ...mapState(['userData'])
  },
  methods: {
    ...mapActions(['handleRegister']),
    async resister() {
      let code = await this.handleRegister(this.model, errCB.bind(this))
      if (code == 1) {
        this.$createToast({
          txt: '注册失败，该账号已被注册',
          time: 1000,
          type: 'error',
        }).show()
      } else {
        this.$createToast({
          txt: '注册成功，即将自动登录',
          time: 1000,
          type: 'correct'
        }).show()
        setTimeout(() => {
        this.$router.push('/mine')
        }, 1300)
      }
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