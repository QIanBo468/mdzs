<template>
  <div class="mymill_bj">
    <van-nav-bar title="我的矿机" left-arrow @click-left="onClickLeft" />
    <div class="mill_list">
      <div class="list">
        <img src="../../assets/img/kuangji(1).png" alt />
        <div class="intrudce">
          <p>1号商宝云矿机</p>
          <p>算力：50G</p>
          <p>租赁价格：10usdt</p>
          <div class="price">
            <p>累计收益：</p>
            <p>12usdt</p>
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
.mymill_bj {
  background: #f8f8f8;
  height: 100vh;
}
.mill_list {
  margin-top: 10px;
  padding: 15px;
  background: #fff;
}
.list {
  display: flex;
  align-items: center;
}
.list > img {
  width: 90px;
  height: 90px;
}
.intrudce {
  margin-left: 10px;
}
.intrudce > p {
  margin: 5px 0 0 0;
}
.intrudce > p:nth-child(1) {
  color: #333333;
  font-size: 17px;
  font-weight: bold;
}
.intrudce > p:nth-child(2) {
  color: #666666;
  font-size: 13px;
}
.intrudce > p:nth-child(3) {
  color: #666666;
  font-size: 13px;
}
.price {
  display: flex;
  align-items: center;
}
.price > p {
  margin: 5px 0 0 0;
  font-weight: 500;
  font-size: 13px;
}
.price > p:nth-child(1) {
  color: #333333;
}
.price > p:nth-child(2) {
    color: #F84D4D;
}
</style>
