<template>
    <div id='marketxinxi'>
        <!-- <trannav title="交易详情" :leftj="true" v-if="title == 0"></trannav> -->
        <!-- <trannav title="付款" :leftj="true" v-if="title == 1"></trannav> -->
        <div class="marketmod markettop" v-if="bothdata">
            <div class="list_model first_div">
                <div>单号：{{bothdata.orderNo}}</div>
                <div>{{bothdata.offerChinese}}</div>
            </div>
            <div class="list_model">
                <div>交易数量</div>
                <div>{{bothdata.num}}</div>
            </div>

            <div class="list_model">
                <div>单价</div>
                <div>{{bothdata.unitPrice}}</div>
            </div>

            <div class="list_model maijia">
                <div>售价</div>
                <div>{{bothdata.price}}</div>
            </div>
        </div>
        <!-- 卖家信息 -->
        <div class="marketmod" v-if="bothdata.seller">
            <div class="list_model">
                <div>卖家昵称</div>
                <div>{{bothdata.seller.nickname}}</div>
            </div>

            <div class="list_model">
                <div>卖家手机号</div>
                <div>{{bothdata.seller.account}}</div>
            </div>
        </div>
        <!-- 卖家账号 -->
        <div class="marketmod lastdiv">
            <div class="maihome">卖家账号</div>
            
            <div class="xincont" v-if="islooks == true? index<3:true " v-for="(item,index) in bothdata.payment" :key="index">
                <div class="contimg"><img :src="item.type == 1? fubao:item.type == 2? wx:yh " alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：{{item.realName}}</div>
                    <div>账号：{{item.account}}</div>
                    <div>账号类型：{{item.typeName}}</div>
                    <div v-if="item.type == 0">账号类型：{{item.bankName}}</div>
                    <div @click="$emit('imgshow',item.qrCode)" v-if="title == 1&& item.qrCode !=null" class="zfphoto"><img :src="item.qrCode" alt=""></div>
                </div>
            </div>
            <!-- <div class="xincont">
                <div class="contimg"><img src="/static/images/icon/zhifubao.png" alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：张小闹</div>
                    <div>账号：283947299</div>
                    <div>账号类型：支付宝支付</div>
                    <div @click="$emit('imgshow','http://mapopen-pub-webserviceapi.bj.bcebos.com/images/direction.png')"  v-if="title == 1" class="zfphoto"><img src="http://mapopen-pub-webserviceapi.bj.bcebos.com/images/direction.png" alt=""></div>
                </div>
            </div>
            <div class="xincont">
                <div class="contimg"><img src="/static/images/icon/yinhangka.png" alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：张小闹</div>
                    <div>账号：2839******47299</div>
                    <div>账号类型：中国工商银行</div>
                </div>
            </div> -->

            <div class="lookmore" v-if="islook" @click="qiehuanlook">查看更多</div>
            <!-- <div class="buyin" v-if="title == 0">买入</div> -->
            
        </div>
        <!-- 买家信息 -->
            <div class="marketmod"  v-if="title == 1&& bothdata.buyer">
                <div class="list_model">
                    <div>买家昵称</div>
                    <div>{{bothdata.buyer.nickname}}</div>
                </div>

                <div class="list_model">
                    <div>买家手机号</div>
                    <div>{{bothdata.buyer.mobile}}</div>
                </div>
            </div>
        <!-- 上传支付凭证 -->
        <div class="uploadpz" v-if="title == 1">
            <div>上传支付凭证</div>
            <div v-if="state"><van-uploader v-model="fileList" multiple preview-size="100" :max-count="1" :after-read="afterRead" /></div>
            <div v-if="chuan.voucher!=''&&state!=true"><img  :src="chuan.voucher" alt=""></div>
            <div v-if="bothdata.transactionLog&&state!=true"><img :src="bothdata.transactionLog.voucher" alt=""></div>
        </div>
        <!-- 交易密码 -->
        <div class="transmm" v-if="title == 1 && state ==true">
            <div>交易密码</div>
            <input type="password" v-model="chuan.safeword" placeholder="请输入交易密码" />
        </div>
        
        <van-overlay  :show="show" />
        <div class="share" v-if="show">
             <van-loading class="quzhong" color="#fff" size="50" />
        </div> 
        
       
    </div>
</template>

<script>
export default {
    name:'marketxinxi',
    props:{
        title:{
            type:Number,
            default: 0 , //0 交易详情 1 付款
        },
        state:{
            type:Boolean,
            default: true, //true  需要输入交易密码
        },
        islook:false,//true显示，false不显示
        bothdata:{
            type:Object,
            default(){
                return {}
            } ,//获得的详情
        },
        islook:{
            type:Boolean,
            default:true
        }
    },

    data(){
        return {
            wx:'.../../static/images/icon/weixin.png',
            fubao:'.../../static/images/icon/zhifubao.png',
            yh:'.../../static/images/icon/yinhangka.png',
            fileList: [ ],
            chuan:{
                id:'',
                voucher:'',
                safeword:'',
            },
            islooks:true,
            show:false,
        }
    },
    created(){
        
    },
    mounted(){
   
        
    },
    destroyed(){
        Object.assign(this.$data.chuan,this.$options.data().chuan)
    },
    methods:{
        // 切换look
        qiehuanlook(){
            this.islooks = false
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file.file);
            let cont = new FormData();
            cont.append('file',file.file)
            this.show = true;
            var _this = this;

            _this.$axios.fetchPost('/upload', cont)
            .then(res=>{
                
                console.log('图片上传',res)
                if(res.code == 0){
                    let ss={
                        url:res.data.file
                    }
                    _this.chuan.voucher = res.data.file;
                    _this.chuan.id = _this.bothdata.id
                    _this.show = false;
                    
                }else{
                    _this.$dialog.confirm({
                        title: '',
                        showCancelButton:false,
                        message: '上传失败，请重新上传'
                        }).then(() => {
                        // on confirm
                            _this.fileList = [];
                            _this.show = false;
                        })
                     _this.$toast(res.message)
                }
            })
        },

        // 需提交的 方法
        upqd(){
            var _this = this;
            if(_this.chuan.voucher == ''){
                _this.$toast('请上传支付凭证');
                return false;
            }else if(_this.chuan.safeword == ''){
                _this.$toast('请输入支付密码');
                return false;
            }else if(_this.chuan.safeword.length != 6){
                this.$toast('安全密码必须由 6 位数字组成');
                return false
            }
            _this.$axios.fetchPost('/portal',{
                interface: "1008",
                module: "Attachment",
                source: "web",
                version: "v1",
                data:_this.chuan
            })
            .then(res=>{
                console.log('提交的方法',res);
                if(res.code == 0){
                    _this.$toast(res.message);
                    setTimeout(()=>{
                        _this.$parent.changefuk()
                    },1200)
                }else if(res.code >= 4800 && res.code < 4900 ){
                    _this.$toast(res.message)
                }
            })
        }
    },
    components:{

    }
}
</script>

<style lang="less" scoped>
.bothse{
    height:100vh;
    background:rgba(0,22,114,1);
} 
.marketmod{
    margin :10px 0 0;
    background:#0D2179; 
    
    padding:0 16px;
}

    .list_model{
        height:40px;
        box-shadow:0px 0px 0px 0px rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .first_div{
        box-shadow:0px 0px 0px 0px rgba(255,255,255,0.1);
        border-bottom: 1px solid #253786;
        div:first-child{
            color:rgba(216,216,216,1);
        }
        div:last-child{
            color:rgba(254,128,0,1);
        }
    }
    .maijia{
        color:rgba(248,77,77,1);
    }
.lastdiv{
    padding:20px 16px 36px;
    background:#0D2179; 
}
.maihome{
    font-size:16px;
    font-weight:500;
    margin:0 0 10px;
    color:rgba(255,255,255,1);
}
.xincont{
    margin:0 0 20px;
    display:flex;

    .contimg{
        width: 44px;
        height:44px;
        margin-right:20px;
        img{
            width: 44px;
            height:44px;
        }
    }
    .cont_ent{
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:20px;
    }
}
.lookmore{
    padding:0 60px ;
    font-size:12px;
    font-weight:400;
    color:rgba(216,216,216,1);
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
.zfphoto{
    width: 100px;
    height:158px;
    margin: 10px 0 0 0;
    background:#999;
    img{
        width: 100px;
        height:158px;
        display: block;
    }
}
.uploadpz{
    margin-top:10px;
    background:#0D2179; 
    padding:20px 16px;
    div{
        &:first-child{
            margin-bottom: 20px;
            font-size:16px;
            font-weight:500;
            color:rgba(255,255,255,1);
        }
        &:last-child{
            width: 100px;
            height: 100px;
            // background:#999;
            img{
                width: 100px;
                height: 100px;
            }
        }
    }
}
.transmm{
    margin-top:10px;
    padding:0 16px;
    height:44px;
    align-items:center;
    display: flex;
    background:#0D2179;

    div{
        &:first-child{
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin-right:20px;
        }
        
    }
    input{
        border:none;
        background:#0D2179;
        font-size:14px;
        font-weight:400;
        color:#fff;
    }
}
.share{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 99;
    // background:rgba(0,0,0,0.5);
   
}
.quzhong{
    position: fixed;
    top:45%;
    left:45%;
}
</style>
<style>
#marketxinxi .van-uploader__upload{
    background:#0D2179!important;
}    
</style>