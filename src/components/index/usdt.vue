<template>
    <div id='usdt'>
        
        <div class="navstatis">
         <van-nav-bar
            :title=title
            left-arrow
            :border="false"
            @click-left="onClickLeft"
        />
        <div class="usdt-box">
        <div class='statis'>
            <div>余额</div>
            <div>{{$route.query.num}}</div>
        </div>
        </div>
        </div>

        <van-tabs v-model="active" @change="acChange">
            <van-tab title="全部">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list" v-for='(item, index) in list' :key='index'>
                        <ul>
                            <li class='overText'>{{item.remark}}</li>
                            <li>{{item.createdAt}}</li>
                        </ul>
                        <div  :class='[item.type == 1 ? "": "blue","overText"]'>
                            {{item.num}}
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="收入">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <div class="list" v-for='(item, index) in list' :key='index'>
                    <ul>
                        <li >{{item.remark}}</li>
                        <li>{{item.createdAt}}</li>
                    </ul>
                    <div  :class='[item.type == 1 ? "": "blue","overText"]'>
                        {{item.num}}
                    </div>
                </div>
                </van-list>
            </van-tab>
            <van-tab title="支出">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                    <div class="list" v-for='(item, index) in list' :key='index'>
                        <ul>
                            <li >{{item.remark}}</li>
                            <li>{{item.createdAt}}</li>
                        </ul>
                        <div :class='[item.type == 1 ? "": "blue","overText"]'>  <!-- -->
                            {{item.num}}
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
        
    </div>
</template>
<script>
  import { setTimeout } from 'timers';
  export default {
    data () {
      return {
        active: 0,
        usdt: {},
        list: [],
        finished: false,
        loading: false,
        lastPage: null,
        page: 1,
        lastId: 0,
        title:'',
        creditType:''
      }
    },
    created () {
        if(this.$route.query.type == 0){
            this.title ='DOC',
            this.creditType = 'credit_3'
        } else{
            this.title = 'TG'
            this.creditType = 'credit_1'
        }
    },
    methods: {
      onClickLeft () {
        this.$router.push({path:'Index'})
      },
      acChange(){
        this.finished = false
        this.loading = false
        this.lastPage = null
        this.page = 1
        this.lastId = 0
        this.list = []
        setTimeout(()=> {
          this.onLoad ()
        },1000)
      },
      onLoad () {
        let type = this.active,direction = ''
        if( type == 0 ){
          direction = ''
        }else if(type == 1) {
          direction = '1'
        }else{
          direction = '-1'
        }
        if (this.lastPage && this.lastPage < this.page) {
          this.finished = true
          this.loading = false;
        }else{
          this.$axios.fetchPost('/portal',
            {
              source: "web",
              version: "v1",
              module: "Finance",
              interface: "1002",
              data: {lastId: this.lastId,page: this.page ++,creditType: this.creditType,direction:direction}
            }).then(res => {
            console.log(res);
            this.lastPage = res.data.lastPage
            this.lastId = res.data.lastId
            this.usdt = res.data
            this.loading = false;
            this.list = this.list.concat(res.data.list)
          })
        }
      }
    }
  }
</script>
<style lang="less">
   #usdt{
        .navstatis{
            width: 100%;
            background:linear-gradient(180deg,#4C67FA 0%,#7382FC 100%);
            z-index: 5;
            // margin-bottom: 20px;
        }
        .van-nav-bar{
            background: #0C0C0C;
            // background:linear-gradient(180deg,#3FCFFE 0%,#39B2F8 100%);
            // background: #fff;
            .van-icon {
                color: #fff;
            }
            .van-nav-bar__title{
                color: #fff;
            }
        }
        .van-tabs__nav{
            background: #1D1C3B;
            margin-bottom: 5px !important;
            border: none;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
            border-width: 0;
        }
        .van-tabs__content{
            background: #1D1C3B !important;
            margin-top: 10px;
        }
        .van-tabs__line{
            background:linear-gradient(180deg,#494EFE 0%,#0C04F8 100%);
            width: 25px!important;
            height: 5px;
            border-radius:5px;
        }
        .van-tab--active{
            .van-ellipsis{
                font-size: 14px;
                color: #ffffff!important
            }
        }
        .van-ellipsis{
            color: #999999;
        }
        .van-tabs__content{
            background: #fff;
        }

    }
</style>
<style lang="less" scoped>
#usdt{
    width: 100%;
    height: 100%;
    background: #0D0900;
    .usdt-box{
        // width: 100%;
        height: 100%;
        padding:  0 10px;
    }
    
}
.statis{
    width: 100%;
    height: 130px;
    // background:linear-gradient(180deg,#39B2F8 0%, #2F80ED 100%);
    // background: #fff;
    padding: 30px  23px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 15px;
    margin: 10px 15px 15px;
    border-radius: 6px;
    div{
        height: 20px;
        line-height: 20px;
    }
    div:last-child{
        height: 32px;
        line-height: 32px;
        font-size: 23px;

    }
}

.list{
    padding: 5px 0;
    width: 343px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    background: #1D1C3B;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    // border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
    margin-bottom: 5px;
    ul{
        flex: 6;
        width: 120px;
        // overflow: hidden;
        height: 100%;
        li{
            font-size: 14px;
            color: #aaa;
            height: 20px;
            line-height: 20px;
            word-wrap: break-word;
        }
        li:last-child{
            font-size: 11px;
            color: #DEE7FF;
            height: 16px;
            margin-top: 5px;
            line-height: 16px;
        }
    }
    div{
        flex: 4;
        width: 130px;
        text-align: right;
        font-size: 16px;
        color: #fff;
    }
    .blue{
        color: #BEC6E4;
    }
}
// /deep/.van-tabs{
//     background: #1D1C3B;
// }
.deposit{
    background: #fff;
    height: 40px;
    display: flex;
    // padding-left: 30px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 10px;
    div{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        span{
            color: #666;
        }
        img{
            width: 20px;
            margin-right: 5px;
            height: 20px;
        }
    }
}
.van-loading .van-loading--circular{
    background: #1D1C3B;
}
      [class*=van-hairline]::after{
        border: none;
        }
    // .{
    //     background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%);
    // }
    //
    //
</style>
