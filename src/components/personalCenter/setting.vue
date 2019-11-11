<template>
<div class="root">
  <van-nav-bar title="个人资料" left-arrow class="nav-top" @click-left="back" />

  <van-cell-group class="group">
    <div class="cell select-image-parent">
      <span>头像</span>
      <div class="cell-right">
        <input
          class="select-image"
          type="file"
          accept="image/*"
          capture="camera"
          @change="uploadImage"
        />

        <img v-if="headimg !== ''" class="cell-right-img" :src="headimg" alt="头像"/>
        <img v-else class="cell-right-img" src="../../assets/img/morentouxiang.png" alt="头像"/>
        <van-icon class="cell-right-icon" name="arrow"></van-icon>
      </div>
    </div>
    <div class="cell" @click="clickNickName">
      <span>昵称</span>
      <div class="cell-right">
        <span class="cell-right-text">{{ nickname }}</span>
        <van-icon class="cell-right-icon" name="arrow"></van-icon>
      </div>
    </div>
  </van-cell-group>

  <van-cell-group class="group">
    <div class="cell" @click="clickAbout">
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
      nickname: "",
    }
  },

  methods: {
    submit () {
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "Account",
        interface: "2000",
        data: {}
      }).then(res => {
        if(res.success) {
          this.$router.push('/login')
        }
      })
    },
    getData() {
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "User",
        interface: "1000",
        data: {}
      }).then(res => {
        // console.log(res)
        this.nickname = res.data.nickname
        this.headimg = res.data.avatar
      })
    },

    back() {
      this.$router.go(-1)
    },

    uploadImage(e) {
      let file = e.target.files[0]
      if (!file) {
        return
      }

      let reader = new FileReader()
      reader.onload = (e) => {
        this.headimg = e.target.result
      }
      reader.readAsDataURL(file)

      let form = new FormData()
      form.append("file", file)
      this.$axios.fetchPost("http://zuanshi.qdunzi.cn/upload", form).then(res => {
        // console.log(res)
        this.$axios.fetchPost('/portal', {
          source: "web",
          version: "v1",
          module: "User",
          interface: "1001",
          data: {
            avatar: res.data.file,
          }
        }).then(res => {
          // console.log(res)
          this.$toast("更换头像成功")
        })
      }).catch(err => {
        console.log(err)
      })

    },

    clickNickName() {
      this.$router.push({
        path: "/settingChangeNickName",
        query: {
          nickname: this.nickname,
        },
      })
    },

    clickAbout() {
      this.$router.push("/settingAboutUs")
    },
  },

  created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.root {
  background: #0C0C0C;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
  background: #0C0C0C;
  .van-nav-bar__title{
    color: #fff;
  }
  .van-icon{
    color: #fff;
  }
}

.group {
  margin-bottom: 10px;
  background: none;
}

.cell {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
  padding: 0 16px;
  color: #fff;
  background: #1D1C3B;

  &:active {
    // background: #f2f3f5;
  }

  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 80%;
    color: #fff;
    &-img {
      width: 44px;
      height: 44px;
      border-radius: 22px;
    }

    &-text {
      color: #fff;
      width: 80%;
      line-height: 14px;
      flex-grow: 1;
    }

    &-icon {
      margin-left: 6px;
      color: #ddd;
      font-size: 16px;
    }
  }
}

.select-image-parent {
  position: relative;
}
.select-image {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
[class*=van-hairline]::after{
  border: none;
}
</style>
