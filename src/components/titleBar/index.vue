<template>
    <div id="eTitle">
        <div class="baseLayout leftLayout">
            <slot name="leftLayout"></slot>
        </div>
        <div class="title">{{title}}</div>
        <div class="baseLayout rightLayout">
            <slot name="rightLayout"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'titleBar',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss">
#eTitle{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    padding: 0 8px;
    box-sizing: border-box;
    display: flex;
    .baseLayout{
        width: 20%;
        display: inline-block;
    }
    .leftLayout{
        text-align: left;
    }
    .rightLayout{
        text-align: right;
    }
    .title{
        flex: 1;
        display: inline-block;
    }
}
</style>
