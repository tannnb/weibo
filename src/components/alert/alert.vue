<template>
    <transition name="fade">
        <div class="alert-wrapper" @click="handleCloseMask" v-if="isShow">
            <div class="alert-main" @click.stop>
                <div class="title-icon">
                    <div class="icon">
                     <!-- <img :src="require(`../../assets/img/alert/${titleIconUrl}.png`)" alt="">-->
                    </div>
                </div>
                <div v-for="(item,index) in angle" :class="item.name" class="angleItem" :key="index"></div>

                <div class="alert-title">{{options.title}}</div>
                <div class="alert-content">{{options.content}}</div>
                <div v-if="options.subContent && options.subContent.length > 0" class="alert-content">{{options.subContent}}</div>
                <div v-if="options.dataList && options.dataList.length > 0" class="alert-datalist">
                    <div class="item" v-for="(item,index) in options.dataList" :key="index">
                        <span class="label">{{item.name}}</span>：
                        <span class="value">{{item.value}}</span>元
                    </div>
                </div>

                <!-- 按钮区 -->
                <div class="alert-button">
                    <template v-if="options.cancelBoolean">
                        <div v-if="options.cancelBoolean" class="btn cancel" @click.stop="handleCancel">{{options.cancelText}}</div>
                        <div class="line"></div>
                        <div class="btn confirm" @click.stop="handleConfirm">
                            {{options.confirmText}}
                            <span v-if="options.OpenDuration">({{times}})</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="lonely" @click.stop="handleConfirm">{{options.confirmText}}</div>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      options: null,
      angle: [
        { name: 'left-top' },
        { name: 'right-top' },
        { name: 'left-down' },
        { name: 'right-down' }
      ],
      titleIconUrl: 'warning',
      times: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.addEventListener('keydown', this.EscClose)
    })
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.EscClose)
    this.timeInter && clearInterval(this.timeInter)
  },
  methods: {
    EscClose (e) {
      if (this.options && this.options.esc === true) {
        if (e.keyCode === 27) {
          this.hide()
        }
      }
    },
    show (options) {
      this.isShow = true
      this.options = options
      this.titleIconUrl = this._titleIconUrl(options.type)
      this.times = options.duration

      // 自动关闭
      if (options.OpenDuration) {
        if (options.duration !== 0) {
          this.times = options.duration
          this.timeInter = setInterval(() => {
            this.times--
            if (this.times <= -1) {
              clearInterval(this.timeInter)
              this.hide()
            }
          }, 1000)
        }
      }
    },
    hide () {
      this.timeInter && clearInterval(this.timeInter)
      this.isShow = false
    },
    handleCloseMask () {
      this.options.closeCallback && this.options.closeCallback()
      this.hide()
    },
    handleCancel () {
      this.options.cancelCallback && this.options.cancelCallback()
      this.hide()
    },
    handleConfirm () {
      this.options.confirmCallback && this.options.confirmCallback()
      this.hide()
    },
    _titleIconUrl (type) {
      if (!type || type.length === 0) return 'warning'
      const iconArr = ['Binding', 'Untied', 'currency', 'error', 'idcard', 'lock', 'question', 'success', 'warning']
      for (let i = 0; i < iconArr.length; i++) {
        if (iconArr[i] === type) {
          return iconArr[i]
        }
      }
      return 'warning'
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
        z-index: 199;

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
            width: 70%;
            min-height: 100px;
            left: 50%;
            top: 50%;
            padding: 10px;
            transform: translate(-50%, -50%);
            background-color: #03030f;
            box-shadow:0 3px 25px 0 #422e7e inset;
            border: 1px solid #34348B;

            .title-icon {
                position: absolute;
                top: -57px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 120px;
             /*   background: url("../../assets/img/alert/titleIcon.png") no-repeat;*/
                background-size: contain;
                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 25px;
                    left: 29px;
                    width: 66px;
                    height: 66px;
                    border-radius: 50%;
                    img {
                        vertical-align: top;
                        width: 80%;
                    }
                }
            }
            .angleItem {
                position: absolute;
                width: 12px;
                height: 12px;
               /* &.left-top {
                    top: -2px;
                    left: -2px;
                    background: url("../../assets/img/alert/left-top.png") no-repeat;
                }
                &.right-top {
                    top: -2px;
                    right: -2px;
                    background: url("../../assets/img/alert/right-top.png") no-repeat;
                }
                &.left-down {
                    bottom: -2px;
                    left: -2px;
                    background: url("../../assets/img/alert/left-down.png") no-repeat;
                }
                &.right-down {
                    bottom: -2px;
                    right: -2px;
                    background: url("../../assets/img/alert/right-down.png") no-repeat;
                }*/
            }

            .alert-title {
                margin-top: 45px;
                padding-bottom: 24px;
                font-size: 16px;
                color: #5555EC;
                font-weight: bold;
                letter-spacing: -0.27px;
                text-align: center;
            }

            .alert-content {
                font-size: 12px;
                color: #595983;
                padding: 0 3px;
                letter-spacing: 0;
                text-align: center;
                line-height: 18px;
            }
            .alert-datalist {
                padding-top: 10px;
                .item {
                    font-size: 13px;
                    line-height: 18px;
                    .label {
                        display: inline-block;
                        min-width: 80px;
                        padding-left: 20%;
                        text-align: right;
                    }
                    .value {
                        display: inline-block;
                        color: #DA3B3B;
                    }
                }
            }

            .alert-button {
                display: flex;
                justify-content: center;
                padding-top: 10px;
                font-size: 14px;

                .lonely {
                    width: 160px !important;
                    margin: 25px 0;
                    line-height: 28px;
                    text-align: center;
                    border: 1px solid transparent;
                    border-radius: 2px;
                    color: #fff;
                    font-size: 12px;
                    background-image: linear-gradient(-48deg, #5A2163 5%, #1E166B 100%);
                }
                .line {
                    width: 10px;
                    height: 10px;
                }
                .btn {
                    flex: 1;
                    margin: 25px 0;
                    line-height: 28px;
                    text-align: center;
                    border: 1px solid transparent;
                    border-radius: 2px;
                    cursor: pointer;
                    &.cancel {
                        color: #fff;
                        font-size: 12px;
                        border-radius: 2px;
                        border: 1px solid #5454e9;
                        box-shadow: 0 3px 15px 0 #382988 inset;
                    }

                    &.confirm {
                        color: #fff;
                        font-size: 12px;
                        background-image: linear-gradient(-48deg, #5A2163 5%, #1E166B 100%);
                        border-radius: 2px;

                    }
                }

            }
        }
    }
</style>
