<template>
  <div id="conversion">
    <van-nav-bar title="兑换记录" left-arrow :border="false" @click-left="onClickLeft" />

    <div class="box">
      <van-list
        v-model="loading"
        class="conversion-list"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="records" v-for="(item, index) in list" :key="index">
          <!-- <div class="status">兑换成功</div> -->
          <div class="record-one">
            <div class="record-type">{{item.fromCredit}}到{{item.toCredit}}</div>
            <span class="record-time">{{item.createdAt}}</span>
          </div>
          <div class="record-one">
            <div class="record-zongshu">{{item.money}}</div>
            <span class="record-shiji">实际到账:{{item.realMoney}}</span>
          </div>
          <!-- <ul>
            <li>
              <div></div>
              <div></div>
            </li>
            <li>
              <div>兑换数量</div>
              <div>{{item.usdt}}</div>
            </li>
            <li>
              <div>提交时间</div>
              <div>{{item.createdAt}}</div>
            </li>
            <li>
              <div>到账数量</div>
              <div class="red">{{item.final}}</div>
            </li>
          </ul>-->
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          fromCredit: "TG",
          toCredit: "DOC",
          createdAt: "2019-11-14 8:51",
          money: "50",
          realMoney: "500"
        }
      ],
      loading: false,
      finished: false,
      page: 1,
      lastId: 0
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      // var type = 1
      // if(this.$route.query.type == 2) {
      //     type = 2
      // }
      // if (this.lastPage && this.lastPage < this.page) {
      //     this.finished = true
      //     this.loading = false;
      //     console.log(123)
      // }else{}
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "4002",
          data: {
            lastId: this.lastId,
            page: this.page++,
            fromCredit: "credit_1"
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.lastPage = res.data.lastPage;
            this.lastId = res.data.lastId;
            this.loading = false;
            this.finished = true;
            this.list = this.list.concat(res.data.list);
          }
        });
    }
  }
};
</script>
<style lang="less" scope>
#conversion {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0c0c0c;
  .van-nav-bar {
    background: #0d0900;
  }
  .van-icon {
    color: #fff;
  }
  .box {
    padding: 16px;
    overflow: scroll;
    // .conversion-list {
    //   background: #212243;
    // }
    .records {
      height: 70px;
      padding: 0 10px;
      border-radius: 6px;
      background: #212243;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .record-one {
        height: 70px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        > div {
          color: #fff;
          font-size: 14px;
        }
        span {
          color: #bec6e4;
          font-size: 11px;
        }
      }
      //   .status {
      //     font-size: 12px;
      //     text-align: right;
      //     color: #1890ff;
      //     margin-bottom: 10px;
      //   }
      //   .red {
      //     color: #f84d4d;
      //   }
      //   ul li {
      //     height: 17px;
      //     line-height: 17px;
      //     font-size: 12px;
      //     display: flex;
      //     margin-bottom: 5px;
      //     div:first-child {
      //       width: 60px;
      //       color: #666666;
      //       margin-right: 35px;
      //     }
      //     div:last-child {
      //       width: 70%;
      //     }
      //   }
      //   li:last-child {
      //     margin-bottom: 0px;
      //   }
    }
  }
}
.van-nav-bar {
  background: #0d0900;
}
.van-icon {
  color: #fff;
}
</style>