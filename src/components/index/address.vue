<template>
    <div id='address'>
        <van-nav-bar
            title="地址本"
            left-arrow
            :border="false"
        />
        <ul class='box'>
            <li @click='select(1)' :class='active === 1? "active": ""'>
                <div class='info'>
                    <p>王小闹</p>
                    <p>sjdhffkj27364829hdjkfhfkdj</p>
                </div>
                <div class='img'>

                </div>
            </li>
            <li @click='select(2)' :class='active === 2? "active": ""'>
                <div class='info'>
                    <p>王小闹</p>
                    <p>sjdhffkj27364829hdjkfhfkdj</p>
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
        }
    },
    methods: {
        select (index) {
            console.log(this.active == index)
            if(this.active == index){
                this.active = ''
            }else{
                this.active = index
            }
            // this.imgSrc = ''
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