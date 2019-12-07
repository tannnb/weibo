<template>
    <div id="userContainer">
        <div class="scroll-wrapper">
            <Scroll ref="scroll"
                    :scroll-events="['scroll']"
                    :options="scrollOptions"
                    @scroll="onScrollHandle"
                    @pulling-down="onPullingDown">
                <div class="item" v-for="item in 100" :key="item" >{{item}}</div>
                <template slot="pulldown" slot-scope="props">
                    <div
                            v-if="props.pullDownRefresh"
                            class="cube-pulldown-wrapper"
                            :style="pullDownStyle">
                        <div class="pulldown-content">
                            <span v-if="props.beforePullDown">{{ pullDownTip }}</span>
                            <template v-else>
                                <span v-if="props.isPullingDown">正在更新...</span>
                                <span v-else>更新成功</span>
                            </template>
                        </div>
                    </div>
                </template>
            </Scroll>
        </div>

    </div>
</template>

<script>
    import Scroll from '@/components/scroll/scroll'
export default {
    data() {
        return {
            scrollOptions: {
                pullDownRefresh: {
                    threshold: 60,
                    stop: 40,
                    txt: '更新成功'
                }
            },
            pullDownY: 0,
            pullDownStyle: '',
            opacityStyle: '',
            triggerSurpriseFlag: false,
            triggerSurprise: false
        }
    },
    computed: {
        pullDownTip() {
            if (this.pullDownY <= 60) {
                return '下拉刷新...'
            } else if (this.pullDownY <= 90) {
                return '继续下拉有惊喜...'
            } else {
                return '松手得惊喜！'
            }
        }
    },
    components:{Scroll},
    methods: {
        onScrollHandle(pos) {
            this.pullDownY = pos.y
            if (pos.y > 0) {
                this.pullDownStyle = `top:${pos.y}px`
                this.triggerSurpriseFlag = false
                if (this.pullDownY > 90) {
                    this.triggerSurpriseFlag = true
                }
            }
        },
        onPullingDown() {
            if (this.triggerSurpriseFlag) {
                this.triggerSurprise = true
                this.$refs.scroll.forceUpdate()
                return
            }
            setTimeout(() => {
                this.$refs.scroll.forceUpdate()
            }, 1000)
        },
        onImgLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
    position: absolute;
    top: 100px;
    bottom: 100px;
    left:0;
    right: 0;
    overflow: hidden;
    .item {
        width: 100%;
        height: 20px;
        margin-bottom: 10px;
    }
    .cube-pulldown-wrapper {
        transform: translateY(-100%);
        line-height: 0;
        .pulldown-content {
            width: 100%;
            span {
                position: absolute;
                bottom: 15px;
                left: 0;
                right: 0;
                margin: auto;
                width: 200px;
                text-align: center;
                color: #eee;
                font-size: 14px;
            }
        }
    }
}
</style>
