<template>
    <div id='charge'>
        <van-nav-bar
            title="充币"
            left-arrow
            :border="false"
        />
        <div class='chargeBox'>
            <div>
                <img src="../../../static/images/index/usdt.png">usdt
            </div>
            <img class='img' src="../../../static/images/index/business.png" alt="">
            <div class='encoding'>djfhdjhshsjdkkfhskshdwuwudhhfkk</div>
            <div class='btn'>复制钱包地址</div>
            <div class="remark">注：此地址只接受usdt，发送其他币种到此地址将不可找回！</div>
        </div>
    </div>
</template>
<script>
export default {
    
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
            // background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(231,17,34,1) 100%);
            background: #FC5461;
            margin: 10px auto 50px;
        }
        .remark{
            color: #999999;
            font-size: 12px;

        }

    }
</style>