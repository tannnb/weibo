<template>
  <div class="loginWrapper">
    <van-nav-bar title="用户登录" />
    <van-row>
      <van-col span="22" offset="1">
        <van-cell-group>
          <van-field
            v-model="username"
            clearable
            label="用户名"
            left-icon="contact"
            placeholder="请输入用户名"
          />
          <van-field
            v-model="password"
            clearable
            type="password"
            label="密码"
            left-icon="eye-o"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div class="registerButton" @click="handleRegister">立即注册>></div>
        <van-button type="primary" size="large" @click="handleLogin">注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { isExist, isLogin } from '@/api/user'
import { debounce } from '@/utils/utils'
import { ERROR_NO, SUCCESS_OK } from '@/conf/statusCode'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {},

  mounted () {
  },
  methods: {
    handleLogin () {
      if (!this.username || !this.password) {
        this.$dialog.alert({
          message: '用户名或密码不能为空!'
        })
        return
      }
      this._isLogin(this.username, this.password)
    },
    _isLogin (username, password) {
      isLogin(username, password).then(res => {
        const { code, data, message } = res
        if (code !== SUCCESS_OK) {
          this.$toast(message)
          return
        }
        this.$router.replace('/')
        console.log('data', data.token)
      }).catch(() => {

      })
    },
    handleRegister () {
      this.$router.replace('/register')
    }
  },
  beforeDestroy () {}
}
</script>

<style lang="scss">
.loginWrapper {
  .van-field__right-icon {
    color: #07c160;
  }
  .registerButton {
    margin: 20px 0;
    text-align: right;
    color: #a7a7a7;
  }
}
</style>
