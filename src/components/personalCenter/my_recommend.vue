<template>
  <div class="my_recommend">
    <van-nav-bar title="我的推荐" left-arrow @click-left="onClickLeft" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="get_recommend">
      <div class="recommeng_list" v-for="(item,index) in list" :key="index">
        <div class="list_per">
          <span>{{item.nickname}}</span>
          <div class="personid">
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
    // 获取我的推荐
    get_recommend () {
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
              floor: 1
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
