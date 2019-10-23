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
            <van-cell-group :border='false' style="margin-top: 60px;text-align: center; background: #0D0900;">
                <button class='btn' @click="submit">确认</button>
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
    background:linear-gradient(90deg,#494EFE 0%,#0900F8 100%);
    border-radius: 6px;
    color: #fff;
    border: none;
    font-size: 17px;
}
.inputIcon{
    width: 20px;
    height: 20px;
}
#result {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #0D0900;
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
        color: #fff;
        margin-bottom: 9px;
        height: 28px;
        line-height: 28px;
    }
    .explain{
        color: #DEE7FF;
        font-size: 14px;
        margin-bottom: 258px;
    }
}
.img{
    width: 33px;
    height: 33px;
    margin: 50px auto 50px;
}
.forget{
    font-size: 12px;
    color: #999;
    text-align: right;
}
</style>
