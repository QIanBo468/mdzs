<template>
    <div id='ofcrecord'>
         <van-nav-bar
            title="转账记录"
            left-arrow
            :border="false"
        />
        <div class='box'>
            <div class='record' v-for='item in 4' :key='item'>
                <div class='status'>审核</div>
                <ul>
                    <li v-for="i in 4" :key='i'>
                        <div>钱包类型</div>
                        <div>2019.08.12 14:12:12</div>
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
    #ofcrecord{
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