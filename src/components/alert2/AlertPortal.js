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
        content: '内容',
        width: '500',
        maskClick: false,
        esc: false,
        cancelBoolean: false,
        component: null,
        componentData: null,
        ...noticeProps
      })
    },
    hide () {
      alert.hide()
    }
  }
}

export default Alert
