<template>
<div class="root">
  <van-nav-bar :title="'绑定' + title" left-arrow class="nav-top" @click-left="back" />

  <div class="main">
    <template v-if="type !== 'bankcard'">
      <div>
        <div class="label">账户名称</div>
        <van-field
          class="input"
          v-model="accountName"
          placeholder="账户名称和实名信息一致（真实姓名）"
          clearable
        />
      </div>
      <div>
        <div class="label">{{ title }}</div>
        <van-field
          class="input"
          v-model="accountNo"
          :placeholder="'请输入' + title"
          clearable
        />
      </div>
      <div>
        <div class="label">收款二维码</div>
        <van-uploader />
      </div>
    </template>

    <template v-else>
      <div>
        <div class="label">持卡人</div>
        <van-field
          class="input"
          v-model="cardHolder"
          placeholder="请输入持卡人姓名"
          clearable
        />
      </div>
      <div>
        <div class="label">卡号</div>
        <van-field
          class="input"
          v-model="cardNo"
          placeholder="请输入银行卡号"
          clearable
        />
      </div>
      <div>
        <div class="label">身份证号</div>
        <van-field
          class="input"
          v-model="idCardNo"
          placeholder="请输入本人身份证号"
          clearable
        />
      </div>
      <div>
        <div class="label">银行预留手机号</div>
        <van-field
          class="input"
          v-model="bankPhone"
          placeholder="请输入银行预留手机号"
          clearable
        />
      </div>
    </template>

    <div class="sms">
      <div class="label">验证码</div>
      <van-field
        class="input"
        v-model="sms"
        placeholder="请输入验证码"
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
      case "alipay":
        title = "支付宝账号"
        break
      case "weixin":
        title = "微信账号"
        break
      case "bankcard":
        title = "银行卡"
        break
    }

    return {
      type,
      id,

      title,
      sms: "",
      counter: 0,

      accountName: "",
      accountNo: "",
      qrCode: "",

      cardHolder: "",
      cardNo: "",
      idCardNo: "",
      bankPhone: "",
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
    },

    bind() {
    },
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
