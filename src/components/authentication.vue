<template>
    <div>
         <van-nav-bar
            title="实名认证"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />
        <van-cell-group style="margin: 60px auto 40px;width: 344px">
            <van-field
                type="password"
                label="姓名"
                placeholder="请输入姓名"
                required
            />
            <van-field
                type="password"
                label="身份证号"
                placeholder="请输入身份证号"
                required
            />
        </van-cell-group>
        <van-cell-group title="上传身份证照片" :border='false' style="margin:0 auto 120px;width: 344px">
            <van-row>
                <van-col span="12">
                    <van-uploader :after-read="afterRead" >
                        <img width='162' src="../../static/images/zheng.png" alt="">
                    </van-uploader> 
                </van-col>
                <van-col span="12">
                    <van-uploader :after-read="afterRead" >
                        <img width='162' src="../../static/images/fan.png" alt="">
                    </van-uploader> 
                </van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group style="margin: 0 auto 10px;width: 344px">

            <van-button class='btn' >按钮</van-button>
        </van-cell-group>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data () {
        return {

        }
    },
    created () {
        // Toast(123)
    },
    methods : {
        onClickLeft () {

        },
        afterRead () {

        }
    }
}
</script>
<style lang="less" scoped>
    
</style>