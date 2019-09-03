<template>
<div class="root">
  <van-nav-bar title="修改昵称" left-arrow class="nav-top" @click-left="back" />

  <van-cell-group>
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

</div>
</template>

<script>
export default {
  data() {
    return {
      nickname: this.$route.query.nickname,
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    save() {
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1001",
        data: {
          nickname: this.nickname,
        }
      }).then(res => {
        // console.log(res)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.root {
  background: #f8f8f8;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
}

/deep/ .label {
  color: #666;
}

.name {
  height: 60px;
  display: flex;
  align-items: center;
}

</style>
