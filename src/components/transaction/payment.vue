<template>
    <div>
        <div class="bothse">
            <trannav title="付款" :leftj="true" ></trannav>
            <marketxinxi :title='1' :state='state'  ref="dianji" @imgshow='imgshow' :bothdata="bothdata"></marketxinxi>
            <div class="buyin" v-if="state"  @click="qdfu">确认付款</div>
            <div class="buyins" v-else>
                <div @click="qued">确认</div>
                <div @click="tousu">投诉</div>
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

            id:'',//传来的id
            bothdata:{},//详情里的数据
        }
    },
    created(){
        this.id = this.$route.query.id;
        // if( this.$route.query.states == true){
        //     this.state = true;
        //     this.getxq();
        // }else{
        //     this.state = false;
        //     this.getjyxq()
        // }   
        if( this.$route.query.states == false){
            this.state = false;
            this.getjyxq()   //交易详情
        }else{
            this.state = true;
            this.getxq();   //数据详情（买入里的）
        }

      
    },
    methods:{
        // 获取交易详情
        getjyxq(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "6001",
                module: "User",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }

            })
            .then(res=>{
                console.log('详情',res.data)
                if(res.code == 0){  
                    _this.bothdata = res.data
                    console.log( _this.state)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        //获取数据详情
        getxq(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "1003",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }

            })
            .then(res=>{
                // console.log('详情',res.data)
                if(res.code == 0){  
                    _this.bothdata = res.data
                    console.log( _this.state)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },




        //查看图片
        imgshow(val){
            console.log(val);

            this.tu = val;
            this.show = true
        },
        // 确实付款
        qdfu(){
            this.$refs.dianji.upqd();
        },
        //确认付款后的确认
        changefuk(){
             this.state =!this.state;
        },
        //点击确定
        qued(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "1005",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }
            })
            .then(res=>{
                if(res.code == 0){
                    this.$dialog.alert({
                        message: res.message
                    }).then(() => {});
                }else if(res.code == 4800 ){
                    _this.$toast(res.message)
                }
            })
        },
        //点击投诉
        tousu(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "1006",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }
            })
            .then(res=>{
                console.log('点击投诉',res)
                if(res.code == 0){
                    _this.$toast(res.message)
                }else if(res.code == 4800 ){
                    _this.$toast(res.message)
                }
            })
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