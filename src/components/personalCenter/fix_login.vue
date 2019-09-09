<template>
  <div class="fix_login">
    <van-nav-bar title="修改登录密码" left-arrow @click-left="onClickLeft" />
    <div class="login_list">
      <van-field v-model="login_pwd" placeholder="请输入当前登录密码" label="请输入当前登录密码" type="password" />
      <van-field v-model="password" placeholder="请输入新密码" label="请输入新密码" type="password" />
      <van-field v-model="passPwd" placeholder="请再次输入新密码" label="确认新密码" type="password" />
    </div>
    <div class="intrd">请输入6~20个英文字母，数字或符号</div>
    <div class="sure">
      <button @click="fix_loginPass">完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login_pwd: '',
      password: '',
      passPwd: ''
    }
  },
  created () {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    fix_loginPass () {
      if (this.login_pwd == '') {
        this.$toast('当前登录密码不能为空！')
        return false
      }
      if (this.password == '') {
        this.$toast('新密码不能为空！')
        return false
      }
      if (this.passPwd == '') {
        this.$toast('确认密码不能为空！')
        return false
      }
      this.$axios
        .fetchPost('/portal', {
          interface: '2001',
          module: 'User',
          source: 'web',
          version: 'v1',
          data: {
            oldPassword: this.login_pwd,
            password: this.password,
            repeat: this.passPwd
          }
        })
        .then(res => {
          console.log('修改登录密码', res)
          if (res.code == 0) {
            this.$toast({
              message: res.message,
              duration: 1000
            })
            setTimeout(() => {
              this.$router.push('login')
            }, 1000)
          } else {
            this.$toast(res.message)
          }
        })
    }
  }
}
</script>
<style scoped>
.fix_login {
  background: #f5f5f5;
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
  /* position: fixed;
  bottom: 260px;
  left: 0;
  right: 0; */
   margin-top: 55px;
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
