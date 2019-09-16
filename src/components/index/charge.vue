<template>
    <div id='charge'>
        <van-nav-bar
            title="充币"
            right-text="充币记录"
            left-arrow
            :border="false"
            @click-left='$router.go(-1)'
            @click-right= '$router.push("/topUp")'
        />
        <div class='chargeBox'>
            <div>
                <img src="../../../static/images/index/usdt.png">usdt
            </div>
            <img class='img' :src="obj.qrCode" alt="">
            <div class='encoding'>{{obj.address}}</div>
            <div class='btn tag-read' @click='copy' :data-clipboard-text="obj.address" >复制钱包地址</div>
            <div class="remark">注：此地址只接受usdt，发送其他币种到此地址将不可找回！</div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard'; 
import { Toast } from 'vant'
export default {
    data () {
        return {
            obj: {},
        }
    },
    created () {
        this.$axios.fetchPost('/portal/digiccy',
        {
            source: "web",
            version: "v1",
            module: "Wallet",
            interface: "2004",
            data: {}
        }).then(res => {
            if(res.success) {
                this.obj = res.data
            }else{
                // Toast(res.mes)
            }
        })
    },
    methods: {
        copy() {
            console.log(233)
            var clipboard = new Clipboard('.tag-read') 
            clipboard.on('success', e => {  
                Toast("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
                    // 释放内存  
                    clipboard.destroy()  
                    })  
                    clipboard.on('error', e => {  
                    // 不支持复制  
                    Toast('该浏览器不支持自动复制')  
                    // 释放内存  
                    clipboard.destroy()  
                    })  
        }
    }
}
</script>
<style lang="less" scoped>
    .chargeBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .img{
            width: 110px;
            height: 110px;
            margin-bottom: 28px;
        }
        div:first-child{
            margin: 40px auto 30px;
            display: flex;
            align-items: center;
            font-size: 22px;
            color: #F84D4D;
            img{
                margin-right: 10px;
                width: 27px;
                height: 27px;
            }
        }
        .encoding{
            font-size: 14px;
            color: #333;
        }
        .btn{
            width: 110px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            color: #fff;
            border-radius: 22px;
            // background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
            background: #FC5461;
            margin: 10px auto 50px;
        }
        .remark{
            margin: 0px auto 0px;
            color: #999999;
            font-size: 12px;
            text-align: center;
            font-size: 12px;
            width: 325px;
        }

    }
</style>