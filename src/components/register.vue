<template>
    <div id='registerBox'>
        <van-nav-bar
            title="注册账号"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class='register'>
            <van-cell-group style="margin: 50px auto 201px">
                <van-field
                    placeholder="请输入手机号"
                    left-icon="contact"
                    maxlength="11"
                    name="account"
                    v-model="fromObj.account"
                    :error="errors.has('account')"
                    v-validate="'required|phone'"
                />

                <van-field
                    placeholder="请输入密码（最少6位 数字+字母）"
                    left-icon="contact"
                    v-model="fromObj.password"
                    name="password"
                    type="password"
                    :error="errors.has('password')"
                    v-validate="'required|password'"
                >
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
                    
                />
                <van-field
                    placeholder="请输入邀请码"
                    left-icon="contact"
                    name='inviteCode'
                    v-validate="'required'"
                    :error="errors.has('inviteCode')"
                    v-model="fromObj.inviteCode"
                />
            </van-cell-group>
            <van-cell-group :border='false'>
                <van-button  class='btn' @click="submit">下一步</van-button>
                <div class='agreement'>
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
        }
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        },
        submit () {
            this.$validator.validateAll().then(function(result) {

            })
            // this.$axios.fetchPost('/portal',
            // {
            //     source: "web",
            //     version: "v1",
            //     module: "Account",
            //     interface: "1002",
            //     data: this.fromObj
            // }).then(res => {
            //     if (res.success) {
            //         this.$router.push('/authentication')
            //         this.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
            //     }else{
            //         Toast(res.message)
            //     }
            // })
        }
    }
}
</script>
<style lang="less" scoped>
    .register{
        width: 343px;
        margin: 0 auto;
        .agreement{
            font-size: 12px;
            color: #999;
            margin-top: 10px;
            text-align: center;
        }
    }
</style>