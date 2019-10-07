<template>
    <div id='conversion'>
        <van-nav-bar
            title="兑换记录"
            left-arrow
            :border="false"
            @click-left="onClickLeft"
        />
        
        <div class='box'>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
                <div class='record' v-for='(item, index) in list' :key='index'>
                    <div class='status'>兑换成功</div>
                    <ul>
                        <li>
                            <div>兑换数量</div>
                            <div>{{item.usdt}}</div>
                        </li>
                        <li>
                            <div>提交时间</div>
                            <div>{{item.createdAt}}</div>
                        </li>
                        <li>
                            <div>爱心基金</div>
                            <div>{{item.loveFund}}</div>
                        </li>
                        <li>
                            <div>手续费</div>
                            <div>{{item.fee}}</div>
                        </li>
                        <li>
                            <div>到账数量</div>
                            <div class='red'>{{item.final}}</div>
                        </li>
                    </ul>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            lastId: 0,
        }
    },
    created () {
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        onLoad () {
            var type = 1
            if(this.$route.query.type == 2) {
                type = 2
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
                    interface: "4008",
                    data: {lastId: this.lastId,page: this.page ++,type: type}
                }).then(res => {
                    if(res.success){
                        this.lastPage = res.data.lastPage
                        this.lastId = res.data.lastId
                        this.loading = false;
                        this.list = this.list.concat(res.data.list)
                    }
                })
            }
        }
    }
}
</script>
<style lang="less">
    #conversion{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f8f8f8;
        .box{
            padding: 16px;
            overflow: scroll;
            .record{
                padding: 20px;
                border-radius: 6px;
                background: #fff;
                margin-bottom: 10px;
                .status{
                    font-size: 12px;
                    text-align: right;
                    color: #1890FF;
                    margin-bottom: 10px;
                }
                .red{
                    color: #F84D4D;
                }
                ul li{
                    height: 17px;
                    line-height: 17px;
                    font-size: 12px;
                    display: flex;
                    margin-bottom: 5px;
                    div:first-child{
                        width: 60px;
                        color: #666666;
                        margin-right: 35px;
                    }
                    div:last-child{
                        width: 70%;
                    }
                }
                li:last-child{
                    margin-bottom: 0px;
                }
            }
        }
    }
</style>