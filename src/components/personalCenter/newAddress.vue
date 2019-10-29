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

      if(this.name == ''){
        this.$toast({
          message: '姓名不可为空',
          duration: 1000
        });
        return false;
      }
      if(this.address == ''){
        this.$toast({
          message: '地址不可为空',
          duration: 1000
        });
        return false;
      }


      this.$axios
        .fetchPost("/portal/Digiccy", {
          interface: "1001",
          module: "Address",
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
  background: #0D0900;
  width: 100%;
  height: 100%;
}
.new_add {
  background: #0D0900;
  margin-top: 10px;
  height: 100%;
  position: relative;
}
.add {
  padding: 20px;
}
.adds > p {
  color: #fff;
  font-size: 14px;
}
.adds > input {
  width: 100%;
  height: 40px;
  border: none;
  background: #1D1C3B;
  /* border: 1px solid #d8d8d8; */
  border-radius: 4px;
  padding: 0 0 0 7px;
  color: #fff;
}
.adds >>> input::placeholder {
  color: #999999;
  font-size: 15px;
}
.sure {
  /* padding: 15px; */
  /* margin-top: 55px; */
  width: 100%;
  /* background: #ffffff; */
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
}
button {
  background: linear-gradient(90deg, #494EFE 0%,#0900F8 100%);
  width: 95%;
  border: none;
  height: 45px;
  /* padding: 15px; */
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  line-height: 45px;

}

.van-nav-bar{
  background: #0D0900;
}
.van-nav-bar__title{
  color: #ffffff;
}
.van-nav-bar__text[data-v-14179e7b]{
  color: #ffffff;
}
[class*=van-hairline]::after{
  border: none;
}
.van-icon{
  color: #ffffff;
}
</style>
