<template>
    <div class='tabbar'>
        <router-view style="flex:1; "/>
        <van-tabbar v-model="active" style="height: 50px;    position: sticky">
            <van-tabbar-item icon="home-o" to='/tabbarBox'>首页</van-tabbar-item>
            <van-tabbar-item icon="search" to='/mall'>商城</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to='/mall'>交易中心</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to='/myIndex'>我的</van-tabbar-item>
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
    created () {
        if(this.$route.path == '/mall') {
            this.active = 1;
        }else if(this.$route.path == '/myIndex'){
            this.active = 3
        }
    }
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