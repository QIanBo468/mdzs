<template>
    <div id='extract'>
        <van-nav-bar
        title="转账"
        right-text="转账记录"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class='box'>
            <div class='usdt' @click='show = true'>
                <img src="../../../static/images/index/ofc.png" alt="">
                ofc
            </div>
            <div class='money'>
                123845.00000000
            </div>
            <div class='title'>
                会员ID
            </div>
            <InputImg style="width: 343px;height: 40px;margin: 0 auto" :placeholder='placesUser'>
                <template slot="right"> 
                    <img :src="InputImg" alt="">
                </template>
            </InputImg>

            <div class='title'>
                转账数量
            </div>

            <InputImg style="width: 343px;height: 40px;margin: 0 auto" :placeholder='placesNum'>
                <!-- <template slot="right"> 
                    <span class='red'>全部</span>
                </template> -->
            </InputImg>
            <div class='title'>
                验证码
            </div>

            <InputImg style="width: 343px;height: 40px;margin: 0 auto 40px" :placeholder='placesCode'>
                <template slot="right"> 
                    <span class='red' @click='time'>{{codeText}}</span>
                </template>
            </InputImg>
            <div class='btn'>
                转账
            </div>
        </div>
        <van-action-sheet v-model="show" title="请选择转账用户">
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell title="单选框 1" clickable @click="radio = '1'">
                    <van-radio slot="right-icon" name="1" />
                    </van-cell>
                    <van-cell title="单选框 2" clickable @click="radio = '2'">
                    <van-radio slot="right-icon" name="2" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-action-sheet>
    </div>
</template>
<script>
import { Toast } from 'vant'
import InputImg from '../../views/inputImg'
import { setInterval, clearInterval } from 'timers';
export default {
    data () {
        return {
            user: '',
            InputImg: '../../../static/images/index/user.png',
            placesUser: '请输入会员ID',
            placesNum: '请输入转账数量',
            placesCode: '请输入验证码',
            codeText: '获取验证码',
            codeTime: 3,
            show: false,
            radio: 1,

        }
    },
    methods : {
        onClickLeft () {
        },
        time () {
            if(this.codeText == '获取验证码'){
                var that = this;
                var time = setInterval(() => {
                    if(that.codeTime <= 0){
                        console.log(that.codeTime)
                        clearInterval(time)
                        that.codeText = '获取验证码'
                        that.codeTime = 3
                    }else{
                        console.log(1111)
                        that.codeTime -- 
                        that.codeText = that.codeTime + 's'
                    }
                },1000)
            }
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