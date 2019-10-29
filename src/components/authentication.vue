<template>
    <div class="shiming">
         <van-nav-bar
            title="实名认证"
            left-arrow
            @click-left="onClickLeft"
            :border='false'
        />

      <div style="position: fixed;z-index: 9999;width: 100%;height: 100%;top: 50px;bottom: 0;background: #000;color:#fff;" v-if="status >0">
        <div v-if="status == 1" style="margin:50% auto;width: 30%">
           <div>
             <img class='imgBox' :src="waitImg" alt="" style="width: 100%">
           </div>
          <div style="font-size: 20px;text-align: center;margin-top: 10%">
            认证中.....
          </div>
        </div>

        <div v-if="status == 2" style="margin:50% auto;width: 30%">
          <div>
            <img class='imgBox' :src="sureImg" alt="" style="width: 100%;">
          </div>
          <div style="font-size: 20px;text-align: center;margin-top: 10%">
            认证成功
          </div>
        </div>

      </div>

        <van-cell-group class='infoBox'>
            <van-field
                class="xingming"
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
        <!-- <van-cell-group class='btnBox'>
            <van-button class='btn' @click='submit'>提交</van-button>
        </van-cell-group> -->
        <div class="btn">
            <button @click='submit'>提交</button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import VueCookies from 'vue-cookies'
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
          waitImg:'./static/images/shenheimg.png',
          sureImg:'./static/images/tongguos.png',
            isShowUpLoding: false,
          status:''
        }
    },
    created () {
       //查询用户的实名认证情况
      this.$axios
        .fetchPost('/portal', {
          interface: '3000',
          module: 'User',
          source: 'web',
          version: 'v1',
          data: {}
        })
        .then(res => {
          this.$cookies.set('status',res.data.status);
          this.status = res.data.status;
        })
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
                            if(res.success) {
                                Toast(res.message)
                                that.$router.go(-1)
                              setTimeout(() => {
                                that.$router.go(-1)
                              }, 2500)

                            }else{
                                Toast(res.message)
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


  /deep/.van-field__control {
    color: #fff;
  }

.van-nav-bar{
  background: #0D0900;
}
.van-nav-bar__title{
  color: #ffffff;
}
.van-nav-bar__text[data-v-14179e7b]{
  color: #ffffff;
}
[class*=van-hairline]::after{
  border: none;
}
.van-icon{
  color: #ffffff;
}


.van-cell{
    background: #0D0900;
    color: #fff;
    border-bottom: 1px solid #707070;
}

.van-cell:not(:last-child)::after{
    border-bottom: 1px solid #707070;
}

.van-cell-group{
    background: transparent;
}
.shiming{
    width: 100%;
    height: 100%;
    background: #0D0900;
}
    .btn{
        position: fixed;
        width: 100%;
        bottom: 20px;
        margin: 0 auto;
        background: transparent;
        display: flex;
        justify-content: center;
        button{
            width: 95%;
            height: 44px;
            background:linear-gradient(90deg,#494EFE 0%,#0900F8 100%);
            border-radius: 6px;
            text-align: center;
            color: #fff;
            border: none;
            font-size: 17px;
        }
    }
    // .btnBox{
    //     margin: 0 auto 10px;width: 344px
    // }
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
        width: 344px;
    }
    .infoBox{
        margin: 60px auto 40px;
        width: 344px
    }
    // xingming{
    //     background: #0900F8;
    // }
</style>
