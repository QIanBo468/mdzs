<template>
    <div class='tabbar'>
        <router-view style="flex:1; "/>
        <van-tabbar v-model="active" style="height: 50px;    position: sticky">
            <van-tabbar-item  to='/index'>
                <span class='red'>行情</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.active : icon.normal"
                >
            </van-tabbar-item>
            <!-- <van-tabbar-item  to='/mall'>
                <span class='red'>矿机商城</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? mall.active : mall.normal"
                >
            </van-tabbar-item> -->
            <van-tabbar-item to="/transaction" >
                <span class='red'>交易市场</span>
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
                active: './static/images/index/dating@3x.png',
                normal: './static/images/index/dating-s@3x.png',
            },
            mall: {
                active: './static/images/index/huobi-ss@3x.png',
                normal: './static/images/index/huobi-s@3x.png',
            },
            deal: {
                active: './static/images/index/huobi-s@3x.png',
                normal: './static/images/index/huobi-ss@3x.png',
            },
            user: {
                active: './static/images/index/more-s@3x.png',
                normal: './static/images/index/more@3x.png',
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
        /deep/.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
        border-width: 0px;
    }
    .van-tabbar-item{
        background: #0b0c21;
        border: 1px solid #0b0c21;
        // border-width: 0px;
    }
    .van-tabbar-item--active {

        .red{
            color: #358eea;
            font-size: 11px;
        }
    }
</style>