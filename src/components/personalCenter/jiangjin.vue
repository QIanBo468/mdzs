<template>
  <div id="jiangjin">
    <van-nav-bar
      class="jiangjintitle"
      title="奖金明细"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
      style="background: #0c0c0c;"
    />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="jj-list" v-for="(item, index) in list" :key="index">
        <ul>
          <li >{{item.remark}}</li>
          <li>{{item.createdAt}}</li>
        </ul>
        <div :class="[item.type == 1 ? '': 'blue','overText']">{{item.money}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      lastId: 0,
      lastPage: null,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      if (this.lastPage && this.lastPage < this.page) {
        this.finished = true;
        this.loading = false;
      } else {
        this.$axios
          .fetchPost("/portal", {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "1101",
            data: {
              lastId: this.lastId,
              page: this.page++,
              creditType: "credit_5",
              // direction: direction
            }
          })
          .then(res => {
            console.log(res);
            this.lastPage = res.data.lastPage;
            this.lastId = res.data.lastId;
            this.usdt = res.data;
            this.loading = false;
            this.list = this.list.concat(res.data.list);
          });
      }
    }
  }
};
</script>

<style lang='less' scope>
#jiangjin {
  width: 100%;
  height: 100%;
  background: #0c0c0c;
}
/deep/.van-nav-bar{
  background: none;
}
.van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
.van-tabs__nav{
  background: #1d1c3b;
}

.jj-list {
  height: 60px;
  display: flex;
  background: #1d1c3b;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  // border-bottom: 1px solid #f9f9f9;
  margin-bottom: 10px;
  overflow: hidden;
  ul {
    // width: 120px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      font-size: 12px;
      color: #aaa;
      height: 20px;
      line-height: 20px;
      word-wrap: break-word;
    }
    li:last-child {
      font-size: 11px;
      color: #dee7ff;
      height: 16px;
      margin-top: 20px;
      line-height: 16px;
      word-wrap: break-word;
    }
  }
  div {
    width: 130px;
    text-align: right;
    font-size: 16px;
    color: #fff;
  }
  .blue {
    color: #bec6e4;
  }
}
/deep/.van-nav-bar{
  background: none;
}
/deep/.van-nav-bar .van-nav-bar__title {
    color: #fff;
  }
 .van-nav-bar .van-icon {
    color: #fff;
  }
.jiangjintitle {
  background: none;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
[class*=van-hairline]:after{
  border: none;
}
</style>