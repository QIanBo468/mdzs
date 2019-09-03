<template>
    <div >
        <trannav title="交易详情" :leftj="true" ></trannav>
        <div class="bothse">
            <marketxinxi :title='0'></marketxinxi>
            <router-link to="/payment" ><div class="buyin">买入</div></router-link>
        </div>
       
        
    </div>
</template>

<script>
import marketxinxi from '@/components/template/marketxinxi/marketxinxi';
export default {
    name:'marketxq',
    data(){
        return {
           
        }
    },
    methods:{

    },
    components:{
        marketxinxi
    }   
}
</script>

<style lang="less" scoped>
.bothse{
    padding:40px 0 36px;
    border: 1px solid transparent;
    background:rgba(0,22,114,1);
    a{
        display: block;
    }
} 
.buyin{
    margin:115px 16px 0;
    line-height: 44px;
    border-radius:20px;
    background:linear-gradient(180deg,#44A5D8 0%,#276CD4 100%);
    opacity:0.79;
    text-align: center;
    color:#fff;
}
</style>