<template>
    <div id='registerBox'>
        <van-nav-bar
            title="注册账号"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class='register'>
            <van-cell-group style="margin: 50px auto 201px" :border=false>
                <van-field
                    placeholder="请输入手机号"
                    maxlength="11"
                    name="account"
                    v-model="fromObj.account"
                    :error="errors.has('account')"
                    v-validate="'required|phones'"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/account.png'/>
                </template>
                </van-field>
                <van-field
                    placeholder="请输入密码（最少6位 数字+字母）"
                    v-model="fromObj.password"
                    name="password"
                    type="password"
                    :error="errors.has('password')"
                    v-validate="'required|password'"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/password.png'/>
                </template>
                </van-field>

                <van-field
                    placeholder="请输入支付密码"
                    v-model="fromObj.safeword"
                    left-icon="contact"
                    name='safeword'
                    maxlength="6"
                    type='password'
                    :error="errors.has('safeword')"
                    v-validate="'required|numeric|min:6'"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/password.png'/>
                </template>
                </van-field>
                <van-field
                    placeholder="请输入邀请码"
                    left-icon="contact"
                    name='inviteCode'
                    v-validate="'required'"
                    :error="errors.has('inviteCode')"
                    v-model="fromObj.inviteCode"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/code.png'/>
                </template>
                </van-field>
            </van-cell-group>
            <van-cell-group :border='false'>
                <van-button  class='btn' @click="submit">下一步</van-button>
                <div class='agreement' @click="flag = !flag">
                    <img class='imgIcon' v-if='flag' src='../../static/images/index/gouxuan.png'>
                    <img class='imgIcon' v-if='!flag' src='../../static/images/index/gouxuan_A.png'>
                    已阅读并同意以下协议：《ofc服务协议》
                </div>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data () {
        return {
            fromObj: {
                account: '',
                password: '',
                safeword: '',
                inviteCode: '',
            },
            flag: true,
        }
    },
    created () {
        if(this.$route.query.from){
            this.fromObj.inviteCode = this.$route.query.from
        }
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        },
        submit () {
            var that = this
            this.$validator.validateAll().then(function(result) {
                if(result){
                    if(that.flag){
                        Toast('请勾选并同意用户协议')
                        return
                    }
                    that.$axios.fetchPost('/portal',
                    {
                        source: "web",
                        version: "v1",
                        module: "Account",
                        interface: "1002",
                        data: that.fromObj
                    }).then(res => {
                        if (res.success) {
                            that.$cookies.set('status', res.data.status)
                            that.$router.push('/authentication')
                            that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                        }else{
                            Toast(res.message)
                        }
                    })
                }else{
                    console.log(that.errors)
                    Toast(that.errors.items[0].msg)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    #registerBox{
        width: 100%;
        height: 100%;
    }
    .register{
        width: 343px;
        margin: 0 auto;
        .agreement{
            font-size: 12px;
            color: #999;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
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
    .imgIcon{
        width: 13px;
        height: 13px;
        margin-right: 10px;
    }
</style>