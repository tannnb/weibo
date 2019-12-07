<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="root-view"/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: mapState([
    'transitionName'
  ])
}
</script>
<style>
  .route-push-enter,
  .route-pop-leave-active {
    opacity: 0.5;
    transform: translateX(100%);
  }
  .route-push-leave-active,
  .route-pop-enter {
    opacity: 0.5;
    transform: translateX(-100%);
  }
</style>
<style lang="scss">
  #app {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .root-view {
    position: absolute;
    width: 100%;
    background: #fff;
    min-height: 100%;
    transition: opacity 0.5s, transform 0.5s;
  }

</style>
