<template>
    <div id='passwordBox'>
        <van-nav-bar
            title="忘记密码"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />
        <div class='password'>
            <van-cell-group style="margin: 50px auto 60px">
                <van-field
                    placeholder="请输入手机号"
                    v-model="obj.account"
                    name="phone"
                    maxlength="11"
                    v-validate="'required|phone'"
                    :error="errors.has('phone')"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/account.png'/>
                </template>
                </van-field>
                <van-field
                    placeholder="请输入验证码"
                    name="captcha"
                    v-validate="'required'"
                    v-model='obj.captcha'
                    :error="errors.has('captcha')"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/code.png'/>
                </template>
                <van-button slot="button" round size="small" plain type="primary" :disabled = disabled @click='sendCode' class='code'>{{btntxt}}</van-button>
                </van-field>

                <van-field
                    placeholder="请输入密码"
                    left-icon="bag-o"
                    name="password"
                    v-model='obj.password'
                    v-validate="'required'"
                    :error="errors.has('password')"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/password.png'/>
                </template>
                </van-field>
            </van-cell-group>
            <van-cell-group>
                <van-button class='btn' @click="submint">提交</van-button>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data () {
        return {
            obj: {},
            time: 60,
            btntxt: '发送验证码',
            disabled: false
        }
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        },
        sendCode () {
            var phone = this.obj.account;
            if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))){ 
                Toast("手机号码有误，请重填");  
                return false; 
            }
            if(this.disabled == false){
                this.$axios.fetchPost('/portal',
                {
                "source":"web",
                "version":"v1",
                "module":"Account",
                "interface":"1001",
                "data":
                    {"account": this.obj.account,}
                }).then(res => {
                    Toast(res.message)
                if(res.code == 0){
                    this.disabled = true;
                    var  that = this
                    var times = setInterval(function() {
                    that.time--;
                    if( that.time > 0){
                        that.btntxt = '重新获取('+ that.time +'s)'
                    }else{
                        clearInterval(times)
                        that.time = 10
                        that.btntxt = "获取验证码";
                        that.disabled = false;
                    } 
                    }, 1000);
                }
                }).catch( res => {
                Toast(res.message)
                })
            }

        },
        submint () {
            var that = this
            this.$validator.validateAll().then(function(result) {
                if(result){
                    that.$axios.fetchPost('/portal',
                    {
                        source: "web",
                        version: "v1",
                        module: "Account",
                        interface: "1004",
                        data: that.obj
                    }).then(res => {
                        Toast(res.message);
                        if(res.success){
                            that.$router.go('-1')
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .password{
        width: 343px;
        margin: 0 auto;
    }
    .inputIcon{
        width: 20px;
        height: 20px;
        margin-top: 2px;
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
    .code{
        // width:78px;
        // height:24px;
        // border-radius:12px;
        // // border:1px solid rgba(248,77,77,1);
        // background: none;
        // co
    }
</style>