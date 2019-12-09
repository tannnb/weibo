<template>
    <div class="home-wrapper">
      home
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Swipe, SwipeItem, NoticeBar, Icon } from 'vant'

import io from 'socket.io-client'

Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NoticeBar)
Vue.use(Icon)

export default {
  name: 'home',
  data () {
    return {
      show: false,
      bannerSource: [],
      noticeSource: [],
      gameListSource: [],
      betAmount: null
    }
  },
  created () {
    this.socket = io('http://127.0.0.1:3001/news')
  },
  mounted () {
    this.socket.on('open', (msg) => {
      console.log(msg)
    })
  },
  methods: {
    handleClick () {
      this.$router.push('/test')
    },
    handelAlert () {

    }
  }
}
</script>

<style scoped lang="scss">

</style>
