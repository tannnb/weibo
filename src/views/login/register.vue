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
            @clear="handleClear"
            @blur="handleBlur"
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
        <van-button type="primary" size="large" @click="handleLogin">注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>s

<script>
import { isExist, isRegister } from '@/api/user'
import { debounce } from '@/utils/utils'
import { ERROR_NO, SUCCESS_OK } from '@/conf/statusCode'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: '',
      checked: ''
    }
  },
  created () {},

  mounted () {
    this.$watch('username', debounce((newQuery) => {
      if (!newQuery) {
        this.checked = ''
        return
      }
      this._isExist(newQuery)
    }, 500))
  },
  methods: {
    handleClear () {
      this.checked = ''
      this.errorMessage = ''
    },
    handleBlur () {
      if (!this.username) {
        this.checked = ''
        this.errorMessage = ''
      }
    },
    handleLogin () {
      if (!this.username || !this.password) {
        this.$toast('用户名或密码不能为空')
        return
      }
      this._isRegister(this.username, this.password)
    },
    _isRegister (username, password) {
      isRegister(username, password).then(res => {
        const { code, message } = res
        if (code === ERROR_NO) {
          this.$toast(message)
        }
      }).catch(() => {

      })
    },
    _isExist (username) {
      this.checked = this.errorMessage = ''
      isExist(username).then(res => {
        const { code, message } = res
        if (code === ERROR_NO) {
          this.checked = 'checked'
        }
        if (code === SUCCESS_OK) {
          this.errorMessage = message
        }
      }).catch(() => {
        this.checked = this.errorMessage = ''
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
