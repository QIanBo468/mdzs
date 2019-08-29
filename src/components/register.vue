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
                />

                <van-field
                    placeholder="请输入密码（最少8位数字+密码）"
                    left-icon="contact"
                >
                </van-field>

                <van-field
                    placeholder="请再次输入密码"
                    left-icon="contact"
                />
                <van-field
                    placeholder="请输入邀请码"
                    left-icon="contact"
                />
            </van-cell-group>
            <van-cell-group :border='false'>
                <van-button  class='btn'>下一步</van-button>
                <div class='agreement'>
                    已阅读并同意以下协议：《ofc服务协议》
                </div>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods : {
        onClickLeft () {
            
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