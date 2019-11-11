<template>
  <div id="notice">
    <van-nav-bar title="公告" left-arrow @click-left="onClickLeft" class="gg-title" />
    <div class="noticeList">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <router-link
          :to="{ path: '/noticeDetails', query: { id: item.id}}"
          v-for="(item, index) in noticeList"
          :key="index"
        >
          <ul>
            <li style="color:#fff">{{item.title}}</li>
            <li>123132</li>
          </ul>
          <div>
            <img src="../../../static/mdimg/gg.png" alt />
          </div>
        </router-link>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      noticeList: [
      ],
      lastPage: null,
      lastId: 0,
      finished: false,
      loading: false,
      page: 1
    };
  },
  created() {
    // this.$axios.fetchPost('/portal',
    // {
    //     source: "web",
    //     version: "v1",
    //     module: "Content",
    //     interface: "3000",
    //     data: {lastId: 0,page: 1}
    // }).then(res => {
    //     this.noticeList = res.data.list
    // })
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
            module: "Content",
            interface: "3000",
            data: { lastId: this.lastId, page: this.page++ }
          })
          .then(res => {
            // this.list = this.list.concat(res.data.list)
            this.noticeList = this.noticeList.concat(res.data.list);
            this.lastPage = res.data.lastPage;
            this.loading = false;
            this.lastId = res.data.lastId;
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.overText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gg-title {
  background: #0c0c0c;
  border: none;
  color: #fff;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
// 底边线
[class*="van-hairline"]::after {
  border: none;
}
#notice {
  width: 100%;
  height: 100%;
  background: #0c0c0c;

  .noticeList {
    padding: 0 10px;
  }
  a {
    width: 100%;
    height: 63px;
    display: flex;
    // line-height: 63px;
    background: #212243;
    margin-top: 10px;
    padding: 10px 16px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    ul {
      width: 260px;
      height: 100%;
      li {
        font-size: 14px;
        color: #666666;
        height: 20px;
        line-height: 20px;
        .overText;
      }
      li:last-child {
        font-size: 12px;
        color: #999999;
        height: 17px;
        margin-top: 5px;
        line-height: 17px;
      }
    }
    div {
      width: 22px;
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>