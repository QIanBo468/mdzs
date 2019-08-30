<template>
    <div>
        <div class="bothse">
            <gbuy v-if="gstate == 0"></gbuy>
            <gmai v-if="gstate == 1"></gmai>
        </div>
    </div>
</template>

<script>
import gbuy from '@/components/template/gua/gbuy';
import gmai from '@/components/template/gua/gmai';
export default {
    name:'hangon',
    data(){
        return {
          gstate: 1 ,//0 挂买  1挂卖
        }
    },
    methods:{
        
    },
    components:{
        gbuy,
        gmai
    }
}
</script>

<style lang="less" scoped>
.bothse{
    box-sizing: border-box;
    height: 100vh;
    padding:44px 0 36px;
    border: 1px solid transparent;
    background:rgba(0,22,114,1);
    a{
        display: block;
    }
}  

</style>