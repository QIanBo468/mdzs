<template>
    <div id='notice'>
        <van-nav-bar
            title="公告"
            left-arrow
        />
        <div class="noticeList">
            <router-link to='noticeDetails'>
                <ul>
                    <li>新上6号爱心矿机，租赁价格仅10000usdt</li>
                    <li>2019.06.12 14:12:45</li>
                </ul>
                <div>
                    <img src="../../../static/images/index/more.png" alt="">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.overText{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
    #notice{
        width: 100%;
        height: 100%;
        background: #F8F8F8;
        .noticeList a{
            height: 63px;
            display: flex;
            // line-height: 63px;
            background: #fff;
            margin-top: 10px;
            padding: 10px 16px;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            ul{
                width: 260px;
                height: 100%;
                li{
                    font-size: 14px;
                    color: #666666;
                    height: 20px;
                    line-height: 20px;
                    .overText
                }
                li:last-child{
                    font-size: 12px;
                    color: #999999;
                    height: 17px;
                    margin-top: 5px;
                    line-height: 17px;
                }
            }
            div{
                width: 22px;
                img{
                    width: 22px;
                    height: 22px;
                }
            }
        }
    }
</style>