<template>
    <div id='index'>
        <div id='box' class='banner'>
            <div class='bannerTitle'>首页</div>
        </div>
        <text ></text>
        <van-grid :column-num="4" class='tabBox' :border='false' >
            <van-grid-item
                v-for="(value, index) in List"
                :key="index"
                @click='message(value)'
            >
            <van-image :src="value.icon" width="47px"/>
                <div style="font-size: 12px;margin-top: 8px">{{value.text}}</div>
            </van-grid-item>
        </van-grid>
        <van-notice-bar
        :text="text"
        left-icon="volume-o"
        color="#111"
        background="#fff">
        <template slot='left-icon'>
            <img class='imgIcon' src="../../../static/images/index/gonggao.png" alt="">
        </template>
        <template slot='right-icon'>
            <img class='imgIcon' src="../../../static/images/index/more.png" alt="" @click='$router.push("/notice")'>
        </template>
        </van-notice-bar>
        <div class="hold"></div>
        <van-grid :column-num="2" class='connected' :border='false'>
            <van-grid-item
                v-for="(value, index) in userList"
                :key="index"
            >
                <router-link :to='value.to'>
            <div style="height:62px;display:flex;width: 112px;align-items: center;color: #111">
                    <van-image :src="value.icon" width="50px" height="50px"/>
                    <div style="margin-left: 10px;font-size: 13px">{{value.title}}</div>
            </div>
                </router-link>
            </van-grid-item>
        </van-grid>
        <div class="hold"></div>
        <div class="present">
            <div class="title">ofc当前价格</div>
            <div class='box_sm'>
                <div class="list">
                    <img src="../../../static/images/index/ofc.png" alt="">
                    <span>1.00000000 ofc ≈ </span>
                    <span class='red'> {{rateObj.CNY}} CNY</span>
                </div>
                <div class="list">
                    <img src="../../../static/images/index/ofc.png" alt="">
                    <span>1.00000000 ofc ≈ </span>
                    <span class='red'>{{rateObj.USDT}} usdt</span>
                </div>
                
            </div>
        </div>
        <div class="hold"></div>
    </div>
</template>
<script>
import Barrage from 'barrage-ui';
import example from 'barrage-ui/example.json';

import { Toast } from 'vant';
import text from '../text'
export default {
    data () {
        return {
            active: 0,
            text: '',
            userList: [
                {
                    to: '/earnings',
                    icon: './static/images/index/earnings.png',
                    title: '我的收益'
                },
                {
                    to: '/wallet',
                    icon: './static/images/index/wallet.png',
                    title: '我的钱包'
                },
                {
                    to: '/inviteFriends',
                    icon: './static/images/index/invite.png',
                    title: '邀请好友'
                },
                {
                    to: '/contactUs',
                    icon: './static/images/index/connection.png',
                    title: '联系我们'
                }
            ]
            ,
            List: [
                {
                    icon: './static/images/index/business.png',
                    text: '商业信息'
                },
                {
                    icon: './static/images/index/live.png',
                    text: '草根直播'
                },
                {
                    icon: './static/images/index/game.png',
                    text: '游戏世界'
                },
                {
                    icon: './static/images/index/lottery.png',
                    text: '幸运博彩'
                },
                {
                    icon: './static/images/index/travel.png',
                    text: '旅游信息'
                },
                {
                    icon: './static/images/index/chat.png',
                    text: '交友聊天'
                },
                {
                    icon: './static/images/index/dial.png',
                    text: '转盘抽奖',
                    to: 'turntable'
                },
                {
                    icon: './static/images/index/moreB.png',
                    text: '更多'
                }
            ],
            classList: [],
            rateObj: {},
        }
    },
    component: {
        text
    },
    mounted() {
    },
    created () {
        // let  status = this.$cookies.get('status')
        // if(status == -1){
        //     Toast('未通过实名认证')
        //     this.$router.push('/authentication')
        //     return
        // }else if(status == -2){
        //     Toast('未认证')
        //     this.$router.push('/authentication')
        //     return 
        // }else if(status ==  0) {
        //     Toast('申请中')
        //     this.$router.push('/login')
        //     return
        // }
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Content",
            interface: "4005",
            data: {}
        }).then(res => {
            if(res.success){
                let text = []
                res.data.forEach((element, index) => {
                    text.push({
                        text: element,
                        key: index,
                        time: 1000*Math.floor(Math.random()*10)
                    })
                });
                this.classList = text
                this.createDM ()
            }
        })
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Content",
            interface: "4004",
            data: {}
        }).then(res => {
            // let text = ''
            // res.data.forEach((element, index) => {
            //     text += index+1 +'.' + element.title + '      '
            // });
            // console.log()
            if(res.success) this.text = res.data[0].title
            
        })
        
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Attachment",
            interface: "2003",
        }).then(res => {
            // let text = ''
            // res.data.forEach((element, index) => {
            //     text += index+1 +'.' + element.title + '      '
            // });
            // console.log()
            if(res.success) this.rateObj = res.data
            
        })
    },
    methods : {
        message (obj) {
            if(obj.to){
                this.$router.push(obj.to)
            }else{
                Toast('功能暂未开放')
            }
        },
        createDM () {
            var that = this
            const barrage = new Barrage({
            container: document.getElementById('box'), // 父级容器
            data: that.classList, // 弹幕数据
            config: {
                // 全局配置项
                duration: 15000, // 弹幕循环周期(单位：毫秒)
                defaultColor: '#e6e6e6', // 弹幕默认颜色
                fontSize: 14,
            },
            avoidOverlap: false,
            });

            // 播放弹幕
            barrage.play();
        }
    }
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
.hold{
    background: #f8f8f8;
    height: 10px;
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
.imgIcon{
    width:22px;
    height: 22px;
}
.tabBox{
    margin: 20px 0 29px;
}
.present{
    height: 154px;
    padding: 5px 16px;
    box-sizing: border-box;
    .title{
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
    }
    .box_sm{
        .list{
            height: 22px;
            display: flex;
            align-items: center;
            font-size: 15px;
            padding: 15px 0;
            img{
                height: 22px;
                width: 22px;
                margin-right: 10px;
            }
            .red{
                color: #FB4B48;
                margin-left: 6px;
            }
        }
    }
}
.connected{
    // width: 343px;
    // padding: 18px 16px;
    margin: 10px 0;
}
</style>