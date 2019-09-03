<template>
  <div class="myIndex">
    <div class="my_header">
      <van-nav-bar title="我的">
        <van-icon name="setting-o" size="20" slot="right" @click="onClickRight" />
      </van-nav-bar>
      <div class="top">
        <img :src="avatar" alt class="headpic" />

        <div class="headtext">
          <p>{{info.nickname}}</p>
          <p>ID：{{info.id}}</p>
          <p>级别：{{info.level}}</p>
        </div>
      </div>
    </div>
    <div class="my_list">
      <router-link class="list" to="my_Mill">
        <div class="my_first">
          <img src="../../assets/img/wodekuangji.png" alt />
          <p>我的矿机</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to>
        <div class="my_first">
          <img src="../../assets/img/wodejiaoyi.png" alt />
          <p>我的交易</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="myPaymentMethods">
        <div class="my_first">
          <img src="../../assets/img/wodeshoukuanfangshi.png" alt />
          <p>我的收款方式</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="my_recommend">
        <div class="my_first">
          <img src="../../assets/img/wodetuijian.png" alt />
          <p>我的推荐</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="my_team">
        <div class="my_first">
          <img src="../../assets/img/wodetuandui.png" alt />
          <p>我的团队</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="my_Address">
        <div class="my_first">
          <img src="../../assets/img/dizhiben.png" alt />
          <p>地址本</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="safeCenter">
        <div class="my_first">
          <img src="../../assets/img/zhanghuyuanquan.png" alt />
          <p>账户与安全</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
      <router-link class="list" to="feedback">
        <div class="my_first">
          <img src="../../assets/img/wentifankui.png" alt />
          <p>问题反馈</p>
        </div>
        <img src="../../assets/img/more_small.png" alt />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: '',
      avatar: ''
    }
  },
  computed: {},
  methods: {
    onClickRight () {
      this.$router.push('setting')
    }
  },
  created () {
    this.$axios
      .fetchPost('/portal', {
        interface: '1000',
        module: 'User',
        source: 'web',
        version: 'v1',
        data: {}
      })
      .then(res => {
        console.log('个人信息', res)
        // this.goodsList = res.data.list;
        this.info = res.data
        this.avatar = res.data.avatar
      })
  }
}
</script>
<style scoped>
.my_header {
  background: url(../../assets/img/gerenzhongxin_bg.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 160px;
}
.van-nav-bar {
  background: none;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.van-nav-bar .van-icon {
  color: #ffffff !important;
}
.van-nav-bar__title {
  color: #ffffff;
}

.headpic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  margin-top: 5px;
}
.top {
  margin-top: 27px;
  padding-left: 27px;
  display: flex;
}
.headtext > p {
  margin: 0;
  text-align: left;
  color: rgba(255, 255, 255, 1);
}
.headtext > p:nth-child(1) {
  font-size: 16px;
  font-weight: 500;
}
.headtext > p:nth-child(2) {
  font-size: 13px;
  font-weight: 400;
  margin-top: 8px;
}
.headtext > p:nth-child(3) {
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
}
.my_list {
  padding: 20px;
}
.list {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}
.my_first {
  display: flex;
  align-items: center;
}
.my_first > img {
  width: 22px;
  height: 22px;
}
.my_first > p {
  font-size: 14px;
  color: #333333;
  margin-left: 10px;
}
</style>
