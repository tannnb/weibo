<template>
  <div>
    <div  class="test">跳转测试</div>

    <van-button type="default" @click="handleClick">默认按钮</van-button>
    <van-button type="default" @click="handleClickTest">进入test2</van-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Swipe, SwipeItem, NoticeBar, Icon } from 'vant'

Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NoticeBar)
Vue.use(Icon)

export default {
  name: 'index',
  methods: {
    handleClick () {
      this.$router.back()
    },
    handleClickTest () {
      this.$router.push('/test2')
    }
  }
}
</script>

<style scoped>
.test {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ccc;
}
</style>
