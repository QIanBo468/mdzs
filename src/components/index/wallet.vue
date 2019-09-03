<template>
    <div id='wallet'>
        <van-nav-bar
            title="我的钱包"
            left-arrow
        />
        <div class='list'>
            <router-link to='/usdt'>
                <img src="../../../static/images/index/med.png" width="32px" height="32px" alt="">
                <div class='num'>
                    <div>{{usdt.name}}</div>
                    <div>{{usdt.have}}</div>
                </div>
                <img src="../../../static/images/index/big.png" width="9px" height="16px" alt="">
            </router-link>
        </div>
        <div class='list ' >
            <router-link to='usdt' class='bgyellow'>
                <img src="../../../static/images/index/quan.png" width="32px" height="32px" alt="">
                <div class='num'>
                    <div>{{ofc.name}}</div>
                    <div>{{ofc.have}}</div>
                </div>
                <img src="../../../static/images/index/big.png" width="9px" height="16px" alt="">
            </router-link>
        </div>
        <div class='list '>
            <router-link to='usdt' class='bgred'>
            <img src="../../../static/images/index/aixin.png" width="32px" height="32px" alt="">
            <div class='num'>
                <div>{{LoveFund.name}}</div>
                <div>{{LoveFund.have}}</div>
            </div>
            <img src="../../../static/images/index/big.png" width="9px" height="16px" alt="">
            </router-link>
        </div>
        
        <div class='list '>
            <router-link to='usdt' class='bggray'>
            <img src="../../../static/images/index/f.png" width="32px" height="32px" alt="">
            <div class='num'>
                <div>{{fu.name}}</div>
                <div>{{fu.have}}</div>
            </div>
            <img src="../../../static/images/index/big.png" width="9px" height="16px" alt="">
            </router-link>
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
            usdt: {},
            ofc: {},
            fu: {},
            LoveFund: {},

        }
    },
    created () {
        this.$axios.fetchPost('/portal',
        {
            source: "web",
            version: "v1",
            module: "Finance",
            interface: "4003",
            data: {}
        }).then(res => {
            this.usdt = res.data.usdt
            this.ofc = res.data.ofc
            this.fu = res.data.fu
            this.LoveFund = res.data.LoveFund
        })
    },
    methods: {
        
    }
}
</script>
<style lang="less" scoped>
    #wallet{
        background: #F8F8F8;
        .list{
            a{
                background:linear-gradient(180deg,rgba(63,208,255,1) 0%,rgba(47,128,237,1) 100%);
                width: 343px;
                margin: 15px auto 0;
                height: 100px;
                border-radius: 6px;
                padding: 22px  20px 22px 15px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
            // background:linear-gradient(180deg,rgba(255,202,49,1) 0%,rgba(247,107,28,1) 100%);
            
            .num{
                flex: 1;
                overflow: hidden;
                color: #fff;
                margin-left: 10px;
                div{
                    height: 22px;
                    line-height: 22px;
                    font-size: 16px;
                }
                div:last-child{
                    height: 32px;
                    line-height: 32px;
                    font-size: 23px;
                }
            }
            // img{
            //     width: 20px;
            // }
            }
        }
        .bgyellow{
            background:linear-gradient(180deg,rgba(255,202,49,1) 0%,rgba(247,107,28,1) 100%)!important
        }
        .bgred{
            background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%)!important;
        }
        .bggray{
            background:linear-gradient(180deg,rgba(216,216,216,1) 0%,rgba(199,199,204,1) 100%)!important;
        }
    }
</style>