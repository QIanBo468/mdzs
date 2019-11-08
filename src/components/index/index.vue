<template>
  <div id="index">
    <div class="indexbox">
      <div class="index-banner">
        <van-image src="../../../static/mdimg/banner@3x.png" />
      </div>
      <div class="shopmore">
        <div class="notice">
            <div class="notice-gonggao">
          <img style="float: left;" src="../../../static/mdimg/tz@3x.png" alt />
          <p>测试公告</p>
          </div>
          <div class="more" @click="$router.push('/notice')">
            更多 >
          </div>
        </div>
      </div>
      <van-list @load="onLoad" v-model="loading" :finished="finished">
        <div class="indexlist" v-for="(item, index) of list" :key="index">
          <div class="listtitle" style="width: 25%;">
            <div class="listname">
              <h3>{{item.name}}</h3>
              <!-- <span>{{item.quote}}</span> -->
            </div>
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            >{{item.amount}}</span>
          </div>
          <div class="jiage">
            <h3
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 90%"
            >{{item.close}}</h3>
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 70%"
            >≈￥{{item.closeCNY}}</span>
          </div>
          <div class="amount" v-if="item.floatRate >0">
            <div class="amount-btn">{{item.floatRate}}</div>
          </div>
          <!-- <div class="amount" v-else="item.floatRate<0">
            <div class="amount-btn btn-low">{{item.floatRate}}</div>
          </div>-->
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import Barrage from "barrage-ui";
import example from "barrage-ui/example.json";

import { Loading } from "vant";
import { Toast } from "vant";
import text from "../text";
export default {
  data() {
    return {
      active: 0,
      text: "",
      loading: false,
      finished: false,
      list: [],
      classList: [],
      rateObj: {}
    };
  },
  component: {
    text
  },
  mounted() {},
  created() {
    console.log(this.$cookies.get("accessToken"));
  },
  methods: {
    onLoad() {
      this.$axios
        .fetchPost("/portal/Digiccy", {
          source: "web",
          version: "v1",
          module: "Market",
          interface: "1000",
          data: {}
        })
        .then(res => {
          if (res.success) {
            let text = [];
            this.list = res.data.list;
            this.finished = true;
            console.log(this.list);
            //this.createDM ()
          } else {
            this.finished = true;
          }
          this.loading = false;
        });
    },

    message(obj) {
      if (obj.to) {
        let status = this.$cookies.get("status");
        if (status == -1) {
          this.$dialog
            .confirm({
              title: "提示",
              message: "未通过实名认证"
            })
            .then(() => {
              this.$router.push("/authentication");
            })
            .catch(() => {});
          return;
        } else if (status == -2) {
          this.$dialog
            .confirm({
              title: "提示",
              message: "未认证"
            })
            .then(() => {
              this.$router.push("/authentication");
            })
            .catch(() => {});
          return;
        } else if (status == 0) {
          Toast("认证已提交，后台审核中");
          return;
        }
        this.$router.push(obj.to);
      } else {
        Toast("正在开发中，敬请期待");
      }
    },
    deal(to) {
      let status = this.$cookies.get("status");
      if (status == -1) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "未通过实名认证"
          })
          .then(() => {
            this.$router.push("/authentication");
          })
          .catch(() => {});
        return;
      } else if (status == -2) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "未认证"
          })
          .then(() => {
            this.$router.push("/authentication");
          })
          .catch(() => {});
        return;
      } else if (status == 0) {
        Toast("认证已提交，后台审核中");
        return;
      }
      this.$router.push(to);
    },
  }
};
</script>
<style lang="less">
.tabBox {
  .van-grid-item__content {
    padding: 5px 6px;
  }
}
.connected .van-grid-item__content {
  padding: 0;
}
</style>
<style lang="less" scoped>
#index {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #0b0c21;
  color: #fff;

  nav {
    font-size: 18px;
    margin-top: 15px;
    margin-bottom: 19px;
  }
  .indexbox {
    height: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .index-banner {
      margin-top: 15px;
      .img {
        width: 100%;
      }
    }
    .shopmore {
      margin-top: 10px;
      margin-bottom: 15px;
      width: 100%;
      padding: 0 10px;
      .notice {
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        color: #eee;
        // width: 100%;
        background: #121e4d;
        border-radius: 30px;
        font-size: 14px;
        p {
        // float: left;
        line-height: 36px;
          padding: 0;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .notice-gonggao{
            display: flex;
            align-items: center;
        }
        img{
            width: 24px;
            height: 24px;
            line-height: 36px;
        }
      }
      .more {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background:linear-gradient(90deg, #655AFF 0%, #2923D5 100%);
        width: 48px;
        height: 22px;
        font-size: 12px;
      }
    }
  }
  .van-list{
      width: 100%;
  }
  .indexlist {
    text-align: center;
    width: 95%;
    height: 80px;
    background: #191b4b;
    border-radius: 6px;
    margin-left: 2%;
    margin-bottom: 10px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .listtitle {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .listname {
        display: flex;
        align-items: center;
        h3 {
          color: #ffffff;
          font-size: 18px;
          margin: 0;
          margin-bottom: 12px;
        }
        span {
          color: #e3e3e9;
          font-size: 11px;
          margin-bottom: 11px;
        }
      }
    }
    .jiage {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      h3 {
        color: #ffffff;
        font-size: 16px;
        margin: 0;
        margin-bottom: 12px;
      }
      span {
        color: #e3e3e9;
        font-size: 16px;
      }
    }
    .amount {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .amount-btn {
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: linear-gradient(90deg, #494efe 0%, #0900f8 100%);
        border-radius: 18px;
      }
    }
    .btn-low {
      background: linear-gradient(90deg, #f00 0%, #ee609c 100%) !important;
    }
  }
}

.hold {
  background: #f8f8f8;
  height: 10px;
}
.banner {
  width: 100%;
  height: 200px;
  background: url("../../../static/images/index/banner.png");
  background-size: 100% 100%;
  .bannerTitle {
    padding-top: 29px;
    text-align: center;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-size: 18px;
  }
}
.imgIcon {
  width: 22px;
  height: 22px;
}
.tabBox {
  margin: 20px 0 29px;
}
.present {
  height: 154px;
  padding: 5px 16px;
  box-sizing: border-box;
  .title {
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
  }
  .box_sm {
    .list {
      height: 22px;
      display: flex;
      align-items: center;
      font-size: 15px;
      padding: 15px 0;
      img {
        height: 22px;
        width: 22px;
        margin-right: 10px;
      }
      .red {
        color: #fb4b48;
        margin-left: 6px;
      }
    }
  }
}
.connected {
  // width: 343px;
  // padding: 18px 16px;
  margin: 10px 0;
}
</style>
