<template>
    <div id='address'>
        <van-nav-bar
            title="地址本"
            left-arrow
            :border="false"
            @click-left='$router.go(-1)'
        />
        <ul class='box'>
            <li v-for='(item, index) in list' :key='index' @click='select(index,item)' :class='active === index? "active": ""'>
                <div class='info'>
                    <p>姓名：{{item.name}}</p>
                    <p>钱包地址：{{item.address}}</p>
                </div>
                <div class='img'>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            active: null,
            imgSrc: '../../../static/images/index/select.png',
            list: [],
          lastId:0,
          page: 1
        }
    },
    created() {
        this.usdt = this.$route.query.usdt
      this.$axios
        .fetchPost('/portal/Digiccy', {
          interface: '1000',
          module: 'Address',
          source: 'web',
          version: 'v1',
          data: {
            lastId: this.lastId,
            page: this.page,
          }
        }).then(res => {
            if(res.success){
                this.list = res.data.list
            }
        })
    },
    methods: {
        select (index,item) {
            if(this.active == index){
                this.active = ''
            }else{
                this.active = index
                this.$router.push({path: 'extract',query:{address: item.address,usdt: this.usdt}})
            }
        }
    }
}
</script>
<style lang="less" scoped>
  .van-nav-bar{
    background: #0D0900;
    color: #fff;
  }
  .van-nav-bar__title{
    color: #fff;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }

    #address{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .box{
            flex: 1;
            padding-top: 10px;
            overflow: scroll;
            background: #0D0900;
            li{
                height: 60px;
                background: #1D1C3B;
                margin-bottom: 10px;
                padding: 10px 16px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .info{
                    p{
                        padding: 0;
                        margin: 0;
                      color: #fff;
                    }
                    flex: 1;
                    height: 100%;
                }
                .img{
                    width: 20px;
                    height: 20px;
                    background: url('../../../static/images/index/select.png');
                    background-size: 100% 100%;

                }
            }
            .active{
                .img{
                    width: 20px;
                    height: 20px;
                    background: url('../../../static/images/index/active.png');
                    background-size: 100% 100%;

                }
            }
        }
    }
</style>
