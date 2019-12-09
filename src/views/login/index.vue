<template>
  <div class="loginWrapper">
    <van-row>
      <van-col span="22" offset="1">
        <van-cell-group>
          <van-field
            v-model="username"
            clearable
            label="用户名"
            left-icon="contact"
            :right-icon="checked"
            placeholder="请输入用户名"
            :error-message="errorMessage"
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
        <van-button type="primary" size="large" @click="handleLogin">登录</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { isExist } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      checked: 'checked'
    }
  },
  created () {},

  mounted () {},
  methods: {
    handleLogin () {
      console.log('asd')
      isExist(this.username).then(res => {
        console.log('res', res)
      })
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
}
</style>
