<template>
  <div id="indexs">
    <div class="indexbox">
      <!-- <div class="index-banner"> -->
        <!-- <div style="height: 150px; width:100%"> -->
          <div style="width:100%">
      <van-swipe  class="banner-swiper" :autoplay="3000" :show-indicators="false">
        <van-swipe-item  v-for="item of classList.slideList" :key="item.id">
          <van-image class="img" :src="item.src" />
        </van-swipe-item>
      </van-swipe>
      </div>
      <!-- </div> -->
      <div class="shopmore">
        <div class="notice">
          <div class="notice-gonggao">
            <img style="float: left;" src="../../../static/mdimg/tz@3x.png" alt />
            <!-- <p>{{classList.noticeList[0].title}}</p> -->
            <van-swipe :autoplay="5000" :show-indicators="false" touchable vertical>
              <van-swipe-item v-for="item of classList.noticeList" :key="item.id">
                <p>{{item.title}}</p>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="index-more" @click="$router.push('/notice')">更多 ></div>
        </div>
      </div>
      <div class="qianbao">
        <router-link :to="{path:'usdt',query:{num:classList.DOC,type:0}}" class="qianbao-doc">
          <p>DOC</p>
          <span>{{classList.DOC}}</span>
        </router-link>
        <router-link :to="{path:'usdt',query:{num:classList.TG,type:1}}" class="qianbao-tg">
          <p>TG</p>
          <span>{{classList.TG}}</span>
        </router-link>
      </div>
      <van-list @load="onLoad" v-model="loading" :finished="finished">
        <div class="indexlist" v-for="(item, index) of list" :key="index">
          <div class="listtitle" style="width: 25%;">
            <div class="listname">
              <h3>{{index}}</h3>
              <!-- <span>{{item.quote}}</span> -->
            </div>
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            >量(24H){{item.totalAmount}}</span>
          </div>
          <div class="jiage">
            <h3
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 90%"
            >{{item.priceHigh}}</h3>
            <span
              style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 70%"
            >{{item.priceLow}}</span>
          </div>
          <div class="amount" v-if="item.percent">
            <div class="amount-btn">{{item.percent}}%</div>
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
export default {
  data() {
    return {
      banner: "",
      active: 0,
      text: "",
      loading: false,
      finished: false,
      list: {},
      classList: {},
      rateObj: {},
      page: 0,
      lastId: 0
    };
  },

  created() {
    this.$axios
      .fetchPost("/portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "6000",
        data: {}
      })
      .then(res => {
        console.log(res);
        if (res.success) {
          this.banner = res.data.slideList;
          this.classList = res.data;
          this.onLoad()
        }
      });
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
          console.log(res);
          if (res.success) {
            let text = [];
            this.list = res.data;
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
    }
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
#indexs {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #0b0c21;
  color: #fff;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  // nav {
  //   font-size: 18px;
  //   margin-top: 15px;
  //   margin-bottom: 19px;
  // }
  .banner-swiper {
    flex: 1;
    margin-top: 10px;
    width: 100%;
    // margin-top: 150px;
    border-radius: 6px;
    height: 150px;
    // overflow: auto;
    // position: absolute;
    // top: 10px;
    z-index: 1;
    .img {
      width: 100%;
      // width: 340px;
      height: 150px;
      border-radius: 6px;
    }
  }
  .indexbox {
    height: 100%;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .index-banner {
      display: flex;
      margin-top: 15px;
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
        .notice-gonggao {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .van-swipe {
            width: 15rem;
            // flex: 1;
            height: 36px;
            .van-swipe-item {
              width: 100%;
              height: 100%;
            }
          }
        }
        img {
          width: 24px;
          height: 24px;
          line-height: 36px;
        }
      }
      .index-more {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        background: linear-gradient(90deg, #655aff 0%, #2923d5 100%);
        width: 58px;
        height: 22px;
        font-size: 12px;
      }
    }
  }
  .van-list {
    box-sizing: border-box;
    width: 100%;
  }
  .qianbao {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .qianbao-doc {
      width: 165px;
      height: 90px;
      background: url(../../../static/mdimg/bg_2@3x.png) no-repeat no-repeat;
      background-size: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      color: #fff;
      p {
        font-size: 16px;
      }
      span {
        font-size: 16px;
      }
    }
    .qianbao-tg {
      width: 165px;
      height: 90px;
      background: url(../../../static/mdimg/bg_1@3x.png) no-repeat no-repeat;
      background-size: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      color: #fff;
      p {
        font-size: 16px;
      }
      span {
        font-size: 16px;
      }
    }
  }
  .indexlist {
    // text-align: center;
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
    // justify-content: center;
    justify-content: space-between;
    .listtitle {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-right: 30px;
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
          color: #bec6e4;
          font-size: 11px;
          margin-bottom: 11px;
        }
      }
    }
    .jiage {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      overflow: hidden;
      h3 {
        color: #ffffff;
        font-size: 13px;
        margin: 0;
        margin-bottom: 12px;
      }
      span {
        color: #bec6e4;
        font-size: 13px;
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
