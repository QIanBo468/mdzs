<template>
    <div class='noticeDetails'>
        <van-nav-bar
            title="公告"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class='box'>
            <div class='title'> 
                {{obj.title}}
            </div>
            <div class='remarks'>{{obj.time}}</div>
            <div v-html="obj.content" style="font-size: 14px;width: 343px;color:rgba(102,102,102,1);margin: 0 auto;line-height:30px;text-indent: 2em;letter-spacing: .6px">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            obj: {},
        }
    },
    created () {
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Content",
            interface: "3001",
            data: {id: this.$route.query.id}
        }).then(res => {
            this.obj = res.data
        })
    },
    methods : {
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
    .noticeDetails{
        img{
            width: 100%;
            overflow: hidden;
        }
    }
</style>
<style lang="less" scoped>
    .noticeDetails{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .box{
            flex: 1;
            overflow: scroll;
            border-top: 10px solid #f6f6f6;
            padding: 10px 16px 0;
            
            .title{
                font-size: 14px;
                font-weight: 600;
                text-align: center;
                color: #333333;
                height: 21px;
                line-height: 21px;
                margin-bottom: 5px;
            }
            .remarks{
                font-size: 12px;
                color: #999;
                text-align: right;
                margin-bottom: 5px;
            }
        }
    }
</style>