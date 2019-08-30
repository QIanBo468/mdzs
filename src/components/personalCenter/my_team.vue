<template>
  <div class="my_team">
    <van-nav-bar title="我的推荐" left-arrow @click-left="onClickLeft" />
    <div class="team_list">
      <div class="team_person">
        <div class="personal">
          <img src='../../assets/img/morentouxiang.png' alt  class="picture"/>
          <span>黎勇</span>
        </div>
        <div class="team_id">
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
.my_team {
  background: #f8f8f8;
  height: 100vh;
}
.team_list {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
}

.team_person {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.team_id {
  display: flex;
  flex-direction: column;
}
.team_id > span:nth-child(1) {
  color: #333333;
  font-size: 14px;
}
.team_id > span:nth-child(2) {
  margin-top: 5px;
  color: #999999;
  font-size: 12px;
}
.personal {
  display: flex;
  align-items: center;
}
.picture{
    width: 44px;
    height: 44px;
    margin-right: 10px;
}
.personal > span {
  color: #333333;
  font-size: 15px;
}
</style>
