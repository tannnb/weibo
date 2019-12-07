<template>
    <transition name="fade">
        <div class="alert-wrapper" @click="handleCloseMask" v-if="isShow">
            <div class="alert-main" @click.stop>
                <div :style="setStyle">
                    <div class="alert-title">{{options.title}}
                        <div class="close" @click.stop="handleClose"></div>
                    </div>
                    <template v-if="options.component && options.componentData">
                        <component v-if="options.component && options.componentData" :is="options.component" :isprops="options.componentData"></component>
                    </template>
                    <template v-if="options.component && !options.componentData">
                        <component v-if="options.component" :is="options.component"></component>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '500'
    },
    maskClick: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  data () {
    return {
      isShow: false,
      options: null,
      barWidth: 0,
      componentData: {}
    }
  },
  watch: {
    isShow (newValue) {
      const body = document.querySelector('body')
      if (newValue === true) {
        // body.style.cssText = `overflow: hidden;padding-right:${this.barWidth}px`
      } else {
        //  body.removeAttribute('style')
      }
    }
  },
  computed: {
    setStyle () {
      if (this.options && this.options.width) {
        return `width:${Number(this.options.width)}px`
      }
      return `width:${Number(this.width)}px`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.barWidth = this.getScrollbarWidth()
    })
    document.addEventListener('keydown', this.EscClose)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.EscClose)
  },
  methods: {
    EscClose (e) {
      if (this.options && this.options.esc === true) {
        if (e.keyCode === 27) {
          this.isShow = false
        }
      }
    },
    show (options) {
      this.isShow = true
      this.options = options
      this.componentData = options.componentData ? options.componentData : {}
    },
    handleClose () {
      this.hide()
    },
    hide () {
      this.isShow = false
    },
    handleCloseMask () {
      if (this.options && this.options.maskClick === false) return
      this.isShow = false
    },
    getScrollbarWidth () {
      let oP = document.createElement('p')
      let styles = { width: '100px', height: '100px', overflowY: 'scroll' }; let i; let scrollbarWidth
      for (i in styles) oP.style[i] = styles[i]
      document.body.appendChild(oP)
      scrollbarWidth = oP.offsetWidth - oP.clientWidth
      oP.remove()
      return scrollbarWidth
    }
  }
}
</script>
<style lang="scss">
    .alert-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        opacity: 1;
        z-index: 3999;
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

        .alert-main {
            position: absolute;
            min-height: 100px;
            left: 50%;
            top: 50%;
            padding: 10px;
            transform: translate(-50%, -50%);
            background: #1e2327;
            border-radius: 6px;

            .model-close {
                z-index: 1;
                position: absolute;
                right: 7px;
                top: 7px;
                width: 20px;
                height: 20px;
                cursor: pointer;

                .close-icon {
                    position: absolute;
                    display: block;
                    width: 20px;
                    height: 20px;

                    &:hover {
                        &::before, &::after {
                            background: #4c8bce;
                        }
                    }

                    &::before, &::after {
                        content: '';
                        width: 20px;
                        height: 1px;
                        background: #999;
                        display: block;
                    }

                    &::before {
                        transform: rotate(45deg);
                        margin-top: 10px;
                    }

                    &::after {
                        transform: translateY(-1px) rotate(-45deg);
                    }

                }
            }

            .alert-title {
                position: relative;
                text-align: center;
                padding: 10px 0;
                font-family: MicrosoftYaHei;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 1px;
                color: #ffffff;
                .close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 18px;
                    height: 18px;
                    z-index: 10;
                    background: url("./close.png") no-repeat;
                    background-size: cover;
                    cursor: pointer;
                    &:hover{
                        background: url("./close_hover.png") no-repeat;
                        background-size: cover;
                    }
                }
            }

            .alert-content {
                min-height: 100px;
            }

            .alert-button {
                display: flex;
                justify-content: center;
                padding-top: 10px;
                font-size: 14px;

                .btn {
                    width: 100px;
                    line-height: 34px;
                    text-align: center;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    cursor: pointer;

                    &.cancel {
                        color: #515a6e;

                        &:hover {
                            color: #2d8cf0;
                        }
                    }

                    &.confirm {
                        margin-left: 20px;
                        color: #fff;
                        background-color: #2d8cf0;
                        border-color: #2d8cf0;

                        &:hover {
                            background: #409af9;
                        }
                    }
                }
            }
        }
    }
</style>
