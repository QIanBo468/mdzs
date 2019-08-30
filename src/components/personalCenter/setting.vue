<template>
<div class="root">
  <van-nav-bar title="设置" left-arrow class="nav-top" />

  <van-cell-group class="group">
    <div class="cell headimg">
      <span>头像</span>
      <div class="cell-right">
        <img class="cell-right-img" :src="headimg" alt="头像"/>
        <van-icon class="cell-right-icon" name="arrow"></van-icon>
      </div>
    </div>
    <div class="cell headimg">
      <span>昵称</span>
      <div class="cell-right">
        <span class="cell-right-text">{{ nickname }}</span>
        <van-icon class="cell-right-icon" name="arrow"></van-icon>
      </div>
    </div>
  </van-cell-group>

  <van-cell-group class="group">
    <div class="cell headimg">
      <span>关于我们</span>
      <div class="cell-right">
        <van-icon class="cell-right-icon" name="arrow"></van-icon>
      </div>
    </div>
  </van-cell-group>

</div>
</template>

<script>
export default {
  data() {
    return {
      headimg: "",
      nickname: ""
    }
  },

  methods: {
    getData() {
      this.nickname = "奔跑的兔子"
      this.headimg = "http://img2.mtime.com/up/454/1152454/1382C875-EF8E-4B41-A5AF-CF920AABC062_500.jpg"
    }
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.root {
  background: rgba(248, 248, 248, 1);
}

.nav-top {
  margin-bottom: 10px;
}

.group {
  margin-bottom: 10px;
}

.cell {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;

  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 80%;

    &-img {
      width: 44px;
      height: 44px;
      border-radius: 22px;
    }

    &-text {
      color: #333;
      width: 80%;
      line-height: 14px;
      flex-grow: 1;
    }

    &-icon {
      margin-left: 6px;
      color: #bbb;
      font-size: 16px;
      flex-base: 16px;
    }
  }
}

.headimg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 0 16px;
  color: rgba(102, 102, 102, 1);

  &:active {
    background: #f2f3f5;
  }
}

</style>
