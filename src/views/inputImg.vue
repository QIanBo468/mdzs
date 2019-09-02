<template>
    <div id='input'>
        <input type="text" v-model="val" :placeholder="placeholder">
        <slot name='right'>
        </slot>
    </div>
</template>
<script>
export default {
    name: 'InputImg',
    data () {
        return {
            val: this.value,
        }
    },
    watch : {
        val () {
            this.$emit('changeInp',this.val)
        }
    },
    props: [ 'value', 'placeholder'],
    methods: {

    }
}
</script>
<style lang="less" scoped>
    #input{
        width: 100%;
        height: 100%;
        display: flex;
        border: 1px solid #D8D8D8;
        padding: 8px;
        box-sizing: border-box;
        justify-content: space-between;
        border-radius:4px;
        font-size: 14px;
        input{
            // height: 20px;
            flex: 1;
            border: 0;
            font-size: 14px;
        }
        img{
            width: 17px;
            height: 20px;
        }
        // span{
        //     display: table-cell;
        //     vertical-align:middle
        // }
    }
</style>