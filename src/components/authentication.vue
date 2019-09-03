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
                type="text"
                label="姓名"
                v-model="fromObj.realName"
                placeholder="请输入姓名"
                required
            />
            <van-field
                type="text"
                label="身份证号"
                v-model="fromObj.identity"
                placeholder="请输入身份证号"
                maxlength="18"
                required
            />
        </van-cell-group>
        <van-cell-group title="上传身份证照片" :border='false' style="margin:0 auto 120px;width: 344px">
            <van-row>
                <van-col span="12">
                    <van-uploader :after-read="afterRead" style="position: relative">
                        <!-- <img :src="formObj.identity_img_just" alt=""> -->
                        <img style="width: 162px;height: 98px" :src="fromObj.frontImage" alt="">
                    </van-uploader> 
                    <div v-if='isShowLoding' style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;bottom:0;right: 0;background: rgba(0,0,0,0.5);text-align: center;line-height: 2rem">
                        <van-loading />
                    </div>
                    <!-- <van-uploader :after-read="afterRead" >
                    </van-uploader>  -->
                </van-col>
                <van-col span="12">
                    <van-uploader :after-read="uploadBack" >
                        <img style="width: 162px;height: 98px" :src="fromObj.backImage" alt="">
                    </van-uploader> 
                </van-col>
            </van-row>
        </van-cell-group>
        <van-cell-group style="margin: 0 auto 10px;width: 344px">

            <van-button class='btn' @click='submit'>按钮</van-button>
        </van-cell-group>
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data () {
        return {
            isShowLoding: false,
            fromObj: {
                frontImage: '../../static/images/zheng.png',
                backImage: '../../static/images/fan.png',
                realName: '',
                identity: '',
            }
        }
    },
    created () {
        // Toast(123)
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        },
        submit () {
            var that = this
            that.$axios.fetchPost('/portal',
                {
                    source: "web",
                    version: "v1",
                    module: "User",
                    interface: "3001",
                    data: that.fromObj
                }).then(res => {

                })
        },
        uploadBack (file) {
            let params = new FormData();
            params.append("file", file.file)
            this.$axios.fetchPost('/upload',
                params
            ).then(res => {
                if(res.success){
                var that = this;
                setTimeout(() => {
                    // that.isShowLoding = false;
                    that.fromObj.backImage = res.data.file
                    // that.isidentity_img_just = false;
                }, 2500)
                }else{
                Toast(res.message)
                }
            }).catch( res => {
                this.isShowLoding = false;
                Toast(res.message)
            })
        },
        afterRead (file) {
            this.isShowLoding = true
            let params = new FormData();
            params.append("file", file.file)
            this.$axios.fetchPost('/upload',
                params
            ).then(res => {
                if(res.success){
                var that = this;
                setTimeout(() => {
                    that.isShowLoding = false;
                    that.fromObj.frontImage = res.data.file
                    // that.isidentity_img_just = false;
                }, 2500)
                }else{
                Toast(res.message)
                }
            }).catch( res => {
                this.isShowLoding = false;
                Toast(res.message)
            })
        },
    }
}
</script>
<style lang="less" scoped>
    
</style>