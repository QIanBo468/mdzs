<template>
  <div class="my_recommend">
    <van-nav-bar title="我的推荐" left-arrow @click-left="onClickLeft" />
    <div class="recommeng_list">
      <div class="list_per">
        <span>奔跑的小米</span>
        <div class="personid">
          <span>ID：83747899947</span>
          <span>2019.06.12 14:12:45</span>
        </div>
      </div>
    </div>
      <div class="recommeng_list">
      <div class="list_per">
        <span>疯狂的小鸟</span>
        <div class="personid">
          <span>ID：83747899947</span>
          <span>2019.06.12 14:12:45</span>
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
.my_recommend {
  background: #f8f8f8;
  height: 100vh;
}
.recommeng_list {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
}
.list_per > span {
  color: #333333;
  font-size: 15px;
}
.list_per {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.personid {
  display: flex;
  flex-direction: column;
}
.personid > span:nth-child(1) {
  color: #333333;
  font-size: 14px;
}
.personid > span:nth-child(2) {
  margin-top: 5px;
  color: #999999;
  font-size: 12px;
}
</style>
