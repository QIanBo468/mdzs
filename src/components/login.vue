<template>
    <div id='loginBox'>
        <van-nav-bar
            title="登录"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />
        
        <div class='login'>
            <van-cell-group  style="margin-top: 50px">
                <van-field
                    placeholder="请输入手机号"
                    v-model="obj.account"
                    name="phone"
                    v-validate="'required|phones'"
                    :error="errors.has('phone')"
                    
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/account.png'/>
                </template>
                </van-field>
                <van-field
                    placeholder="请输入密码"
                    type="password"
                    v-validate="'required'"
                    name='password'
                    :error="errors.has('password')"
                    v-model="obj.password"
                >
                <template slot='left-icon'>
                    <img class='inputIcon' src='../../static/images/index/password.png'/>
                </template>
                </van-field>
            </van-cell-group>
            <van-cell-group :border='false' style="text-align: right;margin-top: 10px">
                <router-link to='/password' class="forget">忘记密码</router-link>
            </van-cell-group>
            <van-cell-group :border='false' style="margin-top: 60px;text-align: center">
                <van-button class='btn' @click="submit">登录</van-button>
            </van-cell-group>
            <van-cell-group :border='false' @click="$router.push('/register')" style="margin-top: 10px;text-align: center;color: #999">
                没有账号？去注册
            </van-cell-group>
        </div>
    </div>
</template> k
<script>
import {Toast} from 'vant'
export default {
    data () {
        return {
            obj: {
                account: '',
                password: ''
            }
        }
    },
    methods:{
        submit(){
            var that = this
            this.$validator.validateAll().then(function(result,field) {
                if (result) {
                that.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "Account",
                    interface: "1000",
                    data: that.obj
                }).then(res => {
                    if (res.success) {
                        // that.$cookies.set('status', res.data.status)
                        that.userInfo = res.data
                        that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                        if(confirm('是否直接进入')){
                            that.$router.push('/index')
                        }else{
                            if(res.data.status == -1){
                                Toast('未通过实名认证')
                                that.$router.push('/authentication')
                                return 
                            }else if(res.data.status == -2){
                                Toast('未认证')
                                that.$router.push('/authentication')
                                return 
                            }else if(res.data.status ==  0) {
                                Toast('申请中')
                                return
                            }else if(res.data.status == 1){
                                Toast('登陆成功')
                                that.$router.push('/index')
                            }
                        }
                        // that.$router.push('/login')
                    }else{
                        Toast(res.message)
                    }
                })
                } else {
                    Toast(that.errors.items[0].msg)
                }
            })
            
        },
        onClickLeft () {
            this.$router.push('/index')
        }
    }
}
</script>
<style lang="less" scoped>
.btn{
    width: 343px;
    height: 44px;
    background: red;
    margin: 0 auto;
    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
    border-radius: 22px;
    color: #fff;
}
.inputIcon{
    width: 20px;
    height: 20px;
}
#loginBox {
    .login{
        width: 343px;
        margin:  0 auto;
    }
}
.forget{
    font-size: 12px;
    color: #999;
    text-align: right;
}
</style>