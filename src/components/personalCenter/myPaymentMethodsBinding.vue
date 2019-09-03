<template>
<div class="root">
  <van-nav-bar :title="'绑定' + title" left-arrow class="nav-top" @click-left="back" />

  <div class="main">
    <template v-if="type !== 0">
      <div>
        <div class="label">账户名称</div>
        <van-field
          class="input"
          v-model="realName"
          placeholder="账户名称和实名信息一致（真实姓名）"
          clearable
        />
      </div>
      <div>
        <div class="label">{{ title }}</div>
        <van-field
          class="input"
          v-model="account"
          :placeholder="'请输入' + title"
          clearable
        />
      </div>
      <div>
        <div class="label">收款二维码</div>
        <van-uploader v-model="qrCodeFileList" :max-count="1" :after-read="upload" />
      </div>
    </template>

    <template v-else>
      <div>
        <div class="label">持卡人</div>
        <van-field
          class="input"
          v-model="realName"
          placeholder="请输入持卡人姓名"
          clearable
        />
      </div>
      <div>
        <div class="label">卡号</div>
        <van-field
          class="input"
          v-model="account"
          type="number"
          placeholder="请输入银行卡号"
          clearable
        />
      </div>
      <div>
        <div class="label">开户行</div>
        <van-field
          class="input"
          v-model="bankAddress"
          placeholder="请输入开户行"
          clearable
        />
      </div>
      <div>
        <div class="label">身份证号</div>
        <van-field
          class="input"
          v-model="idCard"
          placeholder="请输入本人身份证号"
          clearable
        />
      </div>
      <div>
        <div class="label">银行预留手机号</div>
        <van-field
          class="input"
          v-model="mobile"
          type="number"
          maxlength="11"
          placeholder="请输入银行预留手机号"
          clearable
        />
      </div>
    </template>

    <div class="sms">
      <div class="label">验证码</div>
      <van-field
        class="input"
        v-model="captcha"
        placeholder="请输入验证码"
        maxlength="6"
        type="number"
        clearable
      >
        <template #button>
          <van-button
            v-if="counter > 0"
            type="small"
            disabled
            class="sms-button"
            @click="clickSms"
          >
            <span class="counter">{{counter}}</span>秒
          </van-button>
          <van-button
            v-else
            type="small"
            class="sms-button"
            @click="clickSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
    </div>

    <div class="empty"></div>

    <van-button class="bind-btn" @click="bind">立即绑定</van-button>
  </div>

</div>
</template>

<script>
export default {
  data() {
    let type = this.$route.query.type
    let id = this.$route.query.id

    let title = ""
    switch (type) {
      case 1:
        title = "支付宝账号"
        break
      case 2:
        title = "微信账号"
        break
      case 0:
        title = "银行卡"
        break
    }

    return {
      type,
      id,

      title,
      captcha: "",
      counter: 0,

      realName: "",
      account: "",
      qrCodeFileList: [],

      bankAddress: "",
      idCard: "",
      mobile: "",
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    clickSms() {
      this.counter = 60
      let timer = setInterval(() => {
        if (this.counter === 0) {
          clearInterval(timer)
          return
        }
        this.counter--
      }, 1000)

      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1000",
        data: {
        },
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) {
          return
        }

        this.$axios.fetchPost('/portal', {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1906",
          data: {
            account: res.data.account,
          },
        }).then(res => {
          console.log(res)
        })
      })
    },

    bind() {
      let param = {
        type: this.type,
        account: this.account,
        realName: this.realName,
        captcha: this.captcha,
      }

      if (param.type === 0) {
        param.bankAddress = this.bankAddress
        param.idCard = this.idCard
        param.mobile = this.mobile
      } else {
        param.qrCode = this.qrCode
      }

      let errmsg = this.checkParam(param)
      if (errmsg) {
        this.$toast(errmsg)
        return
      }

      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1901",
        data: param,
      }).then(res => {
        console.log(res)
        if (res.code !== 0) {
          this.$toast(res.message)
          return
        }
      })
    },

    checkParam(param) {
      if (param.type !== 0) {
        if (!param.realName) {
          return "账户名称必填"
        }
        if (!param.account) {
          return this.title + "必填"
        }
        if (!param.qrCode) {
          return "收款二维码必传"
        }
      } else {
        if (!param.realName) {
          return "持卡人必填"
        }
        if (!param.account) {
          return "卡号必填"
        }
        if (!param.bankAddress) {
          return "开户行必填"
        }
        if (!param.idCard) {
          return "身份证号必填"
        }
        if (!param.mobile) {
          return "银行预留手机号必填"
        }
      }

      if (!param.captcha) {
        return "验证码必填"
      }
      return ""
    },

    upload(file) {
      let form = new FormData()
      form.append("avatar", file)
      this.$axios.fetchPost("http://ofc.qdunzi.com/upload", {
        file: form,
      }).then(res => {
        console.log(res)
        this.qrCode = res.file
      }).catch(err => {
        console.log(err)
      })
    },

    getData() {
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1902",
        data: {
          id: this.id,
        },
      }).then(res => {
        // console.log(res)
        if (res.code !== 0) {
          return
        }

        let d = res.data
        this.realName = d.realName
        this.account = d.account
        this.bankAddress = d.bankAddress
        this.idCard = d.idCard
        this.mobile = d.mobile
        this.qrCode = d.qrCode
        this.qrCodeFileList = [
          {
            url: d.qrCode,
          }
        ]
      })
    },
  },

  created() {
    if (this.id) {
      this.getData()
    }
  },
}
</script>

<style lang="less" scoped>
.root {
  background: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-top {
  margin-bottom: 10px;
}

.main {
  flex-grow: 1;
  padding: 10px 16px 0;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.label {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.input {
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.sms-button {
  color: rgba(248, 77, 77, 1);
  background: none;
  border: none;
  font-size: 14px;
  opacity: 1;
}

.empty {
  flex-grow: 1;
}

.bind-btn {
  margin-bottom: 41px;
  background: url("../../assets/img/big_btn.png");
  color: #fff;
}

</style>
