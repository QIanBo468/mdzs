<template>
  <div id='transferRecord'>
    <van-nav-bar
      title="转账记录"
      left-arrow
      :border="false"
      @click-left='$router.go(-1)'
    />
    <div class='box'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class='record' v-for='(item, index) in list' :key='index'>
          <!-- <div class='status'>兑换成功</div> -->
          <ul>
            <li>
              <div>兑换数量</div>
              <div>{{item.money}}</div>
            </li>
            <li>
              <div>提交时间</div>
              <div>{{item.createdAt}}</div>
            </li>
            <!-- <li>
                <div>爱心基金</div>
                <div>{{item.loveFund}}</div>
            </li>-->
            <li>
              <div>手续费</div>
              <div>{{item.fee}}</div>
            </li>
            <li>
              <div>到账数量</div>
              <div class='red'>{{item.realMoney}}BAT</div>
            </li>
          </ul>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [],
        finished: false,
        loading: false,
        page: 1,
        lastPage: null,
        lastId: 0,
        status: '',
        type: '',
      }
    },
    created() {
      var type = this.$route.query.type,
        status = '3102'
      if(type == 'BAT'){
        status = '2002'
      }else if(type == 'ofc'){
        status = '3100'
      }
      this.status = status
      this.type = this.$route.query.type
    },
    methods: {
      onLoad() {


        var lastid = ''
        if (this.lastId) {
          lastid = this.lastId
        } else {
          lastid = 0
        }
        var page = this.page++
        setTimeout(() => {
          this.$axios.fetchPost('/portal',
            {
              source: "web",
              version: "v1",
              module: "Finance",
              interface: "2002",
              data: { lastId: lastid,page: page,creditType: 'credit_2',isOut:false}
            }).then(res => {
              console.log(res)
            if(res.success){
              if (res.data.list.length == 0) {
                this.finished = true
              } else {
                var ret = res.data.list
                this.tjnum = res.data.total;
                if (page == 1) {
                  this.list = ret
                } else {
                  for (var x in ret) {
                    this.list.push(ret[x])
                  }
                }
              }
            }else {
              this.finished = true
            }
            this.loading = false
          })

        }, 500)



        /*   if (this.lastPage && this.lastPage < this.page) {
               this.finished = true
               this.loading = false;
           }else{

               this.$axios.fetchPost('/portal',
               {
                   source: "web",
                   version: "v1",
                   module: "Finance",
                   interface:  2002,
                   data: {lastId: this.lastId,page: this.page ++,isOut: true}
               }).then(res => {
                   console.log(res);

                   this.list = this.list.concat(res.data.list)
                   this.lastPage = res.data.lastPage
                   this.loading = false;
                   this.lastId = res.data.lastId
               })
           }*/
      },
    }
  }
</script>
<style lang="less">
  #transferRecord{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
  .box{
    padding: 16px;
    overflow: scroll;
  .record{
    padding: 20px;
    border-radius: 6px;
    background: #fff;
    margin-bottom: 10px;
  .status{
    font-size: 12px;
    text-align: right;
    color: #1890FF;
    margin-bottom: 5px;
  }
  .red{
    color: #F84D4D;
  }
  ul li{
    height: 17px;
    line-height: 17px;
    font-size: 12px;
    display: flex;
    margin-bottom: 5px;
    color: #000;
  div:first-child{
    width: 60px;
    color: #666666;
    margin-right: 35px;
  }
  div:last-child{
    width: 70%;
  }
  }
  li:last-child{
    margin-bottom: 0px;
  }
  }
  }
  .van-nav-bar{
    background: #000;
  // background:linear-gradient(180deg,#3FCFFE 0%,#39B2F8 100%);
  // background: #fff;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title{
    color: #fff;
  }
  .van-nav-bar__text{
    color: #fff;
  }
  }
  .van-hairline--bottom::after{
    border: none;
  }
  }
</style>
