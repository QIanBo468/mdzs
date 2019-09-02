<template>
  <div class="safe_center">
    <van-nav-bar title="账户与安全" left-arrow @click-left="onClickLeft" />
    <div class="fix_pass">
      <div class="password">
        <router-link class="login_pass" to="fix_login">
          <span>修改登录密码</span>
          <img src="../../assets/img/more_small.png" alt />
        </router-link>
        <router-link class="login_pass" to="fix_deal">
          <span>修改支付密码</span>
          <img src="../../assets/img/more_small.png" alt />
        </router-link>
      </div>
    </div>
    <div class="fix_pass">
      <div class="password">
        <div class="login_pass">
          <span>清空缓存</span>
          <div class="huancun">
            <span>300M</span>
            <img src="../../assets/img/more_small.png" alt />
          </div>
        </div>
        <div class="login_pass">
          <span>当前版本</span>
          <div class="huancun">
            <span>V1.0.0</span>
            <img src="../../assets/img/more_small.png" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  created () {}
}
</script>
<style scoped>
.safe_center {
  background: #f8f8f8;
  height: 100vh;
}
.fix_pass {
  padding: 5px;
  background: #fff;
  margin-top: 10px;
}
.login_pass {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.login_pass:last-child {
  border: none;
}
.login_pass > span {
  color: #666666;
  font-size: 14px;
}
.login_pass > img {
  width: 9px;
  height: 14px;
}
.huancun {
  display: flex;
  align-items: center;
}
.huancun > span {
  color: #333333;
  font-size: 14px;
  margin-right: 5px;
  font-weight: 400;
}
.huancun > img {
  width: 9px;
  height: 14px;
}
</style>
