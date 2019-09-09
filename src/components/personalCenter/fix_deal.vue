<template>
  <div class="fix_deal">
    <van-nav-bar title="修改支付密码" left-arrow @click-left="onClickLeft" />
    <div class="deal_list">
      <van-field v-model="current" placeholder="请输入当前支付密码" label="请输入当前支付密码" type="password" />
      <van-field v-model="newPwd" placeholder="请输入新密码" label="请输入新密码" type="password" />
      <van-field v-model="checkPwd" placeholder="请再次输入新密码" label="确认新密码" type="password" />
    </div>
    <div class="sure">
      <button @click="fix_pass">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: '',
      newPwd: '',
      checkPwd: ''
    }
  },
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    fix_pass () {
      this.$axios
        .fetchPost('/portal', {
          interface: '2002',
          module: 'User',
          source: 'web',
          version: 'v1',
          data: {
            oldSafeword: this.current,
            safeword: this.newPwd,
            repeat: this.checkPwd
          }
        })
        .then(res => {
          console.log('修改支付密码', res)
          this.$toast(res.message)
        })
    }
  },
  created () {}
}
</script>
<style scoped>
.fix_deal {
  background: #f5f5f5;
  min-height: 100vh;
  height: auto;
}
.deal_list {
  margin-top: 10px;
}
.fix_deal >>> .van-field__label {
  width: 149px;
}
.sure {
  padding: 15px;
  margin-top: 55px;
  /* position: fixed;
  bottom: 260px;
  left: 0;
  right: 0; */
}
.sure button {
  background: #f45c68;
  width: 100%;
  border: none;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  border-radius: 23px;
}
</style>
