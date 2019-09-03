<template>
<div class="root">
  <van-nav-bar title="我要反馈" left-arrow class="nav-top" @click-left="back" />

  <div class="main">
    <van-field
      v-model="feedback"
      placeholder="请输入您要反馈的内容"
      type="textarea"
      clearable
      autosize
      rows="4"
      maxlength="200"
      class="feedback"
    />
    <van-uploader
      v-model="fileList"
      multiple
      :max-count="3"
      class="uploader"
      :after-read="upload"
      />
    <van-button class="submit-btn" @click="submit">提交</van-button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      feedback: "",
      fileList: [],
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    upload(file) {
      let list = []
      if (file.length) {
        for (let i = 0; i < file.length; i++) {
          list.push(file[i].file)
        }
      } else {
        list.push(file.file)
      }

      this.uploadOne(list, 0)
    },
    uploadOne(list, i) {
      let form = new FormData()
      form.append("file", list[i])
      this.$axios.fetchPost("http://ofc.qdunzi.com/upload", form).then(res => {
        // console.log(res)
        list[i]._url = res.data.file
        if (i + 1 < list.length) {
          this.uploadOne(list, i + 1)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    submit() {
      let list = []
      for (let i = 0; i < this.fileList.length; i++) {
        list.push(this.fileList[i].file._url)
      }
      console.log(list)
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

.main {
  margin: 10px 16px 0;
  display: flex;
  flex-direction: column;
}

.feedback {
  border-radius: 4px;
}

.uploader {
  margin: 10px 0 40px;
}

.submit-btn {
  background: url("../../assets/img/big_btn.png");
  color: #fff;
}

</style>
