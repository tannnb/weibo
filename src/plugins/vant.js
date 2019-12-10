import {
  Button,
  Toast,
  NavBar,
  Field,
  CellGroup,
  Row,
  Col,
  Dialog
} from 'vant'

export default {
  install (Vue) {
    Vue.use(NavBar)
    Vue.use(Button)
    Vue.use(Toast)
    Vue.use(CellGroup)
    Vue.use(Field)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Dialog)
  }
}
