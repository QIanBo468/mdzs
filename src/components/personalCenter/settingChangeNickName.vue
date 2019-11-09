<template>
  <div class="root">
    <div class="rootbox">
    <van-nav-bar title="修改昵称" left-arrow class="nav-top" @click-left="back" />

    <div class="content-title">
      <div class="shuxian"></div>昵称
    </div>
    <van-cell-group class="settingname">
      <van-field
        v-model="nickname"
        clearable
        label="姓名"
        label-class="label"
        label-width="60px"
        placeholder="请输入姓名"
        class="name"
        @blur="save"
      />
    </van-cell-group>
    <van-button class="btn" @click="save">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      nickname: this.$route.query.nickname
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    save() {
      this.$axios
        .fetchPost("/portal", {
          source: "web",
          version: "v1",
          module: "User",
          interface: "1001",
          data: {
            nickname: this.nickname
          }
        })
        .then(res => {
          Toast(res.message);
          // console.log(res)
        });
    }
  }
};
</script>

<style lang="less" scoped>
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
.root {
  background: #0d0900;
  height: 100vh;
  padding: 10px;
}

.nav-top {
  margin-bottom: 10px;
  background: #0d0900;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}

/deep/ .label {
  color: #666;
}

.name {
  height: 60px;
  display: flex;
  align-items: center;
  background: #212243;
  color: #fff;
  /deep/span {
    color: #fff;
  }
}
.settingname{
  margin-bottom: 80px;
}
.btn{
  width: 100%;
  background: #4A66FA;
  color: #fff;
  border: none;
}
/deep/.van-field__control {
  color: #fff;
}
[class*="van-hairline"]::after {
  border: none;
}
</style>
