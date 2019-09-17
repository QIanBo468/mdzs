<template>
    <div>
        <trannav title="挂买" :leftj="true" ></trannav>
        <div class="cont">
                <div class="contmodule">
                    <div><span>挂买数量</span></div>
                    <input type="number" v-model="uploaddata.num" placeholder="请输入挂买数量">
                </div>
                <div class="contmodule">
                    <div><span>挂买单价</span></div>
                    <input type="number" v-model="uploaddata.price" placeholder="请输入售价">
                </div>
                <div class="contmodule">
                    <div>交易密码</div>
                    <input type="password" v-model="uploaddata.mm" placeholder="请输入交易密码">
                </div>
                
                <div class="contmodule">
                    <div><span>挂买总价</span><span>{{bothprice}}CNY</span></div>
                </div>

                <div class="queding" @click="yesbuy()">确定</div>
            </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    name:'gbuy',
    data(){
        return{
            uploaddata:{
                num:'',
                price:'',
                mm:''
            },
            ofc:'0',//ofc
            price:'',//最低售价
            bothprice:'0.00',//总价CNY
        }
    },
    created(){
        this.getofc()
    },
    computed:{
        suannum(){
            return this.uploaddata.num
        },
        suanprice(){
            return this.uploaddata.price
        }
    },
    watch:{
        suannum(val){
            console.log(val)
            this.bothprice = val * this.uploaddata.price
        },
        suanprice(val){
            this.bothprice = val * this.uploaddata.num
        }
    },
    methods:{
            //获取ofc数量
        getofc(){
            var _this = this;
            _this.$axios.fetchPost('/portal',{
                interface: "4003",
                module: "Finance",
                source: "web",
                version: "v1",
                data:{}
            })
            .then(res =>{
                console.log('ofc',res)
                if(res.code == 0){
                    _this.ofc = res.data.ofc.have
                    _this.price = res.data.price.have
                }else if(res.code == 4800){
                    _this.$toast(res.message)
                }
            })
        },
        // 点击确定
        yesbuy(){

            var _this = this;
            let is_int = /^[0-9]*[1-9][0-9]*$/;
            if(_this.uploaddata.num == ''){
                _this.$toast('请输入挂买数量');
                return false;
            }else if(_this.uploaddata.num == 0){
                _this.$toast('挂买数量不为0');
                return false;
            }else if(is_int.test(_this.uploaddata.num) == false){
                _this.$toast('挂买数量应为整数');
                return false;
            }else if(_this.uploaddata.price == ''){
                _this.$toast('请输入售价');
                return false;
            }else if(_this.uploaddata.mm == ''){
                _this.$toast('请输入交易密码');
                return false;
            }else if(_this.uploaddata.mm.length != 6){
                _this.$toast('安全密码必须由 6 位数字组成');
                return false
            }

            let data={
                status:0,
                num :  _this.uploaddata.num,
                price : _this.uploaddata.price,
                safeword : _this.uploaddata.mm
            };
            // data.status = 0;
            // data.num = _this.uploaddata.num;
            // data.price = _this.uploaddata.price;
            // data.safeword = _this.uploaddata.safeword;
            _this.$axios.fetchPost('/portal',{
                interface: "1001",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:data
            })
            .then(res=>{
                console.log('挂买',res)
                if(res.code == 0){
                    _this.$toast(res.message)
                    setTimeout(()=>{
                        Object.assign(_this.$data.uploaddata,_this.$options.data().uploaddata)
                        _this.getofc()
                    },1300)
                }else if(res.code >= 4800 && res.code < 4900){
                    _this.$toast(res.message)
                }
            })
        }
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
        &:first-child{
            display: flex;
            justify-content: space-between;
            span{
                display: block;
            }
        }
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