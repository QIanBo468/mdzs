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
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
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
        }
    },
    created() {
        this.usdt = this.$route.query.usdt
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "User",
            interface: "8000",
            data: {}
        }).then(res => {
            if(res.success){
                this.list = res.data
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
            background: #F8F8F8;
            li{
                height: 60px;
                background: #fff;
                margin-bottom: 10px;
                padding: 10px 16px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .info{
                    p{
                        padding: 0;
                        margin: 0;
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