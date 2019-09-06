<template>
<div class="root">
  <van-nav-bar title="设置" left-arrow class="nav-top" @click-left="back" />

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
  <div class='btn' @click='submit'>退出登录</div>
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
      this.$axios.fetchPost("http://ofc.qdunzi.com/upload", form).then(res => {
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
  background: #f8f8f8;
  height: 100vh;
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  font-size: 14px;
  padding: 0 16px;
  color: rgba(102, 102, 102, 1);

  &:active {
    background: #f2f3f5;
  }

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
.btn{
   width: 343px;
    height: 44px;
    background: red;
    margin: 0 auto;
    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
    border-radius: 22px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
    margin-top: 300px;
}
</style>
