import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { initRouter } from '@/utils/utils.js'

initRouter(Router)
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
  next()
})

export default router
