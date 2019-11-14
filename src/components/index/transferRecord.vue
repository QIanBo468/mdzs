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
        <!-- <div class='record' v-for='(item, index) in list' :key='index'> -->
          <!-- <div class='status'>兑换成功</div> -->
           <div class='record' v-for='(item, index) in list' :key='index'>
                    <!-- <div v-if='item.status == 0' class='status red'>申请中</div>
                    <div v-if='item.status == 1' class='status'>提币成功</div>
                    <div v-if='item.status == -1' class='status red'>申请被驳回</div> -->
                    <!-- <div class="record-list"> -->
                        <div class="record-list-one">
                            <p>{{item.creditName}}</p>
                            <div>{{item.toUser.account}}</div>
                            <span>{{item.createdAt}}</span>
                        </div>
                        <div class="record-list-two">
                            <!-- <p>{{item.status == 0? '申请中': (item.status ==1 ? '提币成功': '申请被驳回')}}</p> -->
                            <div>{{item.money}}</div>
                            <!-- <span>手续费:{{item.fee}}</span> -->
                        </div>
                    <!-- </div> -->
    
                </div>
        <!-- </div> -->
      </van-list>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [
          
        ],
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
              data: { lastId: lastid,page: page,creditType: 'credit_5',isOut:true}
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
                // background: #fff;
                margin-bottom: 10px;
                background: #212243;
                display: flex;
                   justify-content: space-between;
                   align-items: center;
               .record-list-one{
                   display: flex;
                   flex-direction: column;
                   align-items: flex-start;
                p{
                    font-size: 14px;
                    color: #CBD9FF;
                    margin: 5px;
                    padding: 0;
                }
                > div{
                    color: #fff;
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                    span{
                        font-size: 11px;
                        color: #BEC6E4;
                    }
               }
               .record-list-two{
                   display: flex;
                   flex-direction: column;
                   align-items: flex-end;
                p{
                    font-size: 14px;
                    color: #8FADFF;
                    margin: 5px;
                    padding: 0;
                }
                > div{
                    color: #fff;
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                    span{
                        font-size: 11px;
                        color: #BEC6E4;
                    }
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
