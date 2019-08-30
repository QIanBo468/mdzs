<template>
    <div>
        <trannav title="挂买" :leftj="true" ></trannav>
        <div class="cont">
                <div class="contmodule">
                    <div>挂买数量</div>
                    <input type="number" v-model="uploaddata.num" placeholder="请输入挂买数量">
                </div>
                <div class="contmodule">
                    <div>挂买售价</div>
                    <input type="number" v-model="uploaddata.price" placeholder="请输入售价">
                </div>
                <div class="contmodule">
                    <div>交易密码</div>
                    <input type="password" v-model="uploaddata.mm" placeholder="请输入交易密码">
                </div>
                <div class="queding">确定</div>
            </div>
    </div>
</template>

<script>
export default {
    name:'gbuy',
    data(){
        return{
            uploaddata:{
                num:'',
                price:'',
                mm:''
            }
        }
    },
    methods:{

    },
    components:{}
}
</script>

<style lang="less" scoped>
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
        width:100%;
        box-sizing: border-box;
        padding-left:10px;
        font-size:14px;
        font-weight:400;
        margin-top:10px;
        color:#fff;
    }

}
input::-webkit-input-placeholder{
    color:rgba(199,199,204,1);
}    /* 使用webkit内核的浏览器 */
:-moz-placeholder{
    color:rgba(199,199,204,1);
}                  /* Firefox版本4-18 */
::-moz-placeholder{
    color:rgba(199,199,204,1);
}                  /* Firefox版本19+ */
:-ms-input-placeholder{
    color:rgba(199,199,204,1);
} 
.queding{
    margin-top: 85px;
    line-height:40px;
    text-align: center;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
    border-radius:22px;
}     
</style>