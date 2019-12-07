<template>
  <div class="layout__wrapper">
    <van-nav-bar :title="title" />
    <router-view class="rContainer" />
    <van-tabbar @change="handleChange" v-model="activeBar">
      <van-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :to="item.to"
        :icon="item.icon"
        replace>
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem, NavBar } from 'vant'

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)

export default {
  name: 'mainLayout',
  data () {
    return {
      activeBar: 0,
      title: '标题',
      tabbarList: [
        {
          name: 'home',
          to: '/home',
          icon: 'wap-home',
          showName: '首页',
          title: '首页'
        },
        {
          name: 'message',
          to: '/message',
          icon: 'chat',
          showName: '消息',
          title: '消息'
        },
        {
          name: 'find',
          to: '/find',
          icon: 'browsing-history',
          showName: '发现',
          title: '发现'
        },
        {
          name: 'user',
          to: '/user',
          icon: 'friends',
          showName: '我的',
          title: '我的'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler (newValue) {
        this.title = newValue.meta.title
      },
      deep: true
    }
  },
  activated () {
    this.tabbarList.findIndex((item, index) => {
      if (this.$route.name === item.name) {
        this.activeBar = index
      }
    })
    this.title = this.$route.meta.title
  },
  methods: {
    handleChange (active) {
      this.activeBar = active
    }
  }
}
</script>

<style lang="scss" scoped>
.layout__wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .rContainer {
    flex: 1;
    margin-bottom: 50px;
    overflow: hidden;
  }
}
</style>
