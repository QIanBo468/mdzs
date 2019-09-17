<template>
    <div>
         <van-nav-bar
            title="实名认证"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />
        <van-cell-group class='infoBox'>
            <van-field
                type="text"
                label="姓名"
                v-model="fromObj.realName"
                placeholder="请输入姓名"
                required
                v-validate="'required'"
                name='realName'
                :error="errors.has('realName')"
            />
            <van-field
                type="text"
                label="身份证号"
                v-model="fromObj.identity"
                placeholder="请输入身份证号"
                maxlength="18"
                required
                v-validate="'required'"
                name='identity'
                :error="errors.has('identity')"
            />
        </van-cell-group>
        <van-cell-group title="上传身份证照片" :border='false' class='uploading'>
            <van-row type="flex" justify="space-between">
                <div class='uploaderBox'>
                    <van-uploader :after-read="afterRead" >
                        <!-- <img :src="formObj.identity_img_just" alt=""> -->
                        <img class='imgBox' :src="fromObj.frontImage" alt="">
                    </van-uploader> 
                    <div class='share' v-if='isShowLoding'>
                        <van-loading />
                    </div>
                    <!-- <van-uploader :after-read="afterRead" >
                    </van-uploader>  -->
                </div>
                <div class='uploaderBox'>
                    <van-uploader :after-read="uploadBack" >
                        <img class='imgBox' :src="fromObj.backImage" alt="">
                    </van-uploader>
                    <div class='share' v-if='isShowUpLoding' style="">
                        <van-loading />
                    </div>
                </div>
            </van-row>
        </van-cell-group>
        <van-cell-group class='btnBox'>
            <van-button class='btn' @click='submit'>提交</van-button>
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
                frontImage: './static/images/zheng.png',
                backImage: './static/images/fan.png',
                realName: '',
                identity: '',
            },
            isShowUpLoding: false,
        }
    },
    created () {
        // Toast(123)
    },
    methods : {
        onClickLeft () {
            this.$router.go('-1')
        },
        submit () {
            var img = this.fromObj.frontImage
            
            var that = this
            this.$validator.validateAll().then(function(result) {
                if (result) {
                    if(that.fromObj.frontImage.indexOf('/static/images/') != -1){
                        Toast('请上传身份证正面')
                        return
                    }
                    if(that.fromObj.backImage.indexOf('/static/images/') != -1){
                        Toast('请上传身份证反面')
                        return
                    }
                    that.$axios.fetchPost('/portal',
                        {
                            source: "web",
                            version: "v1",
                            module: "User",
                            interface: "3001",
                            data: that.fromObj
                        }).then(res => {
                            Toast(res.message)
                            if(res.success) {
                                that.$router.push('/login')
                            }
                        })
                }else{
                    Toast(that.errors.items[0].msg)
                }
            })
        },
        uploadBack (file) {
            let params = new FormData();
            params.append("file", file.file)
            this.isShowUpLoding = true
            this.$axios.fetchPost('/upload',
                params
            ).then(res => {
                if(res.success){
                var that = this;
                setTimeout(() => {
                    that.isShowUpLoding = false;
                    that.fromObj.backImage = res.data.file
                    // that.isidentity_img_just = false;
                }, 2500)
                }else{
                    that.isShowUpLoding = false;
                    Toast(res.message)
                }
            }).catch( res => {
                this.isShowUpLoding = false;
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
                    this.isShowLoding = false;
                    Toast('上传失败')
                }
            }).catch( res => {
                this.isShowLoding = false;
                Toast('上传失败')
            })
        },
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
    .btnBox{
        margin: 0 auto 10px;width: 344px
    }
    .imgBox{
        width: 162px;
        height: 98px
    }
    .uploaderBox{
        position: relative;
        height: 98px;
        overflow: hidden
    }
    .share{
        width: 100%;
        height: 98px;
        position: absolute;
        top: 0;
        left: 0;
        bottom:0;
        right: 0;
        background: rgba(0,0,0,0.5);
        text-align: center;
        line-height: 98px
    }
    .uploading{
        margin:0 auto 120px;
        width: 344px
    }
    .infoBox{
        margin: 60px auto 40px;
        width: 344px
    }
</style>