<template>
  <div class="zijin">
    <van-nav-bar class="jiangjintitle" style="background-color: #0c0c0c" title="资金明细" left-arrow :border="false" @click-left="onClickLeft" />
    <van-tabs v-model="active"  @change="acChange">
      <van-tab title="全部">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item, index) in list" :key="index">
            <ul>
              <li class="overText">{{item.creditName}}</li>
              <li>{{item.createdAt}}</li>
            </ul>
            <div :class="[item.type == 1 ? '': 'blue','overText']">{{item.num}}</div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="收入">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item, index) in list" :key="index">
            <ul>
              <li class="overText">{{item.remark}}</li>
              <li>{{item.createdAt}}</li>
            </ul>
            <div :class="[item.type == 1 ? '': 'blue','overText']">{{item.num}}</div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="支出">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item, index) in list" :key="index">
            <ul>
              <li class="overText">{{item.remark}}</li>
              <li>{{item.createdAt}}</li>
            </ul>
            <div :class="[item.type == 1 ? '': 'blue','overText']">
              <!-- -->
              {{item.num}}
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      usdt: {},
      list: [],
      finished: false,
      loading: false,
      lastPage: null,
      page: 1,
      lastId: 0
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.push({ path: "myIndex" });
    },
    acChange() {
      this.finished = false;
      this.loading = false;
      this.lastPage = null;
      this.page = 1;
      this.lastId = 0;
      this.list = [];
      setTimeout(() => {
        this.onLoad();
      }, 1000);
    },
    onLoad() {
      let type = this.active,
        direction = "";
      if (type == 0) {
        direction = "";
      } else if (type == 1) {
        direction = "1";
      } else {
        direction = "-1";
      }
      if (this.lastPage && this.lastPage < this.page) {
        this.finished = true;
        this.loading = false;
      } else {
        this.$axios
          .fetchPost("/portal", {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "1001",
            data: {
              lastId: this.lastId,
              page: this.page++,
              creditType: "credit_2",
              direction: direction
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
.zijin {
  width: 100%;
  height: 100%;
  background: #0c0c0c;
}
.list {
  padding: 5px 0;
  width: 343px;
  margin: 0 auto;
  height: 50px;
  display: flex;
  background: #1d1c3b;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  // border-bottom: 1px solid #f9f9f9;
  overflow: hidden;
  ul {
    width: 120px;
    overflow: hidden;
    height: 100%;
    li {
      font-size: 14px;
      color: #aaa;
      height: 20px;
      line-height: 20px;
    }
    li:last-child {
      font-size: 11px;
      color: #dee7ff;
      height: 16px;
      margin-top: 5px;
      line-height: 16px;
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
// /deep/.van-tabs{
//     background: #1D1C3B;
// }
.deposit {
  background: #fff;
  height: 40px;
  display: flex;
  // padding-left: 30px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  div {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    span {
      color: #666;
    }
    img {
      width: 20px;
      margin-right: 5px;
      height: 20px;
    }
  }
}
.van-loading .van-loading--circular {
  background: #1d1c3b;
}
[class*="van-hairline"]::after {
  border: none;
}
.navstatis {
  width: 100%;
  background: linear-gradient(180deg, #4c67fa 0%, #7382fc 100%);
  z-index: 5;
  // margin-bottom: 20px;
}
/deep/.van-nav-bar {
  background: none;
  // background:linear-gradient(180deg,#3FCFFE 0%,#39B2F8 100%);
  // background: #fff;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
.van-tabs{
  background-color: #1d1c3b;
  margin-bottom: 5px;
}
.van-tabs__nav {
  background-color: #1d1c3b !important;
  margin-bottom: 5px !important;
  border: none;
  margin: 5px 0;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-tabs__content {
  background: #1d1c3b !important;
  margin-top: 10px;
}
.van-tabs__line {
  background: linear-gradient(180deg, #494efe 0%, #0c04f8 100%);
  width: 25px !important;
  height: 5px;
  border-radius: 5px;
}
.van-tab--active {
  .van-ellipsis {
    font-size: 14px;
    color: #ffffff !important;
  }
}
.van-ellipsis {
  color: #999999;
}
// .van-tabs__content {
//   background: #fff;
// }
/deep/.van-nav-bar{
  background-color: none;
}
/deep/.van-nav-bar .van-nav-bar__title {
    color: #fff;
  }
 .van-nav-bar .van-icon {
    color: #fff;
  }
.jiangjintitle {
  background-color: none;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
[class*=van-hairline]:after{
  border: none !important;
}
</style>