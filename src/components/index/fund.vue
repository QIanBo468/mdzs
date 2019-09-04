<template>
    <div id='fund'>
         <van-nav-bar
            title="爱心基金"
            left-arrow
            :border="false"
            @click-left="onClickLeft"
        />
        <div class='statis'>
            <div class='statisTitle'>当前余额</div>
            <div class='transferBox'>
                <div>{{live.creditValue}}</div>
                <div>转账</div>
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
export default {
    data () {
        return {
            active: 0,
            live: {},
            list: [],
            finished: false,
            loading: false,
            lastPage: null,
            page: 1,
            lastId: 0,
        }
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
                    data: {lastId: this.lastId,page: this.page ++,creditType: 'credit_3',direction: direction}
                }).then(res => {
                    this.lastPage = res.data.lastPage
                    this.lastId = res.data.lastId
                    this.live = res.data
                    this.loading = false;
                    this.list = this.list.concat(res.data.list)
                })
            }
        }
    }
}
</script>
<style lang="less">
    #fund{
        .van-nav-bar{
            background:linear-gradient(180deg,#FD5966 0%,#FA4A58 100%);
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
#fund{
    width: 100%;
    height: 100%;
    background: #F8F8F8
}
.statis{
    height: 107px;
    background:linear-gradient(180deg,#FA4A58 0%, #F42D3D 100%);
    padding: 30px  23px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    .statisTitle{
        height: 20px;
        line-height: 20px;
    }
    .transferBox{
        display: flex;
        justify-content: space-between;
        height: 32px;
        line-height: 32px;
        font-size: 23px;
        div:first-child{
            width: 70%;
        }
        div:last-child{
            font-size: 12px;
            border: 1px solid #fff;
            text-align: center;
            line-height: 22px;
            border-radius: 13px;
            width: 52px;
            height: 22px;
            box-sizing: border-box;
        }
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
        width: 100px;
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
</style>