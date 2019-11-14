<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* @import'./utils/utils.less'; */
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  width: 100%;
  height: 100%;
  background: #0C0C0C;
  /* text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
.van-nav-bar{
    color: #fff;
    /* background: #0d0900 !important; */
}
.van-nav-bar .van-nav-bar__title{
  color: #fff;
}
.van-nav-bar .van-icon{
  color: #fff;
}
.tabbar{
  background: #0b0c21;
}
.overText{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>
