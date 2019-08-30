<template>
    <div >
        <!-- <trannav title="交易详情" :leftj="true" v-if="title == 0"></trannav> -->
        <!-- <trannav title="付款" :leftj="true" v-if="title == 1"></trannav> -->
        <div class="marketmod markettop">
            <div class="list_model first_div">
                <div>单号：93849384</div>
                <div>匹配中</div>
            </div>
            <div class="list_model">
                <div>交易数量</div>
                <div>900</div>
            </div>

            <div class="list_model">
                <div>单价</div>
                <div>0.2CNY</div>
            </div>

            <div class="list_model maijia">
                <div>售价</div>
                <div>2000CNY</div>
            </div>
        </div>
        <!-- 卖家信息 -->
        <div class="marketmod">
            <div class="list_model">
                <div>卖家昵称</div>
                <div>奔跑的小野兔</div>
            </div>

            <div class="list_model">
                <div>卖家手机号</div>
                <div>18374637463</div>
            </div>
        </div>
        <!-- 卖家账号 -->
        <div class="marketmod lastdiv">
            <div class="maihome">卖家账号</div>
            
            <div class="xincont">
                <div class="contimg"><img src="/static/images/icon/weixin.png" alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：张小闹</div>
                    <div>账号：283947299</div>
                    <div>账号类型：微信支付</div>
                    <div v-if="title == 1" class="zfphoto"><img src="" alt=""></div>
                </div>
            </div>
            <div class="xincont">
                <div class="contimg"><img src="/static/images/icon/zhifubao.png" alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：张小闹</div>
                    <div>账号：283947299</div>
                    <div>账号类型：微信支付</div>
                    <div v-if="title == 1" class="zfphoto"><img src="" alt=""></div>
                </div>
            </div>
            <div class="xincont">
                <div class="contimg"><img src="/static/images/icon/yinhangka.png" alt=""></div>
                <div class="cont_ent">
                    <div>账号名称：张小闹</div>
                    <div>账号：2839******47299</div>
                    <div>账号类型：中国工商银行</div>
                </div>
            </div>

            <div class="lookmore">查看更多</div>
            <!-- <div class="buyin" v-if="title == 0">买入</div> -->
            
        </div>
        <!-- 买家信息 -->
            <div class="marketmod"  v-if="title == 1">
                <div class="list_model">
                    <div>买家昵称</div>
                    <div>奔跑的小野兔</div>
                </div>

                <div class="list_model">
                    <div>买家手机号</div>
                    <div>18374637463</div>
                </div>
            </div>
        <!-- 上传支付凭证 -->
        <div class="uploadpz" v-if="title == 1">
            <div>上传支付凭证</div>
            <div><van-uploader v-model="fileList" multiple preview-size="100" /></div>
        </div>
        <!-- 交易密码 -->
        <div class="transmm" v-if="title == 1 && state ==true">
            <div>交易密码</div>
            <input type="password" placeholder="请输入交易密码" />>
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
            default: true, //0 交易详情 1 付款
        }
    },
    data(){
        return {
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                // { url: 'https://cloud-image', isImage: true }
            ]
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
</style>