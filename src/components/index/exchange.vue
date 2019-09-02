<template>
    <div id='extract'>
        <van-nav-bar
        title="兑换"
        right-text="兑换记录"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class='box'>
            <div class='usdt'>
                <img src="../../../static/images/index/ofc.png" alt="">
                ofc
            </div>
            <div class='money'>
                123845.00000000
            </div>
            <div class='title'>
                兑换数量
            </div>
            <InputImg style="width: 343px;height: 40px;margin: 0 auto" :placeholder='placeNum' :value='user' >
            </InputImg>
            <div class='remarks'>
                备注：ofc兑换usdt比例为1：1
            </div>
            <div class='cell'>
                <div>手续费</div>
                <div>5%usdt</div>
            </div>
            <div class='cell'>
                <div>爱心基金</div>
                <div>5%usdt</div>
            </div>
            <div class="cell">
                <div>实际到账</div>
                <div>0usdt</div>
            </div>
            <div class='btn' @click='submit'>
                兑换
            </div>
        </div>
    </div>
</template>
<script>
import { Toast,Dialog } from 'vant'
import InputImg from '../../views/inputImg'
export default {
    data () {
        return {
            user: '',
            InputImg: '../../../static/images/index/user.png',
            placeNum: '请输入兑换数量',
        }
    },
    methods : {
        onClickLeft () {
        },
        submit () {
            Dialog.alert({
                title: '提示',
                message: '提交成功，等待客服处理！'
            })
        }
    },
    components: {
        InputImg
    }
}
</script>
<style lang="less" scoped>
    #extract{
        width: 100%;
        .box{
            // width: 100%;
            padding: 0 16px;
            margin: 0 auto;
            border-top: 10px solid #f8f8f8;
            .title{
                font-size: 14px;
                color: #666;
                height: 20px;
                line-height: 20px;
                margin:  10px 0;
            }
            .usdt{
                margin-top: 30px;
                height: 27px;
                display: flex;
                justify-content: center;
                font-size: 22px;
                color: #F84D4D;
                align-items: center;
                img{
                    margin-right: 10px;
                    height: 22px;
                    width: 22px;
                }
            }
            .remarks{
                font-size: 12px;
                margin: 5px 0 40px;
                color: #666;
            }
            .money{
                text-align: center;
                height: 32px;
                line-height: 32px;
                width: 343px;
                font-size: 23px;
                color: #333;
                margin: 5px auto 38px;
            }
            
            .cell{
                height: 18px;
                line-height: 18px;
                color: #666;
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                div{
                    width: 30%;
                }
                div:last-child{
                    text-align: right;
                }
            }
            .btn{
                margin-top: 60px;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
            }
            .red{
                color: #F84D4D;
            }
        }
    }
</style>