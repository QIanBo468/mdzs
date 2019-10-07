<template>
    <div id='extract'>
        <van-nav-bar
        title="兑换"
        right-text="兑换记录"
        left-arrow
        @click-left="onClickLeft"
        @click-right='$router.push("/conversion?type="+$route.query.type)'
        />
        <div class='box'>
            <div class='usdt'>
                <img src="../../../static/images/index/ofc.png" alt="" v-if='$route.query.type == 1'>
                <img src="../../../static/images/index/usdt.png"  v-else>
                {{title}}
            </div>
            <div class='money' v-if='$route.query.type == 1'>
                <!-- {{$route.query.creditValue}} -->
                {{rules.total_ofc}}
            </div>
            <div class='money' v-else>
                <!-- {{$route.query.creditValue}} -->
                {{rules.total_usdt}}
            </div>
            <div class='title'>
                兑换数量
            </div>
            <!-- <InputImg  :placeholder='placeNum' @changeInp='changeVal' :value='user' > -->
            <div class='inputBox'>
                <input type="number" v-model="num" placeholder="请输入兑换数量">

            </div>
            <div class='remarks'>
                备注：usdt兑换ofc比例为1 ：{{rules.toUsdt}}
            </div>
            <div class='cell'>
                <div>手续费</div>
                <div class='overText'>{{aNum[0]}}</div>
            </div>
            <div class='cell'>
                <div>爱心基金</div>
                <div class='overText'>{{aNum[1]}}</div>
            </div>
            <div class="cell">
                <div>实际到账</div>
                <div class='overText'>{{aNum[2]}}</div>
            </div>
            <div class='btn'  @click='isPop '>
                兑换
            </div>
        </div>
        <van-dialog
        v-model="show"
        title="提示"
        show-cancel-button
        @confirm='submit'
        >
        <van-field v-model="password" type='password' placeholder="请输入支付密码" />
        <!-- <img src="https://img.yzcdn.cn/vant/apple-3.jpg"> -->
        </van-dialog>
    </div>
</template>
<script>
import { Toast,Dialog } from 'vant'
import InputImg from '../../views/inputImg'
export default {
    data () {
        return {
            show: false,
            user: '',
            InputImg: '../../../static/images/index/user.png',
            placeNum: '请输入兑换数量',
            num: '',
            rules: '',
            password: '',
            title: 'ofc'
        }
    },
    created () {
        var title  = this.$route.query.type
        console.log()
        if(title == 2){
            this.title = 'usdt'
        }
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "4004",
            data: {}
        }).then(res => {
            if(res.success){
                this.rules = res.data
            }
        })
    },
    computed: {
        aNum (){
            var a = (this.num * this.rules.toCashFee / 100).toFixed(8)
            var b = (this.num * this.rules.toCashLoveFundFee / 100).toFixed(8)
            var c = (this.num - a - b).toFixed(8)
            var arr = [a,b,c]
            return  arr
        }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
        isPop(){
            if(this.num == ''){
                this.$toast('请输入兑换数量')
                return
            }
            this.show = true
            this.password = ""
        },
        submit () {
            // this.show = true
            if(this.password.length != 6) {
                this.$toast('支付密码六位组成')
                return 
            }
            var type = 'credit_2'
            var code = '4007'
            if( this.$route.query.type == 2){
                type = 'credit_1'
                code = '4009'
            }
            this.$axios.fetchPost('/portal',
            {
                source: "web",
                version: "v1",
                module: "Finance",
                interface: code,
                data: {num: this.num,type: type,safeword: this.password}
            }).then(res => {
                // this.$router.push('/conversion')
                this.rules.total_ofc = (this.rules.total_ofc  - this.num*10).toFixed(8)
                this.rules.total_usdt = (this.rules.total_usdt  - this.num/10).toFixed(8)
                if(res.success){
                    this.num = ''
                    Dialog.alert({
                        title: '提示',
                        message: res.message
                    })
                    
                }else{
                    this.$toast(res.message)
                }
            })
        },
    },
    components: {
        InputImg
    }
}
</script>
<style lang="less" scoped>
    #extract{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .box{
            flex: 1;
            box-sizing: border-box;
            overflow-y: auto;
            padding: 0 16px;
            margin: 0 auto 20px;
            border-top: 10px solid #f8f8f8;
            .title{
                font-size: 14px;
                color: #666;
                height: 20px;
                line-height: 20px;
                margin:  10px 0;
            }
            .inputBox{
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
                img{
                    width: 17px;
                    height: 20px;
                }
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
            .remarks{
                font-size: 12px;
                margin: 5px 0 40px;
                color: #666;
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
                    width: 50%;
                    text-align: right;
                }
            }
            .btn{
                margin-top: 60px;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                width: 21.4375rem;
                height: 2.75rem;
                background: red;
                margin: 0 auto;
                background: -webkit-gradient(linear,left top,left bottom,from(#fd5966),to(#e71122));
                background: linear-gradient(180deg,#fd5966,#e71122);
                border-radius: 1.375rem;
                color: #fff;
            }
            .red{
                color: #F84D4D;
            }
        }
    }
</style>