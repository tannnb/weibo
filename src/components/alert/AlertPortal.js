import Alert from './alert.vue'
import Vue from 'vue'

Alert.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Alert, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const alert = Instance.$children[0]

  return {
    show (noticeProps) {
      alert.show({
        title: '提示',
        type: 'warning',
        content: '内容', // 一级内容
        subContent: '', // 二级内容
        width: '100',
        maskClick: false,
        esc: false,
        cancelText: '取消',
        duration: 5,
        OpenDuration: false,
        cancelBoolean: true,
        confirmText: '确定',
        dataList: [],
        ...noticeProps
      })
    },
    hide () {
      alert.hide()
    }
  }
}

export default Alert
