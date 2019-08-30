<template>
    <div class='tabbar'>
        <router-view style="flex:1; "/>
        <van-tabbar v-model="active" style="height: 50px;    position: sticky">
            <van-tabbar-item icon="home-o" to='/tabbarBox'>标签</van-tabbar-item>
            <van-tabbar-item icon="search" to='/tabbarBox/text'>标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: 0,
        }
    },
}
</script>
<style lang="less" scoped>
    .tabbar{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>