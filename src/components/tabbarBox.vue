<template>
    <div class='tabbar'>
        <router-link to='/tabbarBox/text'></router-link>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
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
    }
</style>