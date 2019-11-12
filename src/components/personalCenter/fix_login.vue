<template>
  <div class="fix_login">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <div class="login_list">
      <div class="content-title">
        <div class="shuxian"></div>安全验证{{'('+usernum+')'}}
      </div>
      <div class="inputBox" style="margin-bottom: 40px">
        <van-field
          placeholder="请输入验证码"
         maxlength="6"
          :border="false"
          name="safeword"
          v-model="safeword"
          :error="errors.has('safeword')"
          v-validate="'required'"
          color='#f00'
        />
        <div class="red time" @click="time">{{codeText}}</div>
      </div>
      <div class="content-title">
        <div class="shuxian"></div>原密码
      </div>
      <van-field  class="fuck" v-model="login_pwd" maxlength="16" :placeholder="placeholder" :label="placeholder" type="password" />
      <div class="content-title">
        <div class="shuxian"></div>新密码
      </div>
      <van-field v-model="password" placeholder="请输入新密码" maxlength="16" label="请输入新密码" type="password" />
      <van-field v-model="passPwd" placeholder="请再次输入新密码" maxlength="16" label="确认新密码" type="password" />
    </div>
    <div class="intrd">请输入6~20个英文字母，数字或符号</div>
    <div class="sure">
      <button @click="fix_loginPass">完成</button>
    </div>
  </div>
</template>

<script>

import { Dialog } from 'vant'

export default {
  data() {
    return {
      login_pwd: "",
      password: "",
      passPwd: "",
      safeword:null,
      codeText: "获取验证码",
      codeTime: 60,
      show: false,
      usernum:'',
      title:'修改登录密码',
      placeholder:'请输入当前登录密码'
    };
  },
  created() {
    if( this.$route.query.type == 0){
      this.title = '修改登录密码',
      this.placeholder = '请输入当前登录密码'
    } else {
      this.title = '修改支付密码',
       this.placeholder = '请输入当前支付密码'
    }
    this.usernum = this.$route.query.account.substr(0,3)+'****'+this.$route.query.account.substr(7)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
      time () {
        if(this.codeText == '获取验证码'){
          var that = this;
          let interfaces;
          if(this.$route.query.type == 0) {
            interfaces = '2000'
          } else {
            interfaces = '2003'
          }
          console.log(interfaces)
          that.$axios.fetchPost('/portal',
            {
              source: "web",
              version: "v1",
              module: "User",
              interface: interfaces,
              data: {}  //template:'5bcd32b99a1df09e1a90317626d19d9b'
            }).then(res => {
            this.disabled = false
            if(res.success){
              Dialog.alert({
                title: '提示',
                message: res.message
              })
              var time = setInterval(() => {
                if(that.codeTime <= 0){
                  clearInterval(time)
                  that.codeText = '获取验证码'
                  that.codeTime = 60
                }else{
                  that.codeTime --
                  that.codeText = that.codeTime + 's'
                }
              },1000)
            }else{
              this.$toast(res.message)
            }
          })

        }
      },
    fix_loginPass() {
      if (this.login_pwd == "") {
        this.$toast("当前登录密码不能为空！");
        return false;
      }
      if (this.password == "") {
        this.$toast("新密码不能为空！");
        return false;
      }
      if (this.passPwd == "") {
        this.$toast("确认密码不能为空！");
        return false;
      }
      let interfaces;
      if ( this.$route.query.type ==0 ) {
          interfaces = 2001
      } else{
        interfaces = 2005
      }
      console.log(interfaces)
      this.$axios
        .fetchPost("/portal", {
          interface: interfaces,
          module: "User",
          source: "web",
          version: "v1",
          data: {
            oldPassword: this.login_pwd,
            password: this.password,
            // repeat: this.passPwd,
            captcha: this.safeword
          }
        })
        .then(res => {
          console.log("修改登录密码", res);
          if (res.code == 0) {
            this.$toast({
              message: res.message,
              duration: 1000
            });
            setTimeout(() => {
              this.$router.push("login");
            }, 1000);
          } else {
            this.$toast(res.message);
          }
        });
    }
  }
};
</script>
<style scoped>

.van-nav-bar {
  background: #0d0900;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon {
  color: #fff;
}

.van-cell {
  background: #212243;
  color: #fff;
}
.fix_login {
  background: #0d0900;
  min-height: 100vh;
  height: auto;
}
.login_list {
  margin-top: 10px;
}
.fix_login >>> .van-field__label {
  width: 149px;
}
.intrd {
  padding: 10px;
  color: #999999;
  font-size: 10px;
}
.sure {
  padding: 15px;

  margin-top: 55px;
}
.sure button {
  background: #4a66fa;
  width: 100%;
  border: none;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
}
.content-title {
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.shuxian {
  width: 4px;
  height: 16px;
  background: #0b02f8;
  margin-right: 10px;
}
.inputBox {

  display: flex;

  padding: 6px;
  background: #212243;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  
}
.fix_login >>> .van-field__control{
  color: #fff;
}
.time {
  width: 85px;
  color: #fff;
  height: 24px;

  line-height: 24px;
  border-radius: 12px;
  font-size: 12px;
  text-align: center;
  background: linear-gradient(90deg, #494efe 0%, #0900f8 100%);
}
[class*="van-hairline"]::after {
  border: none;
}
.van-cell:not(:last-child)::after{
  border: none;
}
input{
  color: #fff !important;
}
.fuck{
  color: #fff;
}
</style>
