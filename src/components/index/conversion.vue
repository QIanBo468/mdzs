<template>
    <div id='conversion'>
         <van-nav-bar
            title="兑换记录"
            left-arrow
            :border="false"
        />
        <div class='box'>
            <div class='record' v-for='item in 4' :key='item'>
                <div class='status'>兑换中</div>
                <ul>
                    <li>
                        <div>会员ID</div>
                        <div>2387489273</div>
                    </li>
                    <li>
                        <div>提交时间</div>
                        <div>2019.08.12 14:12:12</div>
                    </li>
                    <li>
                        <div>钱包类型</div>
                        <div>usde</div>
                    </li>
                    <li>
                        <div>手续费</div>
                        <div>20.70000000usdt</div>
                    </li>
                    <li>
                        <div>转账数量</div>
                        <div class='red'>2019.08.12 14:12:12</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    #conversion{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f8f8f8;
        .box{
            padding: 16px;
            overflow: scroll;
            .record{
                padding: 20px;
                border-radius: 6px;
                background: #fff;
                margin-bottom: 10px;
                .status{
                    font-size: 12px;
                    text-align: right;
                    color: #F84D4D;
                    margin-bottom: 10px;
                }
                .red{
                    color: #F84D4D;
                }
                ul li{
                    height: 17px;
                    line-height: 17px;
                    font-size: 12px;
                    display: flex;
                    margin-bottom: 5px;
                    div:first-child{
                        width: 60px;
                        color: #666666;
                        margin-right: 35px;
                    }
                    div:last-child{
                        width: 70%;
                    }
                }
                li:last-child{
                    margin-bottom: 0px;
                }
            }
        }
    }
</style>