import Vue from 'vue'
import axios from 'axios'
import { getToken } from './auth'
import { Toast } from 'vant'
Vue.use(Toast)

// 根据环境切换接口地址
axios.defaults.baseURL = process.env.VUE_APP_API
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }
axios.defaults.timeout = 10000

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
   // Toast.loading({ message: '加载中...' })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
   // Toast.clear()
    return response.data
  }, error => {
   // Toast.clear()
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 400:
          break
        case 401:
          Toast('未登录')
          break
        case 402:
          break
        case 403:
          break
        default:
      }
      return Promise.resolve(error.response)
    }
    return Promise.resolve(error)
  })

export default axios
