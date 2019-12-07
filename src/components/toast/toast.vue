<template>
    <transition name="fade">
        <div class="toast-wrapper" @click.stop v-if="isShow">
          <div class="toast-main">
              <div class="img"><van-icon :name="typeState" /></div>
              <div class="content">{{options.title}}</div>
          </div>
        </div>
    </transition>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)
export default {
  data () {
    return {
      isShow: false,
      options: null,
      typeState: 'warning'
    }
  },
  methods: {
    show (options) {
      this.isShow = true
      this.options = options
      this.typeState = this._filterIcon(options.type)
      if (options.duration === 0) {
        return
      }
      this.times = setTimeout(() => {
        this.hide()
      }, options.duration || 2000)
    },
    hide () {
      this.isShow = false
    },
    _filterIcon (name) {
      if (!name || name.length === 0) return 'warning-o'
      const iconArr = ['warning', 'success', 'error']
      let stateIcon = {
        'warning': 'warning-o',
        'success': 'passed',
        'error': 'close'
      }
      for (let i = 0; i < iconArr.length; i++) {
        if (iconArr[i] === name) {
          return stateIcon[name]
        }
      }
      return 'warning-o'
    }
  },
  destroyed () {
    this.time && clearTimeout(this.times)
  }
}
</script>
<style scoped lang="scss">
    .toast-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 1;
        z-index: 200;

        &.fade-enter-active, &.fade-leave-active {
            transition: all 0.2s;

            .alert-main {
                transition: all 0.3s
            }
        }

        &.fade-enter, &.fade-leave-active {
            opacity: 0;
            background: rgba(0, 0, 0, 0);

            .alert-main {
                // transform: translate3d(0, 0, 0)
            }
        }

        .toast-main {
            position: absolute;
            width: 70%;
            left: 50%;
            top: 50%;
            padding: 10px;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            text-align: center;
            .img {
                width: 30px;
                height: 30px;
                margin: 0 auto;
                font-size: 28px;
                color: #fff;
            }
            .content {
                padding: 10px 0;
                text-align: center;
                color: #ffffff;
            }
        }
    }
</style>
