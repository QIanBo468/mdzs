<template>
    <div id='transferRecord'>
         <van-nav-bar
            title="提币记录"
            left-arrow
            :border="false"
            @click-left="$router.go(-1)"
        />
        <div class='box'>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
                <div class='record' v-for='(item, index) in list' :key='index'>
                    <div v-if='item.status == 0' class='status red'>申请中</div>
                    <div v-if='item.status == 1' class='status'>提币成功</div>
                    <div v-if='item.status == -1' class='status red'>申请被驳回</div>
                    <ul>
                        <li>
                            <div>钱包地址</div>
                            <div>{{item.orderNo}}</div>
                        </li>
                        <li>
                            <div>提币数量</div>
                            <div>{{item.realMoney}}</div>
                        </li>
                        <li>
                            <div>提交时间</div>
                            <div>{{item.createdAt}}</div>
                        </li>
                        <li>
                            <div>手续费</div>
                            <div>{{item.fee}}</div>
                        </li>
                        <li>
                            <div>到账数量</div>
                            <div class='red'>{{item.money}}</div>
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
            finished: false,
            loading: false,
            page: 1,
            lastPage: null,
            lastId: 0,
        }
    },
    methods: {
        onLoad() {
            if (this.lastPage && this.lastPage < this.page) {
                this.finished = true
                this.loading = false;
            }else{
                this.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Finance",
                    interface: "2002",
                    data:{lastId: this.lastId,page: this.page ++,isOut:0,creditType:'credit_2'}
                }).then(res => {
                    console.log(res)
                    this.list = this.list.concat(res.data.list)
                    this.lastPage = res.data.lastPage
                    this.loading = false;
                    this.lastId = res.data.lastId
                })
            }
        },
    }
}
</script>
<style lang="less">
  .van-nav-bar{
    background: #000;
    color: #fff;
  }
  #extract .van-nav-bar .van-nav-bar__text{
    color: #fff;
  }
  .van-nav-bar .van-icon{
    color:#fff;
  }
  .van-nav-bar__title{
    color:#fff;
  }
    #transferRecord{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #000;
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
