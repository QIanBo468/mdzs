<template>
    <div id='mall'>
        <div class='title'>矿机商城</div>
        <div class='box'>
            <div class='goodList' v-for='(item, index) in goodsList' :key='index'>
                <img :src="item.image" alt="">
                <ul>
                    <li class='overText'>{{item.title}}</li>
                    <li>算力：{{item.calculation}}G</li>
                    <li class="red">租赁价格：{{item.price}}usdt</li>
                </ul>
                <div class='btn_' @click='buy(item)'>购买</div>
            </div>
        </div>
        <van-action-sheet v-model="show" title="请选择支付方式">
            <van-radio-group v-model="radio" @change="payment">
            <van-cell-group>
                <van-cell :title="usdtPrice" clickable @click="radio = '0'">
                <van-radio slot="right-icon" name="0" />
                </van-cell>
                <van-cell :title="price" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
                </van-cell>
            </van-cell-group>
            </van-radio-group>
        </van-action-sheet>
    </div>
</template>
<script>
import { Dialog, Toast } from 'vant'
export default {
    data () {
        return {
            goodsList: [],
            show: false,
            radio: '',
            goodInfo: '',
            change: '',
            price: '',
            usdtPrice: ''
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
            this.change = res.data.change
            this.goodsList = res.data.list
        })
        
    },
    methods: {
        buy (id) {
            let  status = this.$cookies.get('status')
            if(status == -1){
                this.$dialog.confirm({
                    title: '提示',
                    message: '未通过实名认证'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {
                });
                return
            }else if(status == -2){
                this.$dialog.confirm({
                    title: '提示',
                    message: '未认证'
                }).then(() => {
                    this.$router.push('/authentication')
                }).catch(() => {
                });
                return 
            }else if(status ==  0) {
                Toast('认证已提交，后台审核中')
                return
            }
            this.usdtPrice = 'usdt 数量：（'+ id.price +')'
            this.price ='ofc 数量：（' + this.change * id.price +')'
            this.goodInfo = id
            this.show = true
            this.radio = ''
        },
        payment() {
            if(this.radio){
                this.show = false
                Dialog.confirm({
                title: '购买提醒',
                message: '是否购买'+ this.goodInfo.title
                }).then(() => {
                    this.$axios.fetchPost('/portal',
                    {
                        interface: "3000",
                        module: "Investment",
                        source: "web",
                        version: "v1",
                        data: {id: this.goodInfo.id,way: this.radio}
                    }).then(res => {
                        Toast(res.message)
                    })
                }).catch(() => {
                });
            }
            // console.log(this.radio)
            
        }
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
            overflow-y: auto;
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
                    overflow: hidden;
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