<template>
    <van-popup id="pickerDataContainer" v-model="show" position="bottom" 
        :overlay="true" :close-on-click-overlay="false" :lock-scroll="true"
        @click-overlay="clickOverlay"
        >
        <van-picker show-toolbar :columns="dataList" :title="title" :defaultIndex="dIndex" :value-key="valueKey" @cancel="onCancel" @change="onChange" @confirm="onConfirm" :item-height="34"/>
    </van-popup>
</template>

<script>
import Vue from 'vue';
import { Picker,Popup } from 'vant';

Vue.use(Picker).use(Popup);

export default {
    name: 'pickerDataView',
    props:{
        show:{
            type:Boolean,
            default:false,
        },
        title:{
            type:String,
            default:''
        },
        dataList:{
            type:Array,
            default:()=>{return []}
        },
        defaultIndex:{
            type:Number,
            default:0
        },
        valueKey:{
            type:String,
            default:'text'
        }
        
    },
    data(){
        return{
            dIndex: this.defaultIndex
        }
    },
    created(){
    },
    destroyed(){
    },
    methods: {
        close(){
            this.$emit('update:show', false);
            this.dIndex = 0
        },
        clickOverlay(){
            this.close()
        },
        onCancel(){
            this.$emit('on-cancel')
            this.close()
        },
        onChange(zc,value, index){
            // this.$emit('on-confirm',value, index)
        },
        onConfirm(value, index){
            this.$emit('on-confirm',value, index)
            this.close()
        }
    }
}
</script>

<style lang="scss">
#pickerDataContainer{
    color: #7D7DB5;
    background-color: #2D275C;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
    .van-picker{
        background-color: #2D275C;
        .van-picker__mask{
            background-size: 100% 88px;
            background-image: linear-gradient(to bottom, rgba(45, 39, 92, 0.95), rgba(45, 39, 92, 0.6)), linear-gradient(to top, rgba(45, 39, 92, 0.6), rgba(45, 39, 92, 0.6));
        }
        .van-picker__toolbar{
            background-color: #2D275C;
            .van-picker__title , .van-picker__cancel , .van-picker__confirm{
                font-size: 17px;
                color: #7D7DB5;
                padding: 9px 15px;
                height: 42px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                &:active{
                    background-color: #2D275C;
                }
            }
        }
        .van-picker__columns{
            background-color: #2D275C;
            .van-picker-column__item{
                color: #ffffff;
            }
            .van-hairline--top-bottom{
                color: #fff;
            }
            .van-hairline--top-bottom::after{
                border: none;
                border-bottom: 1px solid #3F3F6D;
                border-top: 1px solid #3F3F6D;
            }

        }
        .van-hairline--top-bottom::after{
            border: none;
            border-bottom: 1px solid #3F3F6D;
        }
    }

}
</style>

