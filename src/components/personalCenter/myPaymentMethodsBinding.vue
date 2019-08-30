<template>
<div class="root">
  <van-nav-bar :title="title" left-arrow class="nav-top" @click-left="back" />

</div>
</template>

<script>
export default {
  data() {
    let type = this.$route.query.type

    let title = ""
    switch (type) {
      case "alipay":
        title = "绑定支付宝账号"
        break
      case "weixin":
        title = "绑定微信账号"
        break
      case "bankcard":
        title = "绑定银行卡"
        break
    }

    return {
      type,
      title,
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  background: #f8f8f8;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
}

</style>
