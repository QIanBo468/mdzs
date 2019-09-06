<template>
    <div id='extract'>
        <van-nav-bar
        title="转账"
        right-text="转账记录"
        left-arrow
        @click-left="onClickLeft"
        @click-right='$router.push({path:"/transferRecord",query:{type:type}})'
        />
        <div class='box'>
            <div class='usdt' @click='show = true'>
                <img :src="typeImg" alt="">
                {{type}}
            </div>
            <div class='money'>
                {{money}}
            </div>
            <div class='title'>
                会员ID
            </div>

            <div class="inputBox">
                <van-field
                    placeholder="请输入会员ID"
                    :border="false"
                    name="id"
                    v-model="form.id"
                    :error="errors.has('id')"
                    v-validate="'required'"
                />
            </div>

            <!-- <InputImg style="width: 343px;height: 40px;margin: 0 auto" :placeholder='placesUser'>
                <template slot="right"> 
                    <img :src="InputImg" alt="">
                </template>
            </InputImg> -->

            <div class='title'>
                转账数量
            </div>

            <div class="inputBox" >
                <van-field
                    placeholder="请输入转账数量"
                    :border="false"
                    name="amount"
                    v-model="form.amount"
                    :error="errors.has('amount')"
                    v-validate="'required'"
                />
            </div>

            <div class='title'>
                验证码
            </div>

            <div class="inputBox">
                <van-field
                    placeholder="请输入验证码"
                    :border="false"
                    name="captcha"
                    :disabled = 'disabled'
                    v-model="form.captcha"
                    :error="errors.has('captcha')"
                    v-validate="'required'"
                />
                <div class='red time' @click='time'>{{codeText}}</div>
            </div>
            <div class='btn' @click="submit">
                转账
            </div>
        </div>
        <van-action-sheet v-model="show" title="请选择转账用户">
            <van-radio-group v-model="radio" @change="select">
                <van-cell-group>
                    <van-cell :title="item.name" clickable @click="radio = item.name" v-for='(item,index) in list' :key='index' v-if='item.use'>
                    <van-radio slot="right-icon" :name="item.name" />
                    </van-cell>
                    <!-- <van-cell title="单选框 2" clickable @click="radio = '2'">
                    <van-radio slot="right-icon" name="2" />
                    </van-cell> -->
                </van-cell-group>
            </van-radio-group>
        </van-action-sheet>
    </div>
</template>
<script>
import { Toast,Dialog } from 'vant'
import InputImg from '../../views/inputImg'
export default {
    data () {
        return {
            user: '',
            InputImg: '../../../static/images/index/user.png',
            imgFlag: true,
            placesUser: '请输入会员ID',
            placesNum: '请输入转账数量',
            placesCode: '请输入验证码',
            codeText: '获取验证码',
            codeTime: 3,
            show: false,
            radio: 1,
            disabled: true,
            money: '',
            form: {
                amount: '',
                id: '',
                captcha: ''
            },
            typeImg: '../../../static/images/index/usdt.png',
            list: {},
            type: ''
        }
    },
    created () {
        this.type = this.$route.query.type
        this.radio = this.$route.query.type
        console.log(this.type)
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "4003",
            data: {}
        }).then(res => {
            if(res.success){
                this.list = res.data
                this.money = res.data[this.type].have
            }
        })
    },
    methods : {
        onClickLeft () {
            if(this.$route.query.type =='LoveFund'){
                this.$router.push('/fund')
            }else if(this.$route.query.type =='ofc'){
                this.$router.push('/ofc')
            }else{
                this.$router.push('/usdt')
            }
        },
        select () {
            var type = this.radio
            if(type == '爱心基金'){
                type = 'LoveFund'
                this.typeImg  = '../../../static/images/index/fund.png'
            }else if(type == 'ofc'){
                this.typeImg  = '../../../static/images/index/ofc.png'
            }else{
                this.typeImg  = '../../../static/images/index/usdt.png'
            }
                
            this.type = this.radio
            this.money = this.list[type].have
            this.show = false
        },
        time () {
            if(!this.form.id){
                Toast('会员ID不能为空')
                return
            }
            if(this.codeText == '获取验证码'){
                var that = this;
                that.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Finance",
                    interface: "3003",
                    data: {id: that.form.id}
                }).then(res => {
                    this.disabled = false
                    if(res.success){
                        Dialog.alert({
                            title: '提示',
                            message: res.message
                        })
                        var time = setInterval(() => {
                            if(that.codeTime <= 0){
                                clearInterval(time)
                                that.codeText = '获取验证码'
                                that.codeTime = 3
                            }else{
                                that.codeTime -- 
                                that.codeText = that.codeTime + 's'
                            }
                        },1000)
                    }else{
                        Toast(res.message)
                    }
                })
                
            }
        },
        submit () {
            var that = this
            this.$validator.validateAll().then(function(result) {
                if(result){
                    var interfaces = '3002'
                    if(that.radio == 'usdt') {
                        interfaces = '3001'
                    }else if(that.radio == 'ofc'){
                        interfaces = '3000'
                    }
                    that.$axios.fetchPost('/portal',
                    {
                        source: "web",
                        version: "v1",
                        module: "Finance",
                        interface: interfaces,
                        data: that.form
                    }).then(res => {
                        if(res.success){
                            that.list[that.type].have = that.money - that.form.amount
                            that.money = that.money - that.form.amount
                            Dialog.alert({
                                title: '提示',
                                message: res.message
                            })
                        }
                    })
                }
            })
        }
    },
    components: {
        InputImg
    }
}
</script>
<style lang="less">
    
    #extract .van-radio__icon--checked .van-icon {
        background-color: red;
        border-color: red;
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
</style>
<style lang="less" scoped>
    #extract{
        width: 100%;
        .box{
            // width: 100%;
            padding: 0 16px;
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
            .van-cell{
                padding: 0
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
                height: 100%;
                display: flex;
                border: 1px solid #D8D8D8;
                padding: 8px;
                width: 343px;
                height: 40px;
                margin: 0 auto;
                box-sizing: border-box;
                justify-content: space-between;
                border-radius:4px;
                font-size: 14px;
                input{
                    // height: 20px;
                    flex: 1;
                    border: 0;
                    font-size: 14px;
                }
                .time{
                    width: 90px;
                    text-align: right
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
                line-height: 18px;
                color: #666;
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                div{
                    width: 30%;
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