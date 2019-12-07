<template>
    <div class="home-wrapper">
      home
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

  mounted () {

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
