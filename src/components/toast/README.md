# 使用方法

开启toast

``
this.$Toast.show(options)
``

关闭toast

```
this.$Toast.hide()

Toast.hide()   // 需引入toast组件

```


```
options = {
     title:'提示',     // 提示文字：默认为'提示'
     type:'warning',  // 类型[warning,success,error] 默认:warning,输入错误默认为warning
     duration:2000,   // 显示时间，默认2秒; 如设置0 需手动关闭，this.$Toast.hide() 或 Toast.hide() 
}
```
