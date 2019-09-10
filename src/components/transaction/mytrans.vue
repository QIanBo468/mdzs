<template>
  <div class="bothse">
    <trannav :title="title" :leftj="true"></trannav>
    <div class="titletab">
      <div
        class="tablist"
        @click="clicktab(index)"
        v-for="(item,index) in tablist"
        :key="index"
        :class="[index == tabstate?'tabact':'']"
      >{{item}}</div>
    </div>
    <div class="bodylist" >
      <div class="listmodule" v-for="(item,index) in bodylist" :key="index" @click="goxq(index)">
        <div class="list_model first_div">
          <div>单号：{{item.orderNo}}</div>
          <div>
            <span :style=" {'color':item.onOffer == 1 ? '':'#1890FF'}">{{item.offerChinese}}</span>
            <!-- <span v-else-if="item.onOffer == 0" style="color:#1890FF;">已完成</span> -->
          </div>
        </div>

        <div class="list_model">
          <div>数量</div>
          <div>{{item.num}}</div>
        </div>

        <div class="list_model">
          <div>单价</div>
          <div>{{item.unitPrice}}</div>
        </div>

        <div class="list_model maijia">
          <div>售价</div>
          <div>{{item.price}}</div>
        </div>

        <div class="list_model clickview" v-if="item.onComplaint == 0&&item.onOffer == 1">
          <div></div>
          <div  @click="chexiao(index)">撤销</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "mytrans",
  data() {
    return {
      title: "我的交易",
      tablist: ["买单列表", "卖单列表"], //头部切换
      tabstate: 0, //选中状态

      page: 1, //页数
      lastId: 0, //lastid
      bodylist: [], //列表
      lastpage: "" //最后一页
    };
  },
  created(){
      this.myjiao()
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFn,true);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollFn,true); // 销毁监听
  },
  methods: {
    //文档高度
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }, //可视窗口高度
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }, //滚动条高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }, //然后在scrollFn函数中判断:
    scrollFn() {
      if (
        this.getScrollTop() + this.getWindowHeight() ==
        this.getScrollHeight()
      ) {
        //这里执行动态获取数据的函数
        this.page++;
        this.myjiao();
        if (this.page == this.lastpage) {
         window.removeEventListener("scroll", this.scrollFn); // 销毁监听
        }
      }
    },
    
        // 我的交易
    myjiao(){
      var _this = this;
      let data = {
        lastId: _this.lastId,
        page: _this.page,
        type: _this.tabstate
      };
      _this.$axios
        .fetchPost("/portal", {
          interface: "6000",
          module: "User",
          source: "web",
          version: "v1",
          data: data
        })
        .then(res => {
          console.log("我的交易", res);
          if (res.code == 0) {
            _this.lastId = res.data.lastId;
            _this.page = res.data.currentPage;
            _this.lastpage = res.data.lastPage;
            _this.bodylist = _this.bodylist.concat(res.data.list);
          } else if (res.code == 4800) {
            _this.$toast(res.message);
          }
        });  
    },


    // 撤销
    chexiao(index){
        var _this = this;
        let list = _this.bodylist;
        let id = list[index].id;
        _this.$axios.fetchPost("/portal", {
          interface: "1002",
          module: "Attachment",
          source: "web",
          version: "v1",
          data: {
              id:id
          }
        })
        .then(res => {
          console.log("撤销挂单", res);
          if (res.code == 0) {
            _this.$toast(res.message);
            setTimeout(()=>{
                _this.page= 1, //页数
                _this.lastId= 0, //lastid
                _this.bodylist = [];
                _this.myjiao()
            },1200)
            
          } else if (res.code == 4800) {
            v.$toast(res.message);
          }
        });  
    },
    
    // 点击切换
    clicktab(index) {
      this.tabstate = index;
      this.page= 1, //页数
      this.lastId= 0, //lastid
      this.bodylist = [];
      this.myjiao()
    },
    //去详情
    goxq(index){
        let list = this.bodylist;
        let id = list[index].id;
        if(list[index].onOffer != 1)
        this.$router.push({path:'/payment',query:{id:id,states:false}})
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.bothse {
  height: 100vh;
  padding: 40px 0 0;
  background: rgba(0, 22, 114, 1);
}
.titletab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0d2179;
  .tablist {
    width: 50%;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: rgba(216, 216, 216, 1);
    position: relative;
  }
  .tabact {
    color: #fff;
    &:after {
      content: "";
      width: 20px;
      height: 3px;
      background: rgba(248, 77, 77, 1);
      border-radius: 2px;
      position: absolute;
      bottom: 0;
      left: 44%;
    }
  }
}
.bodylist {
  padding: 0 16px 20px;
  background: rgba(0, 22, 114, 1);
  .listmodule {
    margin: 10px 0 0;
    padding: 0 10px 20px;
    border-radius: 6px;
    background: #0d2179;
  }
}
.list_model {
  height: 40px;
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.first_div {
  box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #253786;
  div:first-child {
    color: rgba(216, 216, 216, 1);
  }
  div:last-child {
    color: rgba(254, 128, 0, 1);
  }
}
.maijia {
  color: rgba(248, 77, 77, 1);
}
.clickview {
  div:last-child {
    width: 76px;
    line-height: 26px;
    background: linear-gradient(
      180deg,
      rgba(86, 204, 242, 1) 0%,
      rgba(47, 128, 237, 1) 100%
    );
    opacity: 0.79;
    text-align: center;
    border-radius: 20px;
  }
}
</style>