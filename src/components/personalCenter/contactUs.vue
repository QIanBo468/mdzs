<template>
  <dir class="content">
    <van-nav-bar title="联系我们" left-arrow @click-left="$router.go(-1)" :border="false" />
    <div class="main">
      <h2>微信二维码</h2>
      <div class="box">
        <img :src="qrcode" alt />
      </div>
      <div class="title">
        <p>客服电话：{{phone}}</p>
        <p>客服时间:{{time}}</p>
      </div>
    </div>
  </dir>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      qrcode: '',
      phone: ''
    }
  },
  created () {
    this.$axios
      .fetchPost('/portal', {
        interface: '7001',
        module: 'User',
        source: 'web',
        version: 'v1'
      })
      .then(res => {
        console.log('联系我们', res)
        this.time = res.data.kf_time
        this.qrcode = res.data.wx_qrCode
        this.phone = res.data.kf_mobile
      })
  },
  methods: {}
}
</script>

<style scoped>
@import "../../assets/css/reset.css";
.van-nav-bar {
  background: none;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
  max-width: 100%;
}
.content {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #fd5966 0%, #f42d3d 100%);
  color: #fff;
  text-align: center;
}
.main {
  padding-top: 60px;
}
.main h2 {
  font-size: 18px;
  line-height: 1;
}
.main .box {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  background: #fff;
  padding: 10px;
  margin: 20px auto 0;
}
.main .box img {
  width: 100%;
  height: 100%;
}
.title {
  margin-top: 50px;
}
.title p {
  font-size: 14px;
  line-height: 1;
  margin-top: 15px;
}
</style>
