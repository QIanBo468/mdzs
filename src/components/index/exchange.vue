<template>
  <div id="extract">
    <van-nav-bar
      title="兑换"
      right-text="兑换记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="$router.push('/conversion?type='+ $route.query.type)"
    />
    <div class="box">
      <div class="extract-banner">
        <div class="usdt">
          <p>TG可用余额</p>
        </div>
        <div class="moneys">{{balance}}</div>
      </div>

      <div class="title">兑换数量</div>
      <div class="inputBox">
        <input type="number" v-model="num" placeholder="请输入兑换数量" />
      </div>
      <div class="remarks">备注：TG兑换DOC比例为1 ：{{rules.rate}}</div>
      <!-- <div class='cell'>
                <div>手续费</div>
                <div class='overText'>{{aNum[0]}}</div>
      </div>-->

      <div class="cell">
        <div>实际到账</div>
        <div class="overText">{{aNum[2]}}</div>
      </div>
      <div class="btn" @click="submit">兑换</div>
    </div>
    <!-- <van-dialog v-model="show" title="提示" show-cancel-button @confirm="submit">
      <van-field v-model="password" type="password" placeholder="请输入支付密码" />

    </van-dialog>-->
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import InputImg from "../../views/inputImg";
export default {
  data() {
    return {
      show: false,
      user: "",
      InputImg: "../../../static/images/index/user.png",
      placeNum: "请输入兑换数量",
      num: "",
      rules: "",
      password: "",
      title: "ofc",
      balance:''
    };
  },
  created() {
    var title = this.$route.query.type;
    console.log();
    if (title == 2) {
      this.title = "usdt";
    }
    this.goinfo();
  },
  computed: {
    aNum() {
      var a = ((this.num * this.rules.rate) ).toFixed(5);
      var b = ((this.num * this.rules.feeRate) ).toFixed(5);
      var c = (a - b).toFixed(5);
      var arr = [a, b, c];
      return arr;
    }
  },
  methods: {
    goinfo() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "4000",
          data: {}
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.rules = res.data.params["credit_1-credit_3"];
            //   console.log(this.rules.params['credit_1-credit_3'])
          }
        });
        this.$axios.fetchPost('/portal',{
            source: "web",
          version: "v1",
          module: "Finance",
          interface: "1000",
          data: {}
        }).then(res=>{
            console.log(res)
            this.balance = res.data.balance
        })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    isPop() {
      if (this.num == "") {
        this.$toast("请输入兑换数量");
        return;
      }
      this.show = true;
      this.password = "";
    },
    submit() {
      // this.show = true
      //   if (this.password.length != 6) {
      //     this.$toast("支付密码六位组成");
      //     return;
      //   }
      //   var type = "credit_2";
      //   var code = "4007";
      //   if (this.$route.query.type == 2) {
      //     type = "credit_1";
      //     code = "4009";
      //   }
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: 4001,
          data: {
            amount: this.num,
            fromCredit: "credit_1",
            toCredit: "credit_3"
          }
        })
        .then(res => {
          // this.$router.push('/conversion')
          if (res.success) {
            this.rules.total_ofc = (
              this.rules.total_ofc -
              this.num * 10
            ).toFixed(8);
            this.rules.total_usdt = (
              this.rules.total_usdt -
              this.num / 10
            ).toFixed(8);
            this.num = "";
            Dialog.alert({
              title: "提示",
              message: res.message
            });
            this.goinfo();
          } else {
            this.$toast(res.message);
          }
        });
    }
  },
  components: {
    InputImg
  }
};
</script>
<style lang="less" scoped>
#extract {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0d0900;

  .box {
    // flex: 1;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 0 16px;
    .extract-banner {
      background: linear-gradient(90deg, #4a66fa 0%, #7482fc 100%);
      height: 120px;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 0 15px;
      margin-bottom: 20px;
      p {
        font-size: 16px;
        color: #fff;
        margin: 0;
        margin-bottom: 20px;
        padding: 0;
      }
      .moneys {
        color: #fff;
      }
    }
    // border-top: 10px solid #f8f8f8;
    .title {
      font-size: 14px;
      color: #fff;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
    }
    .inputBox {
      display: flex;
      //   border: 1px solid #d8d8d8;
      padding: 8px;
      width: 343px;
      height: 40px;
      margin: 0 auto;
      box-sizing: border-box;
      justify-content: space-between;
      border-radius: 4px;
      font-size: 14px;
      background: #1d1c3b;
      input {
        // height: 20px;
        background: #1d1c3b;
        flex: 1;
        border: 0;
        font-size: 14px;
        color: #fff;
      }
      img {
        width: 17px;
        height: 20px;
      }
    }
    // .usdt {
    // //   margin-top: 30px;
    //   height: 27px;
    //   display: flex;
    //   justify-content: center;
    //   font-size: 22px;
    //   color: #f84d4d;
    //   align-items: center;
    //   img {
    //     margin-right: 10px;
    //     height: 22px;
    //     width: 22px;
    //   }
    // }
    .remarks {
      font-size: 12px;
      margin: 5px 0 40px;
      color: #fff;
    }
    .money {
      text-align: center;
      height: 32px;
      line-height: 32px;
      width: 343px;
      font-size: 23px;
      color: #fff;
      margin: 5px auto 38px;
    }

    .cell {
      height: 18px;
      line-height: 18px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      div {
        width: 30%;
      }
      div:last-child {
        width: 50%;
        text-align: right;
      }
    }
    .btn {
      margin-top: 60px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      width: 21.4375rem;
      height: 2.75rem;
      //   background: red;
      margin: 0 auto;
      //   background: -webkit-gradient(
      //     linear,
      //     left top,
      //     left bottom,
      //     from(#fd5966),
      //     to(#e71122)
      //   );
      //   background: linear-gradient(180deg, #fd5966, #e71122);
      border-radius: 6px;
      background: #4a66fa;
      color: #fff;
    }
    .red {
      color: #f84d4d;
    }
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-nav-bar {
  background: #0d0900;
}
.van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
}
</style>