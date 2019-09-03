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
    <div
      v-for="(item, i) in list"
      :key="i"
      class="item"
      @click="clickItem(item)"
    >
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

    getData(page) {
      this.$axios.fetchPost('/portal', {
        source: "web",
        version: "v1",
        module: "Finance",
        interface: "1900",
        data: {
          lastId: this.lastId,
          page,
        }
      }).then(res => {
        console.log(res)
        this.lastId = res.data.lastId
        let list = res.data.list
        this.total = res.data.total
        this.list.push(...list)

        if (this.list.length - 3 >= this.total) {
          this.finished = true
        }
      })

      let list = [
        {
          type: 1,
          id: 1,
          realName: "李小猫",
          account: "12383747463",
        },
        {
          type: 2,
          id: 2,
          realName: "李小猫",
          account: "12383747463",
        },
        {
          type: 0,
          id: 3,
          realName: "李小猫",
          account: "3746374637463746123",
          bankName: "招商银行",
          bankAddress: "临沂北城支行",
        },
      ]
      this.list.push(...list)
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
.root {
  background: #f8f8f8;
  height: 100vh;
}

.nav-top {
  margin-bottom: 10px;
}

.list {
  padding: 0 8px;
  background: #fff;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;

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
    color: #999;
    font-size: 12px;
  }
}

</style>
