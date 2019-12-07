import Toast from './toast.vue'
import Vue from 'vue'

Toast.newInstance = properties => {
  const props = properties || {}

  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Toast, {
        props: props
      })
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const toast = Instance.$children[0]

  return {
    show (noticeProps) {
      toast.show({
        title: '提示',
        type: 'warning',
        duration: 2000,
        ...noticeProps
      })
    },
    hide () {
      toast.hide()
    }
  }
}

export default Toast
