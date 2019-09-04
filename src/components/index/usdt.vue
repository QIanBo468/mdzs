<template>
    <div id='usdt'>
         <van-nav-bar
            title="usdt"
            left-arrow
            :border="false"
            @click-left="onClickLeft"
        />
        <div class='statis'>
            <div>当前余额</div>
            <div>{{usdt.creditValue}}</div>
        </div>
        <div class='deposit' style="height: 40px;diplay:flex;">
            <div>
                <!-- <router-link to='/charge'> -->
                    <img src="../../../static/images/index/chongzhi.png" alt="">
                    <span>充币</span>   
                <!-- </router-link> -->
            </div>
            <div @click='$router.push({path: "/extract", query: {usdt: usdt.creditValue}})'>
                <img src="../../../static/images/index/extract.png" alt="">
                <span>提币</span>  
            </div>
            <div>
                <img src="../../../static/images/index/transfer.png" alt="">
                <span>转账</span>  
            </div>
        </div>
        <van-tabs v-model="active" @change="acChange">
            <van-tab title="所有明细">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list" v-for='(item, index) in list' :key='index'>
                        <ul>
                            <li class='overText'>{{item.remark}}</li>
                            <li>{{item.createdAt}}</li>
                        </ul>
                        <div  :class='[item.type == 1 ? "blue": "","overText"]'>
                            {{item.num}}
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="收入">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <div class="list" v-for='(item, index) in list' :key='index'>
                    <ul>
                        <li class='overText'>{{item.remark}}</li>
                        <li>{{item.createdAt}}</li>
                    </ul>
                    <div  :class='[item.type == 1 ? "blue": "","overText"]'>
                        {{item.num}}
                    </div>
                </div>
                </van-list>
            </van-tab>
            <van-tab title="支出">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list" v-for='(item, index) in list' :key='index'>
                        <ul>
                            <li class='overText'>{{item.remark}}</li>
                            <li>{{item.createdAt}}</li>
                        </ul>
                        <div  :class='[item.type == 1 ? "blue": "","overText"]'>
                            {{item.num}}
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data () {
        return {
            active: 0,
            usdt: {},
            list: [],
            finished: false,
            loading: false,
            lastPage: null,
            page: 1,
            lastId: 0,
        }
    },
    created () {
        // this.$axios.fetchPost('/portal',
        // {
        //     source: "web",
        //     version: "v1",
        //     module: "Finance",
        //     interface: "2100",
        //     data: {lastId: 0,page: 1,creditType: 'credit_2 ',direction: ''}
        // }).then(res => {
        //     this.usdt = res.data
        //     this.list = res.data.list
        // })
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        acChange(){
            this.finished = false
            this.loading = false
            this.lastPage = null
            this.page = 1
            this.lastId = 0
            this.list = []
            setTimeout(()=> {

                this.onLoad ()
            },1000)
        },
        onLoad () {
            let type = this.active,direction = ''
            if( type == 0 ){
                direction = ''
            }else if(type == 1) {
                direction = '1'
            }else{
                direction = '-1'
            }
            if (this.lastPage && this.lastPage < this.page) {
                this.finished = true
                this.loading = false;
                console.log(123)
            }else{
                this.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Finance",
                    interface: "2100",
                    data: {lastId: this.lastId,page: this.page ++,creditType: 'credit_2 ',direction: direction}
                }).then(res => {
                    this.lastPage = res.data.lastPage
                    this.lastId = res.data.lastId
                    this.usdt = res.data
                    this.loading = false;
                    this.list = this.list.concat(res.data.list)
                })
            }
        }
    }
}
</script>
<style lang="less">
    #usdt{
        .van-nav-bar{
            background:linear-gradient(180deg,#3FCFFE 0%,#39B2F8 100%);
            .van-icon {
                color: #fff;
            }
            .van-nav-bar__title{
                color: #fff;
            }
        }
        .van-tabs__line{
            width: 34px!important;
            border-radius:1px;
        }
        .van-tab--active{
            .van-ellipsis{
                font-size: 14px;
                color: #F84D4D!important
            }
        }
        .van-ellipsis{
            color: #999999;
        }
        .van-tabs__content{
            background: #fff;
        }
    }
</style>
<style lang="less" scoped>
#usdt{
    width: 100%;
    height: 100%;
    background: #F8F8F8
}
.statis{
    height: 107px;
    background:linear-gradient(180deg,#39B2F8 0%, #2F80ED 100%);
    padding: 30px  23px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    div{
        height: 20px;
        line-height: 20px;
    }
    div:last-child{
        height: 32px;
        line-height: 32px;
        font-size: 23px;
    }
}
.list{
    padding: 5px 0;
    width: 343px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    background: #fff;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
    ul{
        width: 120px;
        overflow: hidden;
        height: 100%;
        li{
            font-size: 14px;
            color: #666666;
            height: 20px;
            line-height: 20px;
        }
        li:last-child{
            font-size: 11px;
            color: #999999;
            height: 16px;
            margin-top: 5px;
            line-height: 16px;
        }
    }
    div{
        width: 130px;
        text-align: right;
        font-size: 16px;
        color: #F84D4D;
    }
    .blue{
        color: #1890FF;
    }
}
.deposit{
    background: #fff;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    div{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        span{
            color: #666;
        }
        img{
            width: 20px;
            margin-right: 5px;
            height: 20px;
        }
    }
}
    // .{
    //     background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%);
    // }
    // 
    // 
</style>