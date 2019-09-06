<template>
    <div class='tabbar'>
        <router-view style="flex:1; "/>
        <van-tabbar v-model="active" style="height: 50px;    position: sticky">
            <van-tabbar-item  to='/index'>
                <span class='red'>首页</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.active : icon.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item  to='/mall'>
                <span class='red'>商城</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? mall.active : mall.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/transaction" >
                <span class='red'>交易中心</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? deal.active : deal.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item to='/myIndex'>
                <span class='red'>我的</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? user.active : user.normal"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: 0,
            icon: {
                active: './static/images/index/index_active.png',
                normal: './static/images/index/index.png',
            },
            mall: {
                active: './static/images/index/kuangji_active.png',
                normal: './static/images/index/kuangji.png',
            },
            deal: {
                active: './static/images/index/deal_active.png',
                normal: './static/images/index/deal.png',
            },
            user: {
                active: './static/images/index/user_active.png',
                normal: './static/images/index/user_ico.png',
            }
        }
    },
    created () {
        if(this.$route.path == '/mall') {
            this.active = 1;
        }else  if(this.$route.path == '/transaction') {
            this.active = 2;
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
    .van-tabbar-item--active {

        .red{
            color: #F84D4D
        }
    }
</style>