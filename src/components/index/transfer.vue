<template>
    <div id='extract'>
        <van-nav-bar
        title="转出到BAT交易"
        right-text="转账记录"
        left-arrow
        @click-left="onClickLeft"
        @click-right='$router.push({path:"/transferRecord",query:{type:type}})'
        />
        <div class='box'>
            <div class='usdt'>
                <img src="../../../static/images/index/B@3x.png" alt="">
                BAT
                <!-- <img class="imgDown" src="../../../static/images/index/pullDown.png" alt=""> -->
            </div>
            <div class='money'>
                {{money}}123
            </div>
            <!-- <div class='title'>
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
            </div> -->

            <!-- <InputImg style="width: 343px;height: 40px;margin: 0 auto" :placeholder='placesUser'>
                <template slot="right"> 
                    <img :src="InputImg" alt="">
                </template>
            </InputImg> -->

            <div class='title'>
                <div class="g"></div>
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
                <div class="g"></div>
                验证码
                <div class="phon">
                    {{hintPhone}}
                </div>
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
            <div class='cell' v-if='radio == "ofc"'>
                <div>手续费</div>
                <div class='overText'>{{count.fee}}</div>
            </div>
            <div class="cell" v-if='radio == "ofc"'>
                <div>爱心基金</div>
                <div class='overText'>{{count.love}}</div>
            </div>
            <div class='btn' @click="submit">
                转账
            </div>
        </div>
        <van-action-sheet v-model="show" title="请选择转账用户">
            <van-radio-group v-model="radio" @change="select">
                <van-cell-group>
                    <van-cell clickable @click="radio = item.name" v-for='(item,index) in list' :key='index' v-if='item.use'>
                        <template slot="default">
                            <div style="height: 22px;display:flex;">
                                <img :src="iconObj[index]" style="width: 22px;margin-right: 10px" alt="">
                                {{item.name}} 
                            </div>
                        </template>
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
            InputImg: './static/images/index/user.png',
            imgFlag: true,
            placesUser: '请输入会员ID',
            placesNum: '请输入转账数量',
            placesCode: '请输入验证码',
            codeText: '获取验证码',
            hintPhone: '(133****5332)',
            codeTime: 60,
            show: false,
            radio: 1,
            disabled: false,
            money: '',
            form: {
                amount: '',
                id: '',
                captcha: ''
            },
            typeImg:'../../../static/images/index/usdt.png',
            list: {},
            type: '',
            iconObj: {
                ofc: './static/images/index/ofc.png',
                BAT: './static/images/index/B@3x.png',
                LoveFund:'./static/images/index/fund.png'
            },
            procedure: ''
        }
    },
    created () {
        let type = ''
        if( this.$route.query.type =='LoveFund'){
            this.type = '爱心基金'
        }else{
            this.type = this.$route.query.type
        }
        this.typeImg = this.iconObj[this.$route.query.type]
        this.radio = this.type
        
        this.getInfo()

        this.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Finance",
                    interface: "3004",
                    data: {}
                }).then(res => {
                    if(res.success){
                        // console.log(res.data)
                        this.procedure = res.data
                    }else{
                        Toast(res.message)
                    }
                })
    },
    computed : {
        count () {
            var obj = {}
            obj.fee = (this.form.amount * this.procedure.fee / 100).toFixed(8)
            obj.love = (this.form.amount * this.procedure.love / 100).toFixed(8)
            return obj
        }
    },
    methods : {
        getInfo () {
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
                    var obj =  ''
                    if(this.type == '爱心基金') {
                        obj = 'LoveFund'
                    }else{
                        obj = this.type
                    }
                    this.money = res.data[obj].have
                }
            })
        },
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
                this.typeImg  = '../../../static/images/index/B@3x.png'
            }
                
            this.type = this.radio
            this.money = this.list[type].have
            this.show = false
        },
        time () {
            // if(!this.form.id){
            //     Toast('会员ID不能为空')
            //     return
            // }
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
                                that.codeTime = 60
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
                            that.form = {
                                amount: '',
                                id: '',
                                captcha: ''
                            }
                            // if('')
                            var type = that.type
                            if(type == '爱心基金'){
                                type = 'LoveFund'
                            }
                            // that.list[type].have = that.money - that.form.amount
                            // that.money = that.money - that.form.amount
                            Dialog.alert({
                                title: '提示',
                                message: res.message
                            })
                            that.getInfo()
                        }else{
                            Toast(res.message)
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
        height: 100%;
        background: #000;
        position: relative;
        .phon{
            font-size: 12px;
            margin-left: 5px;
        }
        .box{
            // width: 100%;
            padding: 0 16px;
            margin: 0 auto;
            // border-top: 10px solid #f8f8f8;
            .title{
                font-size: 14px;
                color: #fff;
                height: 20px;
                line-height: 20px;
                margin:  20px 0;
                display: flex;
                .g{
                    height: 20px;
                    // line-height: 20px;
                    width: 5px;
                    background:linear-gradient(180deg,#494EFE 0%,#0C04F8 100%);
                    margin-right: 10px;
                    border-radius: 8px;
                }
            }
            .usdt{
                margin-top: 30px;
                height: 27px;
                display: flex;
                justify-content: center;
                font-size: 22px;
                color: #9AB5FF;
                align-items: center;
                img{
                    margin-right: 10px;
                    height: 32px;
                    width: 27px;
                }
                .imgDown{
                    margin-left: 5px;
                }
            }
            .money{
                text-align: center;
                height: 32px;
                line-height: 32px;
                width: 343px;
                font-size: 23px;
                color: #fff;
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
                background:linear-gradient(90deg,#494EFE 0%,#0C04F8 100%);
                border-radius: 8px;
                color: #fff;
                position: fixed;
                bottom: 10px;
            }
            .inputBox{
                height: 100%;
                display: flex;
                // border: 1px solid #D8D8D8;
                background: #1D1C3B;
                padding: 8px;
                width: 343px;
                height: 50px;
                line-height: 50px;
                margin: 0 auto;
                box-sizing: border-box;
                justify-content: space-between;
                align-items: center;
                border-radius:4px;
                font-size: 14px;
                input{
                    // height: 20px;
                    flex: 1;
                    border: 0;
                    font-size: 14px;
                }
                .time{
                    width: 85px;
                    height: 24px;
                    border: 1px solid #BEC6E4;
                    line-height: 24px;
                    border-radius: 12px;
                    font-size: 12px;
                    text-align: center;
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
                margin-top: 10px;
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
                color: #BEC6E4;
            }
        }
        /deep/.van-cell__value{
            background: #1D1C3B;
            
        }
        /deep/.van-field__control{
            color: #f8f8f8;
        }
        .van-nav-bar{
            background: #000;
            // background:linear-gradient(180deg,#3FCFFE 0%,#39B2F8 100%);
            // background: #fff;
            .van-icon {
                color: #fff;
            }
            .van-nav-bar__title{
                color: #fff;
            }
            .van-nav-bar__text{
                color: #fff;
            }
        }
        .van-hairline--bottom::after{
            border: none;
        }
    }
</style>