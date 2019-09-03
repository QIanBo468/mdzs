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
                    left-icon="manager-o"
                    v-model="obj.account"
                    name="phone"
                    v-validate="'required|phone'"
                    :error="errors.has('phone')"
                    
                />
                <van-field
                    placeholder="请输入密码"
                    left-icon="bag-o"
                    type="password"
                    v-validate="'required'"
                    name='password'
                    :error="errors.has('password')"
                    v-model="obj.password"
                />
            </van-cell-group>
            <van-cell-group :border='false' style="text-align: right">
                <router-link to='/password' class="forget">忘记密码</router-link>
            </van-cell-group>
            <van-cell-group :border='false' style="margin-top: 60px;text-align: center">
                <van-button class='btn' @click="submit">登录</van-button>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    data () {
        return {
            obj: {
                account: '14589986651',
                password: '123abc'
            }
        }
    },
    methods:{
        submit(){
            var that = this
            this.$validator.validateAll().then(function(result) {
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
                        that.userInfo = res.data
                        that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                        that.$router.go(-1)
                    }else{
                        Toast(res.message)
                    }
                })
                } else {
                    Toast('格式有误')
                }
            })
            
        },
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
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