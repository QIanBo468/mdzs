<template>
  <div class="my_address">
    <van-nav-bar
      title="地址本"
      left-arrow
      @click-left="onClickLeft"
      right-text="添加"
      @click-right="onClickRight"
    />
    <van-swipe-cell :on-close="onClose">
      <div class="address_list">
        <div class="list_address">
          <span>奔跑的小米</span>
          <span>sjdhffkj27364829hdjkfhfkdj</span>
        </div>
      </div>

      <template slot="right">
        <van-button square type="danger" text="立即删除" @click="deletes" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    deletes () {
      this.$dialog
        .confirm({
          title: '',
          message: '确认删除此地址？'
        })
        .then(() => {
          // 确定
        })
        .catch(() => {
          // on cancel
        })
    },
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          break
      }
    },
    onClickRight () {
      this.$router.push('newAddress')
    }
  },
  created () {}
}
</script>
<style scoped>
.my_address {
  background: #f8f8f8;
  height: 100vh;
}
.address_list {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
}

.list_address {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.list_address > span:nth-child(1) {
  color: #333333;
  font-size: 15px;
}
.list_address > span:nth-child(2) {
  color: #666666;
  font-size: 13px;
  margin-top: 5px;
}
.my_address >>> .van-button--normal {
  height: 70px;
}
.van-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_address >>> .van-dialog__message {
  font-size: 15px;
  color: #333333;
  font-weight: 500;
}
.van-nav-bar__text {
  color: #666666;
  font-size: 15px;
}
</style>
