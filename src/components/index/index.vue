<template>
    <div id='index'>
        <div class='banner'>
            <div class='bannerTitle'>首页</div>
        </div>
        <van-grid :column-num="4" class='tabBox' :border='false'>
            <van-grid-item
                v-for="(value, index) in List"
                :key="index"
            >
            <van-image :src="value.icon" width="47px"/>
            <div style="font-size: 12px;margin-top: 8px">{{value.text}}</div>
            </van-grid-item>
        </van-grid>
        <van-notice-bar
        text="提现钱包满100usdt可兑换ofc，ofc提币可12小时内1111111111111111111"
        left-icon="volume-o"
        />

        <van-grid :column-num="2" class='connected' :border='false'>
            <van-grid-item
                v-for="value in 4"
                :key="value"
            >
                <router-link to='earnings'>
            <div style="height:62px;display:flex;width: 112px;align-items: center;">
                    <van-image src="../../static/images/index/business.png" width="50px" height="50px"/>
                    <div style="margin-left: 10px;font-size: 13px">我的收益</div>
            </div>
                </router-link>
            </van-grid-item>
        </van-grid>
        
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data () {
        return {
            active: 0,
            List: [
                {
                    icon: '../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../../static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: '../../static/images/index/business.png',
                    text: '商业信息'
                }
            ]
        }
    },
}
</script>
<style lang="less">
    .tabBox{
        .van-grid-item__content{
            padding: 5px 6px;
        }
    }
    .connected .van-grid-item__content{
        padding: 0;
    }
</style>
<style lang="less" scoped>
#index{
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.banner{
    width: 100%;
    height: 200px;
    background: url('../../../static/images/index/banner.png');
    background-size: 100% 100%;
    .bannerTitle{
        padding-top: 29px;
        text-align: center;
        height: 25px;
        line-height: 25px;
        color: #fff;
        font-size: 18px;
    }
}
.tabBox{
    margin: 20px 0 29px;
}
.connected{
    // width: 343px;
    // padding: 18px 16px;
    margin: 10px 0;
}
</style>