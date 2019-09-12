<template>
<div>
    <div class="bothse">
        <trannav :title="title" ></trannav>
        <div class="echarts">
            <chart style="width:100%;" ref="chart1" :options="orgOptions" ></chart>
        </div>

        <div class="centerbottom">
            <div class="todaybothdata">
                <div>今日总交易量</div>
                <div>{{cont.count}}</div>
            </div>

            <div class="flex_both">
                <router-link to="/hangon?gstate=0" class="flex_model">
                    <div><img src="../../../static/images/icon/gmay.png" /></div>
                    <div>挂买</div>
                </router-link>
                <router-link to="/hangon?gstate=1" class="flex_model">
                    <div><img src="../../../static/images/icon/gmai.png" /></div>
                    <div>挂卖</div>
                </router-link>
            </div>
            <!-- 最后一行 -->
            <router-link to="/transmarket" class="last_view">
                <div><img src="../../../static/images/icon/trans_icon.png" alt=""></div>
                <div>交易市场</div>
            </router-link>
        </div>


    </div>
</div>
</template>



<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
    name:'transaction',
    data(){
        return{
            title:'交易中心',
            orgOptions:{},
            cont:'', //获取的数据
            yarr:[],
            xarr:[],
            newlist:[],
        }
    },
    created(){
        this.getzheimg();
    },
    mounted() {
        
        
        this.orgOptions = {
            xAxis: {
                type: 'category',
                data: this.xarr,
                axisLine:{  
                    lineStyle:{  
                        color:'#fff',  
                        width:2  
                    }  
                }, 
                axisLabel:{
                    interval: 0
                } 
                
            },
            yAxis: {
                type: 'value',
                axisLine:{  
                    lineStyle:{  
                        color:'#fff',  
                        width:2  
                    }  
                }, 
                axisLabel:{
                    formatter:'{value}k'
                }
            },
            series: [{
                data: this.yarr,
                type: 'line',
                smooth: true,//折点是圆弧状的

                symbol: 'circle',     //折点设定为实心点
                symbolSize: 10,   //设定实心点的大小

                  itemStyle : {    
                    normal : {    
                        lineStyle:{    
                            color:'#ffffff'    
                        },
                        color: 'red'   
                    }  
                      
                }, 
   
            }
           
            ]
             // {
            //     data: this.yarr,
            //     type: 'line',
            //     smooth: true,//折点是圆弧状的

            //     symbol: 'circle',     //折点设定为实心点
            //     symbolSize: 10,   //设定实心点的大小

            //       itemStyle : {    
            //         normal : {    
            //             lineStyle:{    
            //                 color:'#ffffff'    
            //             },
            //             color: 'red'   
            //         }  
                      
            //     }, 
            // }
        }
        
    },
    
    methods:{
        //  折线图
        getzheimg(){
            var _this = this;
            let data={
                lastId :0,
                page:1
            }
            _this.$axios.fetchPost("/portal", {
                interface: "2000",
                module: "Attachment",
                source: "web",
                version: "v1",
                data: data
            })
            .then(res => {
            console.log("折线图", res);
            if (res.code == 0) {
                _this.cont = res.data
                var list = res.data.list
                console.log(list)
                for(var i  in list){
                    _this.yarr.push(list[i].price);
                    _this.xarr.push('');
                }
            
                
        

                
            } else if (res.code == 4800) {
                _this.$toast(res.message);
            }
            });
        },
        formatDateTime (date) {  
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
            },
    },
    components:{
        'chart':ECharts
    }
}
</script>

<style lang="less" scoped>
.title{
    color:#fff;
    font-weight:500;
}
.bothse{
    height: 100%;;
    padding:44px 0 0;
    box-sizing: border-box;
    background:rgba(0,22,114,1);
}
.echarts{
    
    margin:10px 0 20px 0;
    width: 100vw;
    height:240px;
    background:rgba(255,255,255,0.05);
    color: #fff;
}
.centerbottom{
    margin:0 16px  37px 16px;
}
.todaybothdata{
    height:90px;
    background:linear-gradient(180deg,rgba(86,204,242,1) 0%,rgba(47,128,237,1) 100%);
    border-radius:6px;
    box-sizing: border-box;
    padding:18px 0 18px 30px;
    div{
        color: #fff;
        &:first-child{
            font-size:13px;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
         &:last-child{
            font-size:23px;
            font-weight:bold;
            margin: 6px 0 0 0;
            color:rgba(255,255,255,1);
         }
    }
}
.flex_both{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin:10px 0;
    .flex_model{
        width:166px;
        height:58px;
        border-radius:6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding:0 20px;
        &:first-child{
          background:linear-gradient(180deg,rgba(255,202,49,1) 0%,rgba(247,107,28,1) 100%);
        }
        &:last-child{
            background:linear-gradient(360deg,rgba(216,42,103,1) 0%,rgba(238,96,156,1) 100%);
        }
        div{
            &:first-child{
                width: 23px;
                height: 23px;
                margin-right: 10px;
                img{
                    width: 23px;
                    height: 23px;  
                }
            }
             &:last-child{
                font-size:18px;
                font-weight:500;
                color:rgba(255,255,255,1);
             }
        }
    }
}
.last_view{
    height:78px;
    background:linear-gradient(180deg,rgba(253,89,102,1) 0%,rgba(244,45,61,1) 100%);
    border-radius:6px;
    display:flex;
    align-items:center;
    padding:0 0 0 40px;
    div{
        &:first-child{
            width: 78px;
            height:78px;
            margin-right:40px;
            img{
                width: 78px;
                height:78px;
            }
        }
        &:last-child{
            font-size:18px;
            font-weight:500;
            color:rgba(255,255,255,1);
        }
    }
     
}
</style>