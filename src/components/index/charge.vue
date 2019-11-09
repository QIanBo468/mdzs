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
        <img class="zhixian" src="../../../static/mdimg/zhixian@3x.png" alt="">
        <img class="img" :src="obj.qrCode" alt />
      </div>
    </div>
    <div class="charge-zhushi">
      <div class="content-title">
        <div class="shuxian"></div>新密码
      </div>
      <div class="remark">
                                  多年来稳健的经营并成功的将产品销售至亚洲各地,与著名的皇冠、新宝、ESPN等公司有过相关的技术合作。以追求最佳品质,重视用户反馈的娱乐平台服务著称。<br>
      愿景:最受欢迎的娱乐互联网企业使命:通过互联网服务提升娱乐生活新品质肩负着重要的使命,美好的愿景,不断的努力,提供科技化的人性服务,开拓市场新领土。<br>公司一直持续的进行市场资讯的收集和研究,持续拓展业务和开拓全新的服务领域,加强发展技术,至力于新产品的开发、合作。我们每一项产品和软件设计思念,都要求最简单最实用最方便,所以大大的满足用户和
                        </div>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { Toast } from "vant";
export default {
  data() {
    return {
      obj: {}
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
        if (res.success) {
          this.obj = res.data;
        } else {
          // Toast(res.mes)
        }
      });
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
}
.chargeBox{
  padding: 0 50px;
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
    font-size: 14px;
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
