<template>
    <div class="bothse">
        <trannav :title="title" :leftj="true"></trannav>
        <div class="titletab">
            <div class="tablist" @click="clicktab(index)" v-for="(item,index) in tablist" :key="index" :class="[index == tabstate?'tabact':'']">{{item}}</div>
        </div>
        <div class="bodylist">
            <div class="listmodule" v-for="(item,index) in bodylist" :key="index">
                <div class="list_model first_div">
                    <div>单号：93849384</div>
                    <div>匹配中</div>
                </div>

                <div class="list_model">
                    <div>数量</div>
                    <div>900</div>
                </div>

                <div class="list_model">
                    <div>单价</div>
                    <div>0.20395746CNY</div>
                </div>

                <div class="list_model maijia">
                    <div>售价</div>
                    <div>2000.00000000CNY</div>
                </div>

                <div class="list_model clickview">
                    <div></div>
                    <div v-if="tabstate == 0">出售</div>
                    <div v-else>买入</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    name:'transmarket',
    data(){
        return{
            title:'交易市场',
            tablist:['买单列表','卖单列表'],//头部切换
            tabstate:0, //选中状态

            bodylist:['','',''],//列表
        }
    },
    methods:{
        // 点击切换
        clicktab(index){
            this.tabstate = index;
        }
    },
    components:{

    }
}
</script>

<style lang="less" scoped>
.bothse{
    height:100vh;
    padding:40px 0 0;
    background:rgba(0,22,114,1);
}
.titletab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#0D2179;
    
    .tablist{
        width: 50%;
        line-height: 44px;
        text-align: center;
        font-size:16px;
        font-weight:400;
        color:rgba(216,216,216,1);
        position: relative;     
    }
    .tabact{
        color:#fff;
        &:after{  
            content:'';
            width:20px;
            height:3px;
            background:rgba(248,77,77,1);
            border-radius:2px;
            position: absolute;
            bottom: 0;
            left:44%;
        }
    }

} 
.bodylist{
    padding:0 16px 20px;
    background:rgba(0,22,114,1);
    .listmodule{
        margin:10px 0 0;
        padding:0 10px 20px;
        border-radius:6px;
        background:#0D2179;
    }
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
.clickview{
    div:last-child{
        width:76px;
        line-height:26px;
        background:linear-gradient(180deg,rgba(86,204,242,1) 0%,rgba(47,128,237,1) 100%);
        opacity:0.79;
        text-align: center;
        border-radius: 20px;
    }
}
</style>