<template>
    <div id='mall'>
        <div class='title'>矿机商城</div>
        <div class='box'>
            <div class='goodList' v-for='(item, index) in goodsList' :key='index'>
                <img :src="item.image" alt="">
                <ul>
                    <li>{{item.title}}</li>
                    <li>算力：70G</li>
                    <li class="red">租赁价格：{{item.price}}</li>
                </ul>
                <div class='btn_'>购买</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            goodsList: [],
        }
    },
    created () {
        this.$axios.fetchPost('/portal',
        {
            interface: "2000",
            module: "Investment",
            source: "web",
            version: "v1",
            data: {}
        }).then(res => {
            console.log(res)
            this.goodsList = res.data.list
        })
        // this.$axios.fetchPost('/portal',
        // {
        //     interface: "3000",
        //     module: "Investment",
        //     source: "web",
        //     version: "v1",
        //     data: {id:'3',way: 0}
        // }).then(res => {
        //     console.log(res)
        //     // this.goodsList = res.data.list
        // })
    }
}
</script>
<style lang="less" scoped>
    #mall{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #001672;
        display: flex;
        flex-direction: column;
        .title{
            height: 40px;
            text-align: center;
            width: 100%;
            line-height: 40px;
            font-size: 18px;
            background: rgba( 255, 255, 255, .05);
            // opacity: 0.5
            color: #fff;
        }
        .box{
            flex: 1;
            overflow: scroll;
            margin-top: 10px;
            .goodList{
                margin-bottom: 10px;
                background:rgba(255,255,255, .05);
                height: 115px;
                box-sizing: border-box;
                padding: 12px 16px;
                display: flex;
                img{
                    width: 90px;
                    height: 90px;
                    margin-right: 10px;
                }
                ul{
                    flex: 1;
                    padding-top: 10px;
                    box-sizing: border-box;
                    li{
                        height: 18px;
                        line-height: 18px;
                        color: #D8D8D8;
                        font-size: 13px;
                    }
                    li:first-child{
                        height: 24px;
                        margin-right: 5px;
                        line-height: 24px;
                        color: #fff;
                        font-size: 17px;
                    }
                    .red{
                        color: #F84D4D;
                    }
                }
                .btn_{
                    width: 76px;
                    margin-top: 44px;
                    height: 28px;
                    text-align: center;
                    line-height: 28px;
                    border-radius: 20px;
                    color:#fff;
                    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(255,73,65,1) 52%,rgba(231,17,34,1) 100%);
                }
            }
        }
    }
</style>