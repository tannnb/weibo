import { Button, Toast, NavBar } from 'vant'

export default {
  install (Vue) {
    Vue.use(NavBar)
    Vue.use(Button)
    Vue.use(Toast)
  }
}
