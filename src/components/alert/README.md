# 使用方法

开启toast

``
this.$Alert.show(options)
``

关闭toast

```
this.$Alert.hide()

Alert.hide()   // 需引入toast组件

```


```
options = {
     title:'提示',            // 标题: 默认值['提示']
     type:'warning',         // 弹框图标类型,默认为warning ["Binding 绑定", "Untied  解绑" , "currency 货币","error  错误","idcard  卡片","lock  锁","question  疑问","success   成功","warning   警告" ] 
     content:'内容',          // 内容文案
     subContent:'',          // 二级内容文案
     maskClick:false,        // 点击蒙版是否关闭弹框,默认不开启false 
     esc:false,              // esc键，关闭弹框，默认不开启false 
     cancelText:'取消',       // 取消按钮文案 
     confirmText:'确定',      // 确定按钮
     cancelBoolean:true,     // 是否显示取消按钮,默认true显示
     duration:5,             // 按钮倒计时默认值
     OpenDuration:false,     // 是否开启按钮倒计时显示
     dataList:[],            // 是否显示列表展示: [ {name:'',value:''} ]
     cancelCallback:() => {}      //点击取消回调
     confirmCallback:() => {}     //点击确定回调
}
```
