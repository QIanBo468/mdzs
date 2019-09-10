<template>
    <div id='result'>
        <van-nav-bar
            title="认证"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />
        <div class='box'>

            <img class='img' src="../../static/images/index/success.png" alt="">
            <div class='title'>提交成功</div>
            <div class='explain'>客服审核中，请耐心等待！</div>
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
                account: '',
                password: ''
            }
        }
    },
    methods:{
        submit(){
            this.$$router.push('/login')
        },
        onClickLeft () {
            this.$router.go(-1)
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
#result {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .login{
        width: 343px;
        margin:  0 auto;
    }
    .box{
        display: flex;
        text-align: center;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
    .title{
        font-size: 20px;
        color: #333;
        margin-bottom: 9px;
        height: 28px;
        line-height: 28px;
    }
    .explain{
        color: #888888;
        font-size: 14px;
        margin-bottom: 258px;
    }
}
.img{
    width: 65px;
    height: 65px;
    margin: 30px auto 16px;
}
.forget{
    font-size: 12px;
    color: #999;
    text-align: right;
}
</style>
