<template>
  <div class="root">
    <van-nav-bar title="关于我们" left-arrow class="nav-top" @click-left="back" />

    <div class="main">
      <div class="logo">
        <img width="100px" height="100px" src="../../../static/mdimg/logo@3x.png" />
        <div class="logo-text">锚定钻石</div>
      </div>

      <div class="licence">
        <h3 class="licence-head">用户注册协议</h3>
        <div v-html="content">
        </div>
      </div>

      <div class="copy">copyright@med</div>
    </div>
  </div>
</template>

<script>
// TODO
// ofo矿机上面的图片

export default {
  data() {
    return {
      content:'未经本站的授权或许可，任何会员不得借用本站的名义从事任何商业活动，也不得将本站作为从事商业活动的场所、平台或其他任何形式的媒介。禁止将本站用作从事各种非法活动的场所、平台或者其他任何形式的媒介。违反者若触犯法律，一切后果自负，本站不承担任何责任。'
    };
  },
  created() {
    this.$axios.fetchPost("/portal", {
      source: "web",
      version: "v1",
      module: "Content",
      interface: "4003",
      data:{
        name:'about_us'
      }
    }).then(res=>{
      console.log(res)
      // this.content = res.data.content
    })
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  background: #0D0900;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-top {
  margin-bottom: 10px;
  background: #0D0900;
    .van-nav-bar__title{
    color: #fff;
  }
  .van-icon{
    color: #fff;
  }
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0D0900;
  flex-grow: 1;
  padding: 15px;
}

.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  &-text {
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    margin-top: 10px;
    font-weight: bold;
  }
}

.licence {
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 6px 0 24px;
  color: #fff;
  font-size: 12px;
  // border-top: 1px solid #eee;
  // border-bottom: 1px solid #ddd;

  &-head {
    margin-bottom: 2px;
  }
}

.copy {
  margin-top: 30px;
  margin-bottom: 20px;
  color: #8f8f8f;
  font-size: 14px;
}
[class*=van-hairline]::after{
  border: none;
}
</style>
