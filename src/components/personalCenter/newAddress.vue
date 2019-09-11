<template>
  <div class="newaddress">
    <van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft" />
    <div class="new_add">
      <div class="add">
        <div class="adds">
          <p>姓名</p>
          <input type="text" placeholder="请输入姓名" v-model="name" />
        </div>
        <div class="adds">
          <p>地址</p>
          <input type="text" placeholder="请输入有效地址" v-model="address" />
        </div>
      </div>
      <div class="sure">
        <button @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      address: ""
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      this.$axios
        .fetchPost("/portal", {
          interface: "8001",
          module: "User",
          source: "web",
          version: "v1",
          data: {
            name: this.name,
            address: this.address
          }
        })
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$toast({
              message: res.message,
              duration: 1000
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$toast(res.message);
          }
        });
    }
  },
  created() {}
};
</script>
<style scoped>
.newaddress {
  background: #f8f8f8;
}
.new_add {
  background: #fff;
  margin-top: 10px;
  height: 100%;
  position: relative;
}
.add {
  padding: 20px;
}
.adds > p {
  color: #666666;
  font-size: 14px;
}
.adds > input {
  width: 100%;
  height: 40px;
  border: none;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 0 0 0 7px;
}
.adds >>> input::placeholder {
  color: #999999;
  font-size: 15px;
}
.sure {
  padding: 15px;
  margin-top: 55px;
  /* position: fixed;
  bottom: 220px;
  left: 0;
  right: 0; */
}
button {
  background: #f45c68;
  width: 100%;
  border: none;
  padding: 15px;
  color: #fff;
  font-size: 16px;
  border-radius: 23px;
}
</style>
