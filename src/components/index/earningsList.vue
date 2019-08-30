<template lang="">
    <div id='earningsList'>
        <van-nav-bar
            title="我的收益"
            left-arrow
            :border="false"
        />
        <div class='box'>
            <div class="list" v-for='(item, index) in 5' :key='index'>
                <!-- <router-link to='noticeDetails'> -->
                    <ul>
                        <li class='overText'>矿机收益</li>
                        <li>2019.07.12 13:45:12</li>
                    </ul>
                    <div>
                        2.19230000
                    </div>
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
#earningsList{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f8f8f8;
}
.box{
    padding: 0 16px;
    margin-top: 10px;
    background: #fff;
    .list{
        // padding: 0 16px;
            height: 50px;
            display: flex;
            // line-height: 63px;
            background: #fff;
            padding: 5px 0;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            border-bottom: 1px solid #f8f8f8;
            ul{
                width: 120px;
                overflow: hidden;
                height: 100%;
                li{
                    font-size: 14px;
                    color: #666666;
                    height: 20px;
                    line-height: 20px;
                }
                li:last-child{
                    font-size: 11px;
                    color: #999999;
                    height: 16px;
                    margin-top: 5px;
                    line-height: 16px;
                }
            }
            div{
                width: 100px;
                text-align: right;
                font-size: 16px;
                color: #F84D4D;
            }
        }
    
}
</style>