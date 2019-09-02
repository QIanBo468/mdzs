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
                />
                <van-field
                    placeholder="请输入密码"
                    left-icon="bag-o"
                    type="password"
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
            this.$axios.fetchPost('/portal',
            {
                source: "web",
                version: "v1",
                module: "Account",
                interface: "1000",
                data: this.obj
            }).then(res => {
                this.userInfo = res.data
                this.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                this.$router.push('/')
            })
        },
        onClickLeft () {

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