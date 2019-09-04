<template>
  <div class="my_address">
    <van-nav-bar
      title="地址本"
      left-arrow
      @click-left="onClickLeft"
      right-text="添加"
      @click-right="onClickRight"
    />

    <van-swipe-cell :on-close="onClose" v-for="(item,index) in list" :key="index">
      <div class="address_list">
        <div class="list_address">
          <span>{{item.name}}</span>
          <span>{{item.address}}</span>
        </div>
        <!-- <input type="radio" name="radios" :value="1" v-model="param" /> -->
      </div>
      <template slot="right">
        <van-button square type="danger" text="立即删除" @click="deletes(item.id)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ''
      // param: '1'
    }
  },
  computed: {},
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    deletes (id) {
      this.$dialog
        .confirm({
          title: '',
          message: '确认删除此地址？'
        })
        .then(() => {
          // 确定
          this.$axios.fetchPost('/portal', {
            interface: '8002',
            module: 'User',
            source: 'web',
            version: 'v1',
            data: {
              id: id
            }
          })
            .then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$toast(res.message)
                this.get_address()
              }
            })
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
    },
    get_address () {
      this.$axios
        .fetchPost('/portal', {
          interface: '8000',
          module: 'User',
          source: 'web',
          version: 'v1',
          data: {}
        })
        .then(res => {
          console.log('我的地址', res)
          this.list = res.data
          console.log(this.list)
        })
    }
  },
  created () {
    this.get_address()
  }
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
