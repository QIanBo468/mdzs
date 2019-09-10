<template>
    <div class="htmlBox">
        <div>
        <trannav title="交易详情" :leftj="true" :teshu='1'></trannav>
        <div class="bothse">
            <marketxinxi :title='0' :bothdata="bothdata"></marketxinxi>
            <div class="buyin" @click='submit'>买入</div>
            <!-- <router-link :to="'/payment?id='+id" ></router-link> -->
        </div>
       </div>
        
    </div>
</template>

<script>
import marketxinxi from '@/components/template/marketxinxi/marketxinxi';
export default {
    name:'marketxq',
    data(){
        return {
            id:'',//传来的id
            bothdata:{},//详情里的数据
        }
    },
    created(){
        this.id = this.$route.query.id;
        this.getxq();
    },
    methods:{
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
                    console.log( _this.bothdata)
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        submit() {
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "1004",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:{
                    id:_this.id
                }

            }).then(res => {
                _this.$router.push({path:'/payment',query:{id: _this.id}})
            })
        }
    },
    components:{
        marketxinxi
    }   
}
</script>

<style lang="less" scoped>
.htmlBox{
    border:1px solid red;
    height: 100%;
    background:rgba(0,22,114,1);
}
.bothse{
    // height: 100vh;
    box-sizing: border-box;
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