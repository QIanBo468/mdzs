<template>
  <div id="extract">
    <van-nav-bar
      title="提币"
      right-text="提币记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="$router.push('/extractRecord')"
    />
    <div class="box">
      <div class="extract-banner">
        <div class="usdt">
          <p>DOC可用余额</p>
          <!-- <img width="27px;" height="32px" src="../../../static/images/index/B@3x.png" />BAT -->
        </div>
        <div class="money">{{$route.query.DOC}}</div>
      </div>

      <div class="content-title">
        <div class="shuxian"></div>钱包地址
      </div>
      <!-- <input type="text" v-model="address"> -->
      <!-- <InputImg  :placeholder='placesite' :value='user' @changeInp = 'aaa'>
                <template slot="right"> 
                    
                </template>
      </InputImg>-->

      <div class="inputBox">
        <van-field
          placeholder="请输入钱包地址"
          :border="false"
          name="address"
          v-model="address"
          :error="errors.has('address')"
          v-validate="'required'"
        />
        <img
          v-if="imgFlag"
          :src="InputImg"
          alt
          @click="$router.push({path: '/address', query:{usdt: usdtNum}})"
        />
        <img
          v-else
          style="width: 19px;height: 19px"
          src="../../../static/images/index/empty.png"
          alt
          @click="address = ''"
        />
      </div>
      <div class="content-title">
        <div class="shuxian"></div>提币数量
      </div>
      <div class="inputBox" style="margin-bottom: 40px">
        <van-field
          type="number"
          placeholder="请输入提币数量"
          :border="false"
          name="num"
          v-model="num"
          :error="errors.has('num')"
          v-validate="'required'"
        />
        <div class="red" style="width: 35px;" @click="num = usdtNum">全部</div>
      </div>

      <div class="cell">
        <div>手续费</div>
        <div class="overText">{{this.charge}}%</div>
      </div>
      <div class="cell">
        <div>实际到账</div>
        <div class="overText">{{money.practical}}</div>
      </div>
      <div class="content-title">
        <div class="shuxian"></div>安全密码
      </div>
      <div class="inputBox">
        <van-field
          type="password"
          placeholder="请输入安全密码"
          :border="false"
          name="safeword"
          v-model="safeword"
          :error="errors.has('safeword')"
          v-validate="'required'"
        />
      </div>
      <div class="content-title">
        <div class="shuxian"></div>安全验证{{'('+user+')'}}
      </div>
      <div class="inputBox" style="margin-bottom: 40px">
        <van-field
          placeholder="请输入验证码"
          :border="false"
          name="safeword"
          v-model="captcha"
          :error="errors.has('safeword')"
          v-validate="'required'"
        />
        <div class="red time" @click="time">{{codeText}}</div>
      </div>
      <div class="btn" @click="submit">提币</div>
    </div>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      user: "",
      address: "",
      num: "",
      captcha:null,
      InputImg: require("../../../static/images/index/yaoqing@3x.png"),
      placesite: "请输入钱包地址",
      placeNum: "请输入提币数量",
      usdtNum: "",
      charge: "",
      imgFlag: false,
      contract: "",
      safeword: "",
      codeText: "获取验证码",
      codeTime: 60,
      show: false,
      radio: 1,
      disabled: false,
    };
  },
  computed: {
    money() {
      var obj = {
        serve: (this.num * this.charge) / 100,
        practical: this.num - (this.num * this.charge) / 100
      };
      return obj;
    }
  },
  watch: {
    address() {
      if (!this.address) {
        this.imgFlag = true;
      } else {
        this.imgFlag = false;
      }
    }
  },
  created() {
    this.usdtNum = this.$route.query.usdt;
    this.address = this.$route.query.address;
    this.user = this.$route.query.account.substr(0,3)+'****'+this.$route.query.account.substr(7);
    console.log(this.user)
    this.$axios
      .fetchPost("/portal", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "2000",
        data: {}
      })
      .then(res => {
        console.log(res);
        this.charge = res.data.params.feeRate;
        // this.contract = res.data.contractList[0].value
        //   console.log(this.contract)
      });
  },
  methods: {
    changeInput() {
      console.log(this.address);
    },
    onClickLeft() {
      this.$router.push("myindex");
    },
     time () {
        // if(!this.form.id){
        //     Toast('会员ID不能为空')
        //     return
        // }
        if(this.codeText == '获取验证码'){
          var that = this;
          that.$axios.fetchPost('/portal/Digiccy',
            {
              source: "web",
              version: "v1",
              module: "Finance",
              interface: "2003",
              data:{account:that.$route.query.account}
              // template:'5bcd32b99a1df09e1a90317626d19d9b'
            }).then(res => {
            this.disabled = false
            console.log(res)
            if(res.success){
              Dialog.alert({
                title: '提示',
                message: res.message
              })
              var time = setInterval(() => {
                if(that.codeTime <= 0){
                  clearInterval(time)
                  that.codeText = '获取验证码'
                  that.codeTime = 60
                }else{
                  that.codeTime --
                  that.codeText = that.codeTime + 's'
                }
              },1000)
            }else{
              Toast(res.message)
            }
          })

        }
      },
    submit() {
      var that = this;
      // console.log(123123)
      if (that.safeword.length != 6) {
        Dialog.alert({
          title: "提示",
          message: "安全密码必须由6位数字组成"
        });
      }

      this.$validator.validateAll().then(function(result) {
        if (result) {
          that.$axios
            .fetchPost("/portal", {
              source: "web",
              version: "v1",
              module: "Finance",
              interface: "2001",
              data: {
                amount: that.num,
                account: that.address,
                creditType: "credit_2",
                safeword: that.safeword,
                captcha: that.captcha
              } //, contract:that.contract,safeword:that.safeword
            })
            .then(res => {
              console.log(res);
              if (res.success) {
                that.num = "";
                that.address = "";
                Dialog.alert({
                  title: "提示",
                  message: res.message
                });
              } else {
                Toast(res.message);
              }
            });
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
#extract .van-nav-bar .van-nav-bar__text {
  color: #fff;
}
.van-cell {
  padding: 0;
  background: transparent;
}
.van-nav-bar {
  background: #0d0900;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon {
  color: #fff;
}
.contmodule[data-v-cfcbe3a0] {
  padding: 1.25rem 0 0;
}
[class*="van-hairline"]::after {
  border: none;
}
/deep/.van-field__control {
  color: #fff;
}
  .time{
    width: 85px;
    height: 24px;
    // border: 1px solid #BEC6E4;
    line-height: 24px;
    border-radius: 12px;
    font-size: 12px;
    text-align: center;
    background: linear-gradient(90deg, #494EFE 0%, #0900F8 100%)
  }
#extract {
  width: 100%;
  overflow: hidden;
  height: 100%;
  background: #0d0900;
  overflow-y: auto;
  .box {
    // width: 100%;
    padding: 0 16px;
    overflow: hidden;
    margin: 0 auto;
    // border-top: 10px solid #f8f8f8;
    .title {
      font-size: 14px;
      color: #fff;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
    }
    .extract-banner {
      background: linear-gradient(90deg, #4a66fa 0%, #7482fc 100%);
      height: 120px;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 15px;
      p {
        font-size: 16px;
      }
    }
    .usdt {
      margin-top: 30px;
      height: 27px;
      display: flex;
      justify-content: center;
      font-size: 22px;
      color: #fff;
      align-items: center;
      img {
        margin-right: 10px;
        height: 32px;
        width: 27px;
      }
    }
    .money {
      //   text-align: center;
      height: 32px;
      line-height: 32px;
      width: 343px;
      font-size: 23px;
      color: #fff;
      margin: 5px auto 38px;
    }
    .btn {
      width: 343px;
      height: 44px;
      background: red;
      margin: 0 auto;
      background: linear-gradient(90deg, #494efe 0%, #0900f8 100%);
      border-radius: 6px;
      background: #4a66fa;
      color: #fff;
    }
    .inputBox {
      width: 343px;
      height: 40px;
      // width: 100%;
      // height: 100%;
      display: flex;
      // border: 1px solid #D8D8D8;
      padding: 6px;
      background: #1d1c3b;
      box-sizing: border-box;
      justify-content: space-between;
      border-radius: 4px;
      font-size: 14px;
      input {
        height: 20px;
        flex: 1;
        border: 0;
        font-size: 14px;
        color: #f00;
        background: #1d1c3b;
      }
      img {
        width: 17px;
        height: 20px;
      }
      // span{
      //     display: table-cell;
      //     vertical-align:middle
      // }
    }
    .cell {
      height: 18px;
      width: 100%;
      overflow: hidden;
      line-height: 18px;
      color: #dee7ff;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        width: 40%;
      }
      div:last-child {
        text-align: right;
      }
    }
    .btn {
      margin-top: 30px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .red {
      color: #dee7ff;
    }
  }
  .content-title {
    color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .shuxian {
      width: 4px;
      height: 16px;
      background: #0b02f8;
      margin-right: 10px;
    }
  }
}
</style>
