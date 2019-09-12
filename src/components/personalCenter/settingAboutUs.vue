<template>
  <div class="root">
    <van-nav-bar title="关于我们" left-arrow class="nav-top" @click-left="back" />

    <div class="main">
      <div class="logo">
        <img src="../../assets/img/icon.png" alt="ofc矿机" />
        <div class="logo-text">ofc矿机</div>
      </div>

      <div class="licence">
        <!-- <h3 class="licence-head">用户注册协议</h3> -->
        <div v-html="content"></div>
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
      content:''
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
      this.content = res.data.content
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
  background: #f8f8f8;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-top {
  margin-bottom: 10px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
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
    color: #333;
    font-weight: 500;
    margin-top: 10px;
    font-weight: bold;
  }
}

.licence {
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 6px 0 24px;
  color: #666;
  font-size: 12px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #ddd;

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
</style>
