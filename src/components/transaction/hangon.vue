<template>
    <div>
        <div class="bothse">
            <trannav title="挂买" :leftj="true" ></trannav>
            <div class="cont">
                <div class="contmodule">
                    <div>挂买数量</div>
                    <input type="number" v-model="uploaddata.num" placeholder="请输入挂买数量">
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'hangon',
    data(){
        return {
            uploaddata:{
                num:''
            }
        }
    },
    methods:{
        
    },
    components:{

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
.cont{
    padding:0 16px;
}
.contmodule{
    padding:20px 0 0;
    div{
       
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
        
    }
    input{
        height:40px;
        background:#0D2179; 
        border-radius:4px;
        border:none;
    }
}
</style>