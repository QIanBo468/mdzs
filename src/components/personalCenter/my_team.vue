<template>
  <div class="my_team">
    <van-nav-bar title="我的团队" left-arrow @click-left="onClickLeft" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="get_team">
      <div class="team_list" v-for="(item,index) in list" :key="index">
        <div class="team_person">
          <div class="personal">
            <img :src="item.avatar" alt class="picture" />
            <span>{{item.nickname}}</span>
          </div>
          <div class="team_id">
            <span>ID：{{item.id}}</span>
            <span>{{item.created_at}}</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lastId: '',
      page: 1,
      loading: false,
      finished: false,
      list: ''
    }
  },
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    get_team () {
      var lastid = ''
      if (this.lastId) {
        lastid = this.lastId
      } else {
        lastid = 0
      }
      var page = this.page++
      setTimeout(() => {
        this.$axios
          .fetchPost('/portal', {
            interface: '4101',
            module: 'User',
            source: 'web',
            version: 'v1',
            data: {
              lastId: lastid,
              page: page,
              floor: 0
            }
          })
          .then(res => {
            console.log(res)
            this.lastId = res.data.lastId
            // this.list = res.data.list
            if (res.code == 0) {
              if (res.data.list.length == 0) {
                this.finished = true
              } else {
                var ret = res.data.list
                if (page == 1) {
                  this.list = ret
                } else {
                  for (var x in ret) {
                    this.list.push(ret[x])
                  }
                }
              }
            } else {
              this.finished = true
            }
            this.loading = false
          })
      }, 500)
    }
  },
  created () {}
}
</script>
<style scoped>
.my_team {
  background: #f8f8f8;
  min-height: 100vh;
  height: auto;
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
.picture {
  width: 44px;
  height: 44px;
  margin-right: 10px;
  border-radius: 50%;
}
.personal > span {
  color: #333333;
  font-size: 15px;
}
</style>
