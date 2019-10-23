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
          gstate: 0 ,//0 挂买  1挂卖
        }
    },
    created(){
       this.gstate = this.$route.query.gstate
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
    background:#0B0C21;
    a{
        display: block;
    }
}  

</style>