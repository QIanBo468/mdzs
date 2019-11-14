<template>
  <div class="root">
    <van-nav-bar title="关于我们" left-arrow class="nav-top" @click-left="back" />

    <div class="main">
      <div class="logo">
        <img width="100px" height="100px" :src="content.logo" />
        <div class="logo-text">{{content.name}}</div>
      </div>

      <div class="licence">
        <!-- <h3 class="licence-head">用户注册协议</h3> -->
        <div class="licence-content" v-html="content.aboutUs">
        </div>
      </div>

      <div class="copy">{{content.copyright}}</div>
    </div>
  </div>
</template>

<script>
// TODO
// ofo矿机上面的图片

export default {
  data() {
    return {
      content:{}
    };
  },
  created() {
    this.$axios.fetchPost("/portal", {
      source: "web",
      version: "v1",
      module: "User",
      interface: "6000",
      data:{
        // name:'about_us'
      }
    }).then(res=>{
      console.log(res)
      this.content = res.data
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
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 6px 0 24px;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  // align-items: center;
  // border-top: 1px solid #eee;
  // border-bottom: 1px solid #ddd;

  // &-head {
  //   margin-bottom: 2px;
  //   align-items: flex-start;
  // }
  // .licence-content{
    
  // }
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
