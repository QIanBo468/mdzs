<template lang="">
    <div id='earningsList'>
        <van-nav-bar
            title="我的收益"
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
                <div class="list" v-for='(item, index) in list' :key='index'>
                        <ul>
                            <li class='overText'>{{item.creditName}}</li>
                            <li>{{item.createdAt}}</li>
                        </ul>
                        <div>
                            {{item.realMoney}}
                        </div>
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
    created () {
        
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
                    interface: "4006",
                    data: {lastId: this.lastId,page: this.page ++}
                }).then(res => {
                    this.list = this.list.concat(res.data.list)
                    this.lastPage = res.data.lastPage
                    this.loading = false;
                    this.lastId = res.data.lastId
                })
            }
        },
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
#earningsList{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f8f8f8;
    display: flex;
    flex-direction: column;
}
.box{
    flex: 1;
    overflow: scroll;
    padding: 0 16px;
    margin-top: 10px;
    background: #fff;
    .list{
        // padding: 0 16px;
            height: 50px;
            display: flex;
            // line-height: 63px;
            background: #fff;
            padding: 5px 0;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            border-bottom: 1px solid #f8f8f8;
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
    
}
</style>