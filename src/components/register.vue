<template>
  <div id="registerBox">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="register">
      <div class="rg-tiltes">
        <p>注册</p>
        <span>
          已有账号,返回
          <router-link to="/login">登录</router-link>
        </span>
      </div>
      <van-cell-group style="margin: 30px auto">
        <van-field
          placeholder="请输入手机号"
          maxlength="11"
          name="account"
          v-model="fromObj.account"
          :error="errors.has('account')"
          v-validate="'required|phones'"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/mdimg/shouji@3x.png" />
          </template>
        </van-field>
        <van-field
          placeholder="请输入验证码"
          name="captcha"
          maxlength="6"
          v-validate="'required'"
          v-model="fromObj.captcha"
          :error="errors.has('captcha')"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/images/index/yzm@2x.png" />
          </template>
          <template slot="button">
            <div @click="sendCode" class="code">{{btntxt}}</div>
          </template>
          <!-- <van-button slot="button" round size="small" plain type="primary" :disabled = disabled  ></van-button> -->
        </van-field>
        <van-field
          placeholder="请输入密码（最少6位 数字+字母）"
          v-model="fromObj.password"
          name="password"
          type="password"
          maxlength="16"
          :error="errors.has('password')"
          v-validate="'required|password'"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/images/index/jihuoma@2x.png" />
          </template>
        </van-field>
        <van-field
          placeholder="请再次输入密码"
          v-model="fromObj.passworded"
          name="password"
          type="password"
          maxlength="16"
          :error="errors.has('password')"
          v-validate="'required|password'"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/images/index/jihuoma@2x.png" />
          </template>
        </van-field>

        <van-field
          placeholder="请输入支付密码"
          v-model="fromObj.safeworded"
          left-icon="contact"
          name="safeword"
          maxlength="6"
          type="password"
          :error="errors.has('safeword')"
          v-validate="'required|numeric|min:6'"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/images/index/jihuoma@2x.png" />
          </template>
        </van-field>
        <van-field
          placeholder="请再次输入支付密码"
          v-model="fromObj.safeword"
          left-icon="contact"
          name="safeword"
          maxlength="6"
          type="password"
          :error="errors.has('safeword')"
          v-validate="'required|numeric|min:6'"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/images/index/jihuoma@2x.png" />
          </template>
        </van-field>
        <van-field
          placeholder="请输入邀请码"
          left-icon="contact"
          name="inviteCode"
          maxlength="16"
          v-validate="'required'"
          :error="errors.has('inviteCode')"
          v-model="fromObj.inviteCode"
        >
          <template slot="left-icon">
            <img class="inputIcon" src="../../static/mdimg/shouji@3x.png" />
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group :border="false">
        <van-button class="btn" @click="submit">下一步</van-button>
        <div class="agreement" @click="flag = !flag">
          <div class="imgIcon1" v-if="flag"></div>
          <img class="imgIcon" v-if="!flag" src="../../static/mdimg/xuanze_btn@3x.png" />
          已阅读并同意《用户服务协议》
        </div>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      fromObj: {
        account: "", // 手机号
        password: "", // 密码
        passworded: "", // 确认密码
        safeword: "", // 支付密码
        safeworded: "", //确认支付密码
        inviteCode: "", // 推荐人
        captcha: null // 手机验证码
      },
      time: 60,
      btntxt: "发送验证码",
      disabled: false,
      captcha: "验证码",
      flag: true,
      url:''
    };
  },
  created() {
      this.url= this.getUrlKey('id')
      console.log(this.url)
      if(this.url){
          this.fromObj.inviteCode = this.url
      }
    if (this.$route.query.from) {
      this.fromObj.inviteCode = this.$route.query.from;
    }
  },
  mounted() {

  },
  methods: {
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    sendCode() {
      var phone = this.fromObj.account;
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)) {
        Toast("手机号码有误，请重填");
        return false;
      }
      if (this.disabled == false) {
        this.$axios
          .fetchPost("/portal", {
            source: "web",
            version: "v1",
            module: "Account",
            interface: "1001",
            data: { account: this.fromObj.account }
          })
          .then(res => {
            Toast(res.message);
            if (res.code == 0) {
              this.disabled = true;
              var that = this;
              var times = setInterval(function() {
                that.time--;
                if (that.time > 0) {
                  that.btntxt = "重新获取(" + that.time + "s)";
                } else {
                  clearInterval(times);
                  that.time = 10;
                  that.btntxt = "获取验证码";
                  that.disabled = false;
                }
              }, 1000);
            }
          })
          .catch(res => {
            Toast(res.message);
          });
      }
    },
    submit() {
      var that = this;
      this.$validator.validateAll().then(function(result) {
        if (result) {
          if (that.flag) {
            Toast("请勾选并同意用户协议");
            return;
          }
          that.$axios
            .fetchPost("/portal", {
              source: "web",
              version: "v1",
              module: "Account",
              interface: "1002",
              data: that.fromObj
            })
            .then(res => {
              if (res.success) {
                Toast("注册成功");
                // that.$cookies.set('status', res.data.status)
                that.$router.push("/login");
                // that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
              } else {
                Toast(res.message);
              }
            });
        } else {
          console.log(that.errors);
          Toast(that.errors.items[0].msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#registerBox {
  width: 100%;
  height: 100%;
  background: #0b0c21;
}
.van-nav-bar {
  background: #0b0c21;
}
.van-nav-bar__title {
  color: #ffffff;
}
.van-icon-arrow-left:before {
  color: #ffffff;
}
/deep/.van-field--error .van-field__control,
.van-field--error .van-field__control::placeholder {
  color: #dee7ff;
}
/deep/.van-field__control {
  color: #dee7ff;
}
.van-button--default {
  border: 1px solid #373751;
}
.van-cell-group {
  background: #0b0c21;
  border: none;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-cell {
  background: #0b0c21;
}
.van-hairline--bottom::after {
  border: none;
}
/deep/input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #0b0c21 inset !important;
  -webkit-text-fill-color: white;
  border: 1px solid #373751;
}
.register {
  width: 343px;
  margin: 0 auto;
  .agreement {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    line-height: 20px;
    text-align: center;
    .imgIcon1 {
      width: 10px;
      height: 10px;
      background: #ccc;
      margin-right: 4px;
    }
    img {
      width: 24px;
      height: 24px;
      z-index: 2;
    }
  }
  .rg-tiltes {
    padding: 10px;
    p {
      font-size: 18px;
      color: #fff;
      // margin: 0;
      padding: 0;
    }
    span {
      font-style: 16px;
      color: #fff;
    }
    a {
      color: #8fadff;
    }
  }
}
.inputIcon {
  width: 20px;
  height: 20px;
  margin-top: 2px;
}
.btn {
  width: 343px;
  height: 44px;
  background: red;
  margin: 0 auto;
  background-image: linear-gradient(90deg, #494efe, #0b02f8);
  background: #4a66fa;
  border-radius: 6px;
  color: #fff;
}
.imgIcon {
  width: 13px;
  height: 13px;
  // margin-right: 10px;
}
.code {
  // width:78px;
  padding: 0 6px;
  height: 24px;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid #999999;
  // background: #F84D4D;
  color: #999999;
  text-align: center;
  font-size: 12px;
  // co
}
</style>