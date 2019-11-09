<template>
  <div class="content">
    <van-nav-bar title="邀请好友" left-arrow @click-left="$router.go(-1)" :border="false" />
    <div class="main">
      <div class="title">
        <h2>锚定钻石邀请您注册及下载</h2>

      </div>
      <div class="con">
        <div class="top">
          <p>注册邀请码</p>
          <label>{{num}}</label>
          <button @click="copy(num)">复制</button>
        </div>
        <img width="80%" src="../../../static/mdimg/zhixian@3x.png" alt="">
        <div class="bottom">
          <img :src="qrcode" alt />
          <p>长按二维码识别</p>
          <!-- <button @click="show=true">邀请好友</button> -->
        </div>
      </div>
    </div>
    <!-- <van-popup v-model="show" position="bottom">
      <div class="popup">
        <ul class="flex">
          <li>
            <div class="box flex flex-align-center flex-pack-center">
              <img src="../../assets/img/weixin.png" alt />
            </div>
            <p>微信</p>
          </li>
          <li>
            <div class="box flex flex-align-center flex-pack-center">
              <img src="../../assets/img/pengyouquan.png" alt />
            </div>
            <p>朋友圈</p>
          </li>
          <li>
            <div class="box flex flex-align-center flex-pack-center">
              <img src="../../assets/img/QQ.png" alt />
            </div>
            <p>QQ</p>
          </li>
          <li>
            <div class="box flex flex-align-center flex-pack-center">
              <img src="../../assets/img/weibo.png" alt />
            </div>
            <p>微博</p>
          </li>
        </ul>
        <button @click="show = false">取消</button>
      </div>
    </van-popup>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // show: true,
      num: '',
      qrcode: '',
      info: ''
    }
  },
  methods: {
    copy (num) {
      this.show = true
      this.$toast('已复制')
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', num)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(input)
    }
  },
  created () {
    this.$axios
      .fetchPost('/portal', {
        interface: '7000',
        module: 'User',
        source: 'web',
        version: 'v1'
      })
      .then(res => {
        console.log(res)
        this.num = res.data.inviteCode
        this.qrcode = res.data.qrCode
        this.info = res.data
      })
  }
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
  min-height: 100vh;
  height: auto;
  color: #fff;
  text-align: center;
  background: #0C0C0C;
}
.title h2 {
  font-size: 20px;
  line-height: 1;
  margin-top: 25px;
  margin-bottom: 10px;
}
.title span {
  font-size: 12px;
  line-height: 1;
  display: inline-block;
}
.title span:nth-child(1) {
  margin-right: 20px;
}
.con {
  width: 270px;
  height: 420px;
  background: linear-gradient(90deg,#4A66FA 0%, #7482FC 100%);
  background-size: 100% 100%;
  margin: 20px auto 0;
  color: #fff;
  border-radius: 6px;
}
.con .top {
  height: 166px;
  padding-top: 30px;
}
.con .top p {
  font-size: 14px;
  line-height: 1;
}
.con .top label {
  font-size: 35px;
  line-height: 1;
  font-weight: 500;
  margin-top: 7px;
  letter-spacing: 3px;
  display: block;
}
.main button {
  width: 80px;
  height: 28px;
    background: linear-gradient(90deg, #494EFE 0%, #0900F8 100%);
  background-size: 100% 100%;
  font-size: 12px;
  display: inline-block;
  color: #ffffff;
  margin-top: 10px;
  border-radius: 18px;
}
.con .bottom {
  padding-top: 45px;
}
.con .bottom img {
  width: 110px;
  height: 110px;
}
.con .bottom p {
  font-size: 12px;
  line-height: 1;
  margin-top: 10px;
}
.popup ul {
  background: #f5f5f5;
  padding: 20px 6px;
}
.popup li {
  margin-left: 10px;
}
.popup .box {
  width: 60px;
  height: 60px;
  border: 1px dashed #999999;
}
.popup p {
  font-size: 10px;
  line-height: 1;
  color: #999999;
  margin-top: 10px;
}
.popup button {
  width: 100%;
  height: 50px;
  background: #fff;
  font-size: 18px;
  color: #333;
}
</style>
