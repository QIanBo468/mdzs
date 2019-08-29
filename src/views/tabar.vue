<template>
    <div id='tabBar' title='title' :class="isborder ? 'border' : '' ">
        <img src="../../../static/rollback.png" alt="" @click="rollback">
        <!-- {{title}} -->
        <slot name="title"></slot>
        <slot name='right'></slot>
    </div>
</template>
<script>
export default {
    data () {
        return {
        }
    },
    props: {
        title: String,
        isborder: {
            type: String,
        }
    },
    methods: {
        rollback() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less" scoped>
    #tabBar{
        // width: 100%;
        padding: 0 .6rem;
        line-height: .96rem;
        height: .96rem;
        position: relative;
        text-align: center;
        font-size: .36rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(15,15,15,1);
        opacity:1;
        img{
            width: .48rem;
            height: .48rem;
            position: absolute;
            bottom: .2rem;
            left: .16rem;
        }
    }
    .border{
        border-bottom: .01rem solid #E6E6E6;
    }
</style>