<template>
<div class="root">
  <van-nav-bar title="我的收款方式" left-arrow class="nav-top" @click-left="back" />

  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="load"
    class="list"
  >
    <van-swipe-cell
      v-for="(item, i) in list"
      :key="i"
      :on-close="onClose"
    >
      <div class="item" @click="clickItem(item)">
        <div class="item-left">
          <template v-if="item.type === 1">
            <img class="item-logo" src="../../../static/images/icon/zhifubao.png" />
            <div v-if="item.account">
              <div>账户名称: {{ item.realName }}</div>
              <div>账号: {{ item.account }}</div>
            </div>
            <div v-else>
              <div>绑定支付宝账号</div>
              <div class="item-bind-msg">立即到账，方便快捷</div>
            </div>
          </template>

          <template v-else-if="item.type === 2">
            <img class="item-logo" src="../../../static/images/icon/weixin.png" />
            <div v-if="item.account">
              <div>账户名称: {{ item.realName }}</div>
              <div>账号: {{ item.account }}</div>
            </div>
            <div v-else>
              <div>绑定微信账号</div>
              <div class="item-bind-msg">立即到账，方便快捷</div>
            </div>
          </template>

          <template v-else>
            <img class="item-logo" src="../../../static/images/icon/yinhangka.png" />
            <div v-if="item.account">
              <div>账户名称: {{ item.realName }}</div>
              <div>账号: {{ item.account | accountNo }}</div>
              <div>开户行: {{ item.bankName + item.bankAddress }}</div>
            </div>
            <div v-else>
              <div>绑定个人银行卡</div>
              <div class="item-bind-msg">至少绑定一张银行卡</div>
            </div>
          </template>
        </div>

        <div class="item-right">
          <span class="item-right-bind" v-if="!item.account">去绑定</span>
          <van-icon name="arrow"></van-icon>
        </div>
      </div>
      <template #right v-if="item.account">
        <van-button
          class="delete-btn"
          square
          type="danger"
          text="立即删除"
          @click="deleteItem(item, i)"
        />
      </template>
    </van-swipe-cell>
  </van-list>

</div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      list: [
        {
          type: 1,
        },
        {
          type: 2,
        },
        {
          type: 0,
        },
      ],
      loading: false,
      finished: false,
      page: 1,

      lastId: 0,
    }
  },

  methods: {
    back() {
      this.$router.go(-1)
    },

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

    load() {
      this.loading = true;

      this.getData(this.page);

      this.loading = false;
      this.page++;
    },

    clickItem(item) {
      this.$router.push({
        path: "/myPaymentMethodsBinding",
        query: {
          id: item.id,
          type: item.type,
        },
      })
    },

    deleteItem(item, i) {
      this.$dialog.confirm({
        title: "",
        message: "确认删除吗？",
      }).then(() => {
        this.$axios.fetchPost('/portal', {
          source: "web",
          version: "v1",
          module: "Finance",
          interface: "1904",
          data: {
            id: item.id,
          }
        }).then(res => {
          // console.log(res)
          if (res.code !== 0) {
            this.$toast(res.message)
            return
          }
          this.list.splice(i, 1)
          this.$toast("删除成功")
        })
      }).catch((err) => {
      })
    },

    getData(page) {
      this.$axios.fetchPost('/portal/C2C', {
        source: "web",
        version: "v1",
        module: "Payment",
        interface: "2000",
        data: {
        }
      }).then(res => {
         console.log(Object.keys(res.data.alipay).length)
       // this.lastId = res.data.lastId

        if(Object.keys(res.data.alipay).length > 0){

          //存在支付宝
          this.$set(this.list,0,res.data.alipay)
        }
        if(Object.keys(res.data.wechat).length > 0){
          console.log(res.data.wechat)
          this.$set(this.list,1,res.data.wechat)
        }
      if(Object.keys(res.data.bankCard).length > 0){
          this.$set(this.list,2,res.data.bankCard)
        }
        console.log(this.list)
        if (this.list.length - 3 >= this.total) {
          this.finished = true
        }
      })
    },
  },

  filters: {
    accountNo(value) {
      value = value + ""
      let n = Math.ceil(value.length / 4)
      let s = ""
      for (let i = 0; i < n; i++) {
        s += (value.substring(i * 4, (i + 1) * 4) + " ")
      }
      return s
    },
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar{
  background: #0D0900;
}
/deep/.van-nav-bar__title{
  color: #fff;
}
[class*=van-hairline]::after{
  border: none;
}
.van-icon{
  color: #fff;
}
.root {
  background: #0D0900;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
}

.list {
  padding: 0 8px;
  // background: #fff;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;
  border-bottom: 1px solid #0D0900;
  font-size: 14px;
  color: #fff;
  background: #1D1C3B;

  &:active {
    background: #f2f3f5;
  }

  &-logo {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }

  &-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-right {
    color: #999;
    display: flex;
    align-items: center;

    &-bind {
      font-size: 12px;
      margin-right: 6px;
    }
  }

  &-bind-msg {
    color: #CBD9FF;
    font-size: 12px;
  }
}

.delete-btn {
  height: 100%;
}

</style>
