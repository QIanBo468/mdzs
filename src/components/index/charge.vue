<template>
  <div id="charge">
    <van-nav-bar title="充币" left-arrow :border="false" @click-left="$router.go(-1)" />
    <!-- right-text="充币记录"
    @click-right='onClickRight'-->
    <div class="chargeBox">
      <div class="box-text">
        <div>我的钱包地址</div>

        <div class="encoding">{{obj.address}}</div>
        <div class="btn tag-read" @click="copy" :data-clipboard-text="obj.address">复制</div>
        <!-- <img class="zhixian" :src="obj.qrCode" alt=""> -->
        <img class="img" :src="obj.qrCode" alt />
      </div>
    </div>
    <div class="charge-zhushi">
      <div class="content-title">
        <div class="shuxian"></div>充币说明
      </div>
      <p class="remark" v-html="text"></p>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Toast } from "vant";
export default {
  data() {
    return {
      obj: {},
      text:''
    };
  },
  created() {
    this.$axios
      .fetchPost("/portal/Digiccy", {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1000",
        data: {}
      })
      .then(res => {
        console.log(res)
        if (res.success) {
          this.obj = res.data;
        } else {
          // Toast(res.mes)
        }
      });
      this.$axios.fetchPost('/portal',{
        source: "web",
        version: "v1",
        module: "Content",
        interface: "4003",
        data: {name:'recharge_instruction'}
      }).then(res=>{
        console.log(res)
        this.text = res.data.content
      })
  },
  methods: {
    getInfo() {
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
            this.list = res.data;
            var obj = "";
            if (this.type == "BAT") {
              obj = "credit_1-credit_2";
            }
            this.fee = res.data.params[obj].feeRate;
          }
        });
    },
    onClickRight() {
      this.$router.push("/topUp");
    },
    copy() {
      console.log(233);
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        Toast("复制成功"); //这里你如果引入了elementui的提示就可以用，没有就注释即可
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background: #0b0c21;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
.van-icon {
  color: #fff;
}
#charge {
  width: 100%;
  height: 100%;
  background: #0b0c21;
  overflow-y: auto;
}
.chargeBox{
  padding: 0 50px;
  // width: 100%;
  // height: 100%;
}
.box-text {
border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #4a66fa 0%, #7482fc 100%);
  .img {
    width: 110px;
    height: 110px;
    margin-bottom: 28px;
  }
  .zhixian{
      width: 90%;
      margin-bottom: 20px;
  }
  div:first-child {
    margin: 40px auto 30px;
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #fff;
    img {
      margin-right: 10px;
      width: 27px;
      height: 32px;
    }
  }
  .encoding {
    font-size: 12px;
    color: #fff;
  }
  .btn {
    width: 110px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: #fff;
    border-radius: 6px;
    background: linear-gradient(90deg, #494efe 0%, #0900f8 100%);
    // background: #FC5461;
    margin: 10px auto 20px;
  }
  .remark {
    margin: 0px auto 0px;
    color: #999999;
    font-size: 12px;
    text-align: center;
    font-size: 12px;
    width: 325px;
  }
}
.charge-zhushi {
    padding: 0 15px;
    font-size: 14px;
    text-indent: 2rem;
    letter-spacing: 1.5px;
    line-height: 25px;
  color: #fff;
  .content-title {
    color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    .shuxian {
      width: 4px;
      height: 16px;
      background: #0b02f8;
      margin-right: 10px;
    }
  }
}
</style>
