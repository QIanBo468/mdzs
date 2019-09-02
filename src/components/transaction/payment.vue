<template>
    <div>
        <div class="bothse">
            <trannav title="付款" :leftj="true" ></trannav>
            <marketxinxi :title='1' :state="state" @imgshow='imgshow'></marketxinxi>
            <div class="buyin" v-if="state"  @click="qdfu">确认付款</div>
            <div class="buyins" v-else>
                <div @click="qued">确认</div>
                <div>投诉</div>
            </div>
        </div>

        <van-popup v-model="show">
            <div class="tan"><img :src="tu" alt=""></div>
            <div class="quxiao" @click="show =false"><img src="../../../static/images/icon/quxiao.png" alt=""></div>
        </van-popup>
       

        
        
    </div>
</template>

<script>
import marketxinxi from '@/components/template/marketxinxi/marketxinxi';

export default {
    name:'payment',
    data(){
        return{
            state:true ,//状态
            show:false,//弹框显隐
            tu:'',//弹出显示的图片
        }
    },
    methods:{
        //查看图片
        imgshow(val){
            console.log(val);

            this.tu = val;
            this.show = true
        },
        // 确实付款
        qdfu(){
            this.state =!this.state
        },
        //点击确定
        qued(){
            this.$dialog.alert({
                message: '提交成功，等待卖家确认！'
            }).then(() => {
            // on close
            });
        }
    },
    components:{
        marketxinxi
    }
}
</script>

<style lang="less" scoped>
.van-popup--center {
    background: #040A24;
    overflow: hidden;
}
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
.buyins{

    margin:115px 16px 0;
    line-height: 44px;
    text-align: center;
    color:#fff;
    display: flex;
    justify-content: space-between;
    div{
        &:first-child{    
            width:162px;
            border-radius:22px;
            background:linear-gradient(180deg,#44A5D8 0%,#276CD4 100%);
            opacity:0.79;
        }
        &:last-child{
            width:162px;
            background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
            border-radius:22px;
            opacity:0.79;
        }    
    }
}
.tan{
    width:280px;
    height:386px;   
    background: #fff;
    img{
        width:280px;
        height:386px; 
    }   
}
.quxiao{
    width: 36px;
    height: 36px;
    margin:16px auto 0;
    img{
        width: 36px;
        height:36px;
    }
}

</style>