<template>
<div class="root">
  <van-nav-bar
    title="问题反馈"
    left-arrow
    class="nav-top"
    @click-left="back"
  >
    <template #right>
      <div class="nav-top-right" @click="goToFeedbackNew">我要反馈</div>
    </template>
  </van-nav-bar>

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="load"
    class="list"
  >
    <div
      v-for="(item, i) in list"
      :key="i"
      class="item"
      @click="clickItem(item)"
    >
      <div class="item-top">
        <img class="item-top-img" src="../../assets/img/question.png" alt="ask" />
        <div class="item-top-feedback">
          <div>{{ item.feedback }}</div>
          
          <ul class="item-top-img-list">
            <li
              v-for="(img, i) in item.feedbackImgs"
              :key="i"
            >
              <img class="item-top-img-item" :src="img" alt="img" />
            </li>
          </ul>

          <div class="item-top-date">{{ item.feedbackDate }}</div>
        </div>
      </div>

      <div class="item-bottom">
        <div class="item-bottom-reply">
          <div>{{ item.reply }}</div>
          <div class="item-top-date">{{ item.replyDate }}</div>
        </div>
        <img class="item-top-img" src="../../assets/img/answer.png" alt="reply" />
      </div>
    </div>
  </van-list>

</div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

    load() {
      this.loading = true;

      this.getData(this.page);

      this.loading = false;
      this.page++;
    },

    clickItem(item) {
    },

    goToFeedbackNew() {
      this.$router.push("/feedbackNew")
    },

    getData(page) {
      this.list = [
        {
          feedback: "可不可以增加矿机的种类呢",
          feedbackDate: "2019.06.12 13:00:54",
          reply: "明天上新哦，敬请期待！",
          replyDate: "2019.06.12 13:00:54",
        },
        {
          feedback: "请问这个是什么意思？",
          feedbackDate: "2019.06.12 13:00:54",
          feedbackImgs: [
            "http://img2.mtime.com/up/454/1152454/1382C875-EF8E-4B41-A5AF-CF920AABC062_500.jpg",
            "http://img2.mtime.com/up/454/1152454/1382C875-EF8E-4B41-A5AF-CF920AABC062_500.jpg",
            "http://img2.mtime.com/up/454/1152454/1382C875-EF8E-4B41-A5AF-CF920AABC062_500.jpg",
          ],
          reply: "亲，这是正在处理中的意思，请耐心等待！",
          replyDate: "2019.06.12 13:00:54",
        },
      ]
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
  
  &-right {
    color: #666;
  }
}

.list {
  margin: 15px;
}

.item {
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background: #fff;
  margin-bottom: 10px;

  &:active {
    background: #f2f3f5;
  }

  &-top {
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid #f8f8f8;

    &-img-list {
      display: flex;
    }
    &-img-item {
      width: 70px;
      height: 70px;
      margin: 6px 6px 0 6px;
    }

    &-feedback {
      display: flex;
      flex-direction: column;
      color: #666;
    }

    &-date {
      margin-top: 5px;
      color: #999;
      font-size: 12px;
    }

    &-img {
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
  }

  &-bottom {
    display: flex;
    justify-content: flex-end;
    padding-top: 8px;

    &-reply {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      color: #666;
    }
  }

}

</style>
