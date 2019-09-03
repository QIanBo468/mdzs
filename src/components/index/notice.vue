<template>
    <div id='notice'>
        <van-nav-bar
            title="公告"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="noticeList">
            <router-link :to="{ path: '/noticeDetails', query: { id: item.id}}"  v-for="(item, index) in noticeList" :key='index'>
                <ul>
                    <li>{{item.title}}</li>
                    <li></li>
                </ul>
                <div>
                    <img src="../../../static/images/index/more.png" alt="">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            noticeList: []
        }
    },
    created () {
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Content",
            interface: "3000",
            data: {lastId: 0,page: 1}
        }).then(res => {
            this.noticeList = res.data.list
        })
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.overText{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
    #notice{
        width: 100%;
        height: 100%;
        background: #F8F8F8;
        .noticeList a{
            height: 63px;
            display: flex;
            // line-height: 63px;
            background: #fff;
            margin-top: 10px;
            padding: 10px 16px;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            ul{
                width: 260px;
                height: 100%;
                li{
                    font-size: 14px;
                    color: #666666;
                    height: 20px;
                    line-height: 20px;
                    .overText
                }
                li:last-child{
                    font-size: 12px;
                    color: #999999;
                    height: 17px;
                    margin-top: 5px;
                    line-height: 17px;
                }
            }
            div{
                width: 22px;
                img{
                    width: 22px;
                    height: 22px;
                }
            }
        }
    }
</style>