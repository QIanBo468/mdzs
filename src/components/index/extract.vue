<template>
    <div id='extract'>
        <van-nav-bar
        title="提币"
        right-text="提币记录"
        left-arrow
        @click-left="onClickLeft"
        @click-right= '$router.push("/extractRecord")'
        />
        <div class='box'>
            <div class='usdt'>
                <img src="../../../static/images/index/usdt.png" alt="">
                usdt
            </div>
            <div class='money'>
                {{$route.query.usdt}}
            </div>
            <div class='title'>
                钱包地址
            </div>
            <!-- <input type="text" v-model="address"> -->
            <!-- <InputImg  :placeholder='placesite' :value='user' @changeInp = 'aaa'>
                <template slot="right"> 
                    
                </template>
            </InputImg> -->
            
            <div class="inputBox">
                <van-field
                    placeholder="请输入钱包地址"
                    :border="false"
                    name="address"
                    v-model="address"
                    :error="errors.has('address')"
                    v-validate="'required'"
                />
                <img v-if='imgFlag' :src="InputImg" alt="" @click="$router.push({path: '/address', query:{usdt: usdtNum}})">
                <img v-else style="width: 19px;height: 19px" src="../../../static/images/index/empty.png" alt="" @click="address = ''">
            </div>
            <div class='title'>
                提币数量
            </div>
            <div class="inputBox" style="margin: 0 auto 40px">
                <van-field
                    type="number"
                    placeholder="请输入提币数量"
                    :border="false"
                    name="num"
                    v-model="num"
                    :error="errors.has('num')"
                    v-validate="'required'"
                />
                <div class='red' style="width: 35px;" @click="num = usdtNum">全部</div>
            </div>
            <div class='cell'>
                <div>手续费</div>
                <div class='overText'>{{money.serve}}</div>
            </div>
            <div class="cell">
                <div>实际到账</div>
                <div class='overText'>{{money.practical}}</div>
            </div>
            <div class='btn' @click='submit'>
                提币
            </div>
        </div>
    </div>
</template>
<script>
import { Toast,Dialog } from 'vant'
export default {
    data () {
        return {
            user: '',
            address: '',
            num: '',
            InputImg: '../../../static/images/index/user.png',
            placesite: '请输入钱包地址',
            placeNum: '请输入提币数量',
            usdtNum: '',
            charge: '',
            imgFlag: false,
        }
    },
    computed : {
        money () {
            var obj = {
                serve: this.num * this.charge / 100,
                practical: this.num - this.num * this.charge / 100,
            }
            return obj
        }
    },
    watch: {
        address () {
            if(!this.address) {
                this.imgFlag = true
            }else{
                this.imgFlag = false
            }
        }
    },
    created () {
        this.usdtNum = this.$route.query.usdt
        this.address = this.$route.query.address
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "4000",
            data: {}
        }).then(res => {
            this.charge = res.data.params
        })
    },
    methods : {
        changeInput() {
            console.log(this.address)
        },
        onClickLeft () {
            this.$router.push('/usdt')
        },
        submit () {
            var that = this
            this.$validator.validateAll().then(function(result) {
                if(result){
                    that.$axios.fetchPost('/portal/digiccy',
                    {
                        source: "web",
                        version: "v1",
                        module: "Wallet",
                        interface: "2003",
                        data: {amount: that.num,address: that.address }
                    }).then(res => {
                        if(res.success){
                            that.num = ''
                            that.address = ''
                            Dialog.alert({
                                title: '提示',
                                message: res.message
                            })
                        }else if(res.code == 4800){
                            Toast(res.message)
                        }
                    })
                }
            })
        }
    },
    components: {
    }
}
</script>
<style lang="less" scoped>
    .van-cell{
        padding: 0
    }
    #extract{
        width: 100%;
        overflow: hidden;
        .box{
            // width: 100%;
            padding: 0 16px;
            overflow: hidden;
            margin: 0 auto;
            border-top: 10px solid #f8f8f8;
            .title{
                font-size: 14px;
                color: #666;
                height: 20px;
                line-height: 20px;
                margin:  10px 0;
            }
            .usdt{
                margin-top: 30px;
                height: 27px;
                display: flex;
                justify-content: center;
                font-size: 22px;
                color: #F84D4D;
                align-items: center;
                img{
                    margin-right: 10px;
                    height: 22px;
                    width: 22px;
                }
            }
            .money{
                text-align: center;
                height: 32px;
                line-height: 32px;
                width: 343px;
                font-size: 23px;
                color: #333;
                margin: 5px auto 38px;
            }
            .btn{
                width: 343px;
                height: 44px;
                background: red;
                margin: 0 auto;
                background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
                border-radius: 22px;
                color: #fff;
            }
            .inputBox{
                width: 343px;height: 40px;
                // width: 100%;
                // height: 100%;
                display: flex;
                border: 1px solid #D8D8D8;
                padding: 6px;
                box-sizing: border-box;
                justify-content: space-between;
                border-radius:4px;
                font-size: 14px;
                input{
                    height: 20px;
                    flex: 1;
                    border: 0;
                    font-size: 14px;
                }
                img{
                    width: 17px;
                    height: 20px;
                }
                // span{
                //     display: table-cell;
                //     vertical-align:middle
                // }
            }
            .cell{
                height: 18px;
                width: 100%;
                overflow: hidden;
                line-height: 18px;
                color: #666;
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                div{
                    width: 40%;
                }
                div:last-child{
                    text-align: right;
                }
            }
            .btn{
                margin-top: 60px;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
            }
            .red{
                color: #F84D4D;
            }
        }
    }
</style>