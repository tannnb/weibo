<template>
  <div>
    登录
    <button @click="handleSend">测试</button>
    <button @click="handleClose">断开连接</button>
    <button @click="handleOpen">重新连接</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'login',
  created () {
    this.socket = io('http://127.0.0.1:3001/chat', {
      // autoConnect: false
    })
    // this.socket.open()
  },

  mounted () {
    this.socket.on('open', (msg) => {
      console.log(msg)
    })
    this.socket.on('hotNews', (msg) => {
      console.log(msg)
    })
  },
  methods: {
    handleSend () {
      this.socket.emit('updateUserInfo', { name: 'admin', age: '18', sex: 1, city: '北京' })
    },
    handleClose () {
      this.socket.close()
    },
    handleOpen () {
      this.socket.open()
    }
  },
  beforeDestroy () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },
}
</script>

<style scoped>

</style>
