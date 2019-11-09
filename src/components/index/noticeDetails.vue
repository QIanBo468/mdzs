<template>
  <div class="noticeDetails">
    <van-nav-bar title="公告详情" left-arrow @click-left="onClickLeft" class="notice-xg" />
    <div class="box">
      <div class="title">{{obj.title}}</div>
      <div class="remarks">{{obj.time}}</div>
      <div
        v-html="obj.content"
        style="word-break: break-all;font-size: 14px;width: 343px;color:#fff;line-height:30px;text-indent: 2em;letter-spacing: .6px;"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
          title:123,
          time: 2019-11-9,
          content:'12312312311111111111111111111xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzcxcccccccccccccccccccccccccccccccccccccccccccc'
          }
    };
  },
  created() {
    this.$axios
      .fetchPost("/portal", {
        source: "web",
        version: "v1",
        module: "Content",
        interface: "3001",
        data: { id: this.$route.query.id }
      })
      .then(res => {
        this.obj = res.data;
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.noticeDetails {
  img {
    width: 100%;
    overflow: hidden;
  }
}
</style>
<style lang="less" scoped>
.noticeDetails {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0c0c0c;
  .notice-xg {
    background: #0c0c0c;
    border: none;
    color: #fff;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
  .box {
      background: #0c0c0c;
    flex: 1;
    overflow: scroll;
    // border-top: 10px solid #f6f6f6;
    padding: 10px 16px 0;

    .title {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      color: #fff;
      height: 21px;
      line-height: 21px;
      margin-bottom: 5px;
    }
    .remarks {
      font-size: 12px;
      color: #999;
      text-align: right;
      margin-bottom: 5px;
    }
  }

}
// 底边线
[class*="van-hairline"]::after {
  border: none;
}
</style>