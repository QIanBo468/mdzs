<template>
    <div id='earnings'>
         <van-nav-bar
            title="我的收益"
            left-arrow
            :border="false"
            @click-left="onClickLeft"
        />
        <div class='statis'>
            <div>累计获得收益（ofc）</div>
            <div>{{earnings.total}}</div>
        </div>
        <div class='firstTitle'>
            <span></span>
            <span>单项获得收益</span>
        </div>
        <div class='earningsInfo'>
            <div class='box'>
                <div>
                    <img src="../../../static/images/index/kuang.png" alt="">
                    <div>矿机收益</div>
                </div>
                <div class='num'>{{earnings.machine}}</div>
            </div>
            <div class='box'>
                <div>
                    <img src="../../../static/images/index/kuang.png" alt="">
                    <div>矿长收益</div>
                </div>
                <div class='num'>{{earnings.manager}}</div>
            </div>
            <div class='box'>
                <div>
                    <img src="../../../static/images/index/kuang.png" alt="">
                    <div>大使收益</div>
                </div>
                <div class='num'>{{earnings.ambassador}}</div>
            </div>
        </div>
        <div class='firstTitle' @click="goEarningsList">
            <!-- <router-link to='earningsList'> -->
                <span></span>
                <span>收益明细</span>
                <div>更多></div>
            <!-- </router-link> -->
        </div>
        <div class="list" v-for='(item, index) in earnings.list' :key='index'>
            <ul>
                <li class='overText'>{{item.creditName}}</li>
                <li>{{item.createdAt}}</li>
            </ul>
            <div>
                {{item.realMoney}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            earnings: {},
        }
    },
    created () {
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "4005",
            data: {}
        }).then(res => {
            this.earnings = res.data
        })
    },
    methods : {
        goEarningsList () {
            this.$router.push('earningsList')
        },
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
    #earnings .van-nav-bar{
        background:linear-gradient(180deg,#FC5765 0%,#F94755 100%);
        .van-icon {
            color: #fff;
        }
        .van-nav-bar__title{
            color: #fff;
        }
    }
</style>
<style lang="less" scoped>
.statis{
    height: 107px;
    background:linear-gradient(180deg,#F94755 0%, rgba(244,45,61,1) 100%);
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
.firstTitle{
    height: 48px;
    line-height: 48px;
    background: #f8f8f8;
    font-size: 16px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
        display: inline-block;
    }
    span:nth-child(2){
        flex:1;
    }
    div{
        color:#999999;
        font-size: 13px;
    }
    span:first-child{
        
        width:6px;
        height: 6px;
        border-radius: 50%;
        background: #F84D4D;
        margin-right: 10px;
    }
}
.earningsInfo{
    height: 280px;
    padding:  0 16px;
    .box{
        height: 92px;
        padding: 20px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #f8f8f8;
        div:first-child{
            height: 21px;
            display: flex;
            align-items: center;
            font-size: 15px;
            color: #F84D4D;
            img{
                height: 17px;
                width: 17px;
                margin-right: 5px;
            }
        }
        .num{
            font-size: 20px;
            margin-top: 5px;
            height: 28px;
            line-height: 28px;
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
}
    // .{
    //     background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%);
    // }
    // 
    // 
</style>