<template>
  <div class="myIndex">
    <div class="my_header">
      <van-nav-bar title="我的">
        <!-- <van-icon name="setting-o" size="20" slot="right" @click="onClickRight" /> -->
      </van-nav-bar>
      <div class="top">
        <div class="top-username">
          <div class="headtext">
            <p>{{info.account}}</p>
            <div class="userid">
              <p>ID：{{info.id}}</p>
              <p>级别：{{info.level}}</p>
            </div>
          </div>
          <img :src="avatar" alt class="headpic" />
        </div>
        <div class="zichan">
          <div class="zican-cont">
            <p>917.11</p>
            <span>总资产(TG)</span>
          </div>
          <div class="zican-cont">
            <p>917.11</p>
            <span>总资产(TG)</span>
          </div>
          <div class="zican-cont">
            <p>917.11</p>
            <span>总资产(TG)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="listbat">
      <!-- <router-link to="/usdt"> -->
      <div class="listbat-cont">
        <div class="num" @click="$router.push('charge')">
          <img width="24px;" height="24px;" src="../../../static/mdimg/chongbi@3x.png" alt />
          <div>充币</div>
        </div>

        <div class="num" @click="$router.push('extract')">
          <img width="24px;" height="24px;" src="../../../static/mdimg/tibi@3x.png" alt />
          <div>提币</div>
        </div>
        <div class="num"  @click="$router.push('transfer')">
          <img width="24px;" height="24px;" src="../../../static/mdimg/zhuanzhang@3x.png" alt />
          <div>站内转账</div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="my_list">
      <router-link class="list" to="inviteFriends">
        <div class="my_first">
          <img src="../../../static/mdimg/yaoqing@3x.png" alt />
          <p>邀请好友</p>
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="zijin">
        <div class="my_first">
          <img src="../../../static/mdimg/zijin@3x.png" alt />
          <p>资金明细</p>
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="jiangjin">
        <div class="my_first">
          <img src="../../../static/mdimg/jiangjin@3x.png" alt />
          <p>奖金明细</p>
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
    </div>
    <div class="my_list">
      <router-link class="list" to="setting">
        <div class="my_first">
          <img src="../../../static/mdimg/geren@3x.png" alt />
          <p>个人资料</p>
          <!-- 实名认证 -->
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="fix_login">
        <div class="my_first">
          <img src="../../../static/mdimg/denglu@3x.png" alt />
          <p>登录密码</p>
          <!-- 交易记录 -->
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>

      <router-link class="list" to="myPaymentMethods">
        <div class="my_first">
          <img src="../../../static/mdimg/zhifu@3x.png" alt />
          <p>支付密码</p>
          <!-- 收款方式 -->
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
    </div>

    <div class="my_list">
      <router-link class="list" to="my_Address">
        <div class="my_first">
          <img src="../../../static/mdimg/dizhi@3x.png" alt />
          <p>地址本</p>
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
    </div>

    <div class="my_list">
      
      <router-link class="list" to="feedbackNew">
        <div class="my_first">
          <img src="../../../static/mdimg/yijian@3x.png" alt />
          <p>问题反馈</p>
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="my_Address">
        <div class="my_first">
          <img src="../../../static/mdimg/kefu@3x.png" alt />
          <p>客服</p>
          <!-- 地址本 -->
        </div>
        <img width="22px" height="22px" src="../../../static/mdimg/in@3x.png" alt />
      </router-link>
      <router-link class="list" to="Login">
        <div class="my_first">
          <img src="../../../static/mdimg/tuichu@3x.png" alt />
          <p>安全退出</p>
        </div>
        <img
          width="22px"
          height="22px"
          class="arrow"
          src="../../../static/mdimg/in@3x.png"
          alt
        />
      </router-link>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      info: "",
      avatar: "",
      money: 0.0
    };
  },
  computed: {},
  methods: {
    onClickRight() {
      this.$router.push("setting");
    }
  },
  created() {
    this.$axios
      .fetchPost("/portal", {
        interface: "1000",
        module: "User",
        source: "web",
        version: "v1",
        data: {}
      })
      .then(res => {
        console.log("个人信息", res);
        // this.goodsList = res.data.list;
        this.info = res.data;
        this.avatar = res.data.avatar;
      });

    this.$axios
      .fetchPost("/portal", {
        interface: "1000",
        module: "Finance",
        source: "web",
        version: "v1",
        data: {}
      })
      .then(res => {
        console.log("钱包信息", res.data.credit_2);
        // this.goodsList = res.data.list;
        this.money = res.data.credit_2.value;
      });
  }
};
</script>
<style scoped lang='less'>
.myIndex {
  overflow-y: auto;
  background: #0b0c21;
}
.my_header {
  // width: 100%;
  // height: 160px;
  margin-bottom: 20px;
  padding: 0 15px;
}
.van-nav-bar {
  background: #0b0c21;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.van-nav-bar .van-icon {
  color: #ffffff !important;
}
.van-nav-bar__title {
  color: #ffffff;
}

.headpic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  margin-top: 5px;
}
.top {
  background: url(../../../static/mdimg/bg@3x.png) no-repeat;
  /* margin-top: 27px; */
  background-size: 100% 100%;
  padding: 27px 10px 0 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  height: 160px;
}
.top-username {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .headtext {
    color: #fff;
    p {
      font-size: 16px;
      margin: 0;
    }
    .userid {
      display: flex;
      margin-top: 10px;
      p {
        margin-right: 10px;
        font-size: 12px;
      }
    }
  }
}
.zichan {
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  align-items: flex-end;
  p {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
}
.my_list {
  padding: 10px 15px;
  border-radius: 6px;
}
.list {
  background: #1d1c3b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-bottom: 0.5px solid #707070;
  padding: 0 10px;
}
.my_first {
  display: flex;
  align-items: center;
}
.my_first > img {
  width: 24px;
  height: 24px;
}
.my_first > p {
  /* width: 100%; */
  font-size: 14px;
  color: #fff;
  margin-left: 10px;
}
/* .list:first-child{
  border: none;
} */
.list:last-child {
  border: none;
}

.listbat {
  height: 77px;
  padding: 0 15px;
  .listbat-cont {
    width: 100%;
    background: #212243;
    height: 77px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #ffffff;
    font-size: 14px;
    .num {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

/* img{
          width: 20px;
      } */
</style>
