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
                    left-icon="manager-o"
                />

                <van-field
                    placeholder="请输入验证码"
                    left-icon="coupon-o"
                >
                <van-button slot="button" round size="small" plain type="primary" class='code'>发送验证码</van-button>
                </van-field>

                <van-field
                    placeholder="请输入密码"
                    left-icon="bag-o"
                />
            </van-cell-group>
            <van-cell-group>
                <van-button class='btn'>按钮</van-button>
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
    .password{
        width: 343px;
        margin: 0 auto;
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