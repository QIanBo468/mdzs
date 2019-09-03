<template>
  <div class="mymill_bj">
    <van-nav-bar title="我的矿机" left-arrow @click-left="onClickLeft" />
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="get_mill">
        <div class="mill_list">
          <div class="list">
            <img src="../../assets/img/kuangji(1).png" alt />
            <div class="intrudce">
              <p>123</p>
              <p>算力：50G</p>
              <p>租赁价格：10usdt</p>
              <div class="price">
                <p>累计收益：</p>
                <p>1200usdt</p>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
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
    get_mill () {
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
            interface: '4000',
            module: 'Investment',
            source: 'web',
            version: 'v1',
            data: {
              lastId: lastid,
              page: page
            }
          })
          .then(res => {
            console.log(res)
            this.lastId = res.data.lastId
            this.list = res.data.list
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
  created () {

  }
}
</script>
<style scoped>
.mymill_bj {
  background: #f8f8f8;
  min-height: 100vh;
  height: auto;
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
  color: #f84d4d;
}
</style>
