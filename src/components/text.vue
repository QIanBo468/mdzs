<template>
<div>
  <my-header></my-header>
<div class="container">
    <!-- 主页导航-->
    <div class="item-div">
            <ul class="list-unstyled d-flex justify-content-between ul">
                <li class="p-1 pl-2 pr-2 d-block"><a href="#">动画</a>
                    <ul class=" p-0 item-absolute list-unstyled">
                        <li>MAD AMV</li>
                        <li>MMD 3D</li>
                        <li>短片 手书 配音</li>
                        <li>综合</li>
                    </ul>
                </li>
                <li class="p-1 pl-2 pr-2"><a href="#">番剧</a>
                    <ul class=" p-0 item-absolute list-unstyled">
                            <li>MAD AMV</li>
                            <li>MMD 3D</li>
                            <li>短片 手书 配音</li>
                            <li>综合</li>
                        </ul>
                </li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">国创</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">音乐</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">舞蹈</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">科技</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">数码</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">生活</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">鬼畜</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">时尚</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">广告</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">娱乐</router-link></li>
                <li class="p-1 pl-2 pr-2"><router-link to="game">影视</router-link></li>
            </ul>
        </div>
    <div class="row">
    <div class="col-lg-8 col-sm-7 p-0  bInLeft">
    <!-- 轮播图-->
    <div id="car">
        <mt-swipe :auto="3000" class="swipe">
            <mt-swipe-item>
                <router-link to="">
                    <img src="img/bil/lunbotop0.jpg" alt="" class="w-100 h-100">
                </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="">
                    <img src="img/bil/lunbotop1.jpg" alt="" class="w-100 h-100">
                </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="">
                    <img src="img/bil/lunbotop2.jpg" alt="" class="w-100 h-100">
                </router-link>
            </mt-swipe-item>
            <mt-swipe-item>
                <router-link to="">
                    <img src="img/bil/lunbotop3.jpg" alt="" class="w-100 h-100">
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
    </div>
    
    <!-- 视频区-->
    <div class="my-border-bottom mt-3">
        <img src="img/img/index/computer_icon.png" alt=""/>
        <span class="sp">推荐</span>
    </div>
    <div class="row m-0">
        <div class="col-lg-3 col-md-4 col-sm-6 p-1" v-for="(item,i) of vilist" :key="i">
            <div class="my-border rounded">
                        <router-link :to="`/video_play/?video_link=${item.video_link}`" class="my-a videolink">
                            <img :src="`http://localhost:3000/img/${item.img}`" class="w-100 rounded video-h" alt=""/>
                            <p class="m-0 mt-2 p-2 text-truncate text-dark p-m" v-text="`${item.p}`"></p>
                        </router-link>
                <router-link to="#" class="p-small p-2 my-a text-secondary overhid" v-text="`${item.a}`"></router-link>
            </div>

        </div>
        


    </div>
        <!-- 动画区-->
        <div class="my-border-bottom mt-4">
            <img src="img/img/index/computer_icon.png" alt=""/>
            <span class="sp">动画</span>
        </div>

        <div class=" d-flex justify-content-around mt-5 text-center">
            <a href="#" class="my-a2 btn rounded"><img src="img/img/index/computer_icon.png" alt=""/><p class="m-0">番剧</p></a>
            <a href="#" class="my-a2 btn rounded"><img src="img/img/index/computer_icon.png" alt=""/><p class="m-0">国创</p></a>
            <a href="#" class="my-a2 btn rounded"><img src="img/img/index/computer_icon.png" alt=""/><p class="m-0">时间表</p></a>
            <a href="#" class="my-a2 btn rounded"><img src="img/img/index/computer_icon.png" alt=""/><p class="m-0">索引</p></a>
            <a href="#" class="my-a2 btn rounded"><img src="img/img/index/computer_icon.png" alt=""/><p class="m-0">点评</p></a>
        </div>

    <div class="carousel m-5" id="car02" data-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item carousel-hover active"><a href="#"><img src="http://localhost:3000/img/2.png" class="w-100" alt=""/></a></div>
            <div class="carousel-item carousel-hover"><a href="#"><img src="img/bilibili2233/22.jpg" class="w-100" alt=""/></a></div>
            <div class="carousel-item carousel-hover"><a href="#"><img src="img/bilibili2233/23.jpg" class="w-100" alt=""/></a></div>
            <div class="carousel-item carousel-hover"><a href="#"><img src="img/bilibili2233/24.jpg" class="w-100" alt=""/></a></div>
            <div class="carousel-item carousel-hover"><a href="#"><img src="img/bilibili2233/25.png" class="w-100" alt=""/></a></div>
        </div>
        <a href="#car02" data-slide="prev" class="carousel-control-prev"><span class="carousel-control-prev-icon"></span></a>
        <a href="#car02" data-slide="next" class="carousel-control-next"><span class="carousel-control-next-icon"></span></a>
        <ul class="carousel-indicators">
            <li class="active" data-target="#car02" data-slide-to="0"></li>
            <li data-target="#car02" data-slide-to="1"></li>
            <li data-target="#car02" data-slide-to="2"></li>
            <li data-target="#car02" data-slide-to="3"></li>
            <li data-target="#car02" data-slide-to="4"></li>
        </ul>
    </div>

        <div class="mt-3 text-center"><img src="img/bil/china_title_icon.png" alt=""/>今日榜单</div>
        <div class="d-flex justify-content-around">
            <div class="text-center rank">
                <div class="p-large">1<span class="sp">st</span></div>
                <img src="img/bil/borenzhuan.jpg" class="w-50" alt=""/>
                <p>火影忍者疾风传</p>
                </div>
            <div class="text-center rank">
                <div class="p-large">2<span class="sp">nd</span></div>
                <img src="img/bil/jfz.jpg" class="w-50" alt=""/>
                <p>火影忍者博人传</p>
            </div>
            <div class="text-center rank">
                <div class="p-large">3<span class="sp">rd</span></div>
                <img src="img/bil/xiaomai.jpg" class="w-50" alt=""/>
                <p>干物妹,小埋!</p>
            </div>

        </div>

            <ul class="list-group text-center w-100">
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">4.海贼王</a></li>
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">5.龙珠</a></li>
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">6.刀剑神域</a></li>
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">7.某科学的超电磁炮</a></li>
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">8.CLANNAD</a></li>
                <li class="list-group-item w-100 p-0"><a href="serach.html" class="a-list d-block p-3">9.你的名字</a></li>
                <li class="list-group-item w-100 p-0"><a href="#" class="a-list d-block p-3">10.烟火</a></li>
            </ul>

            <!-- 漫画区-->
        <div class="my-border-bottom mt-4">
                <img src="img/img/index/computer_icon.png" alt=""/>
                <span class="sp">漫画</span>
            </div>
            <div class="mt-3  comic">
                <button>-</button>
                <div class="comicdiv d-inline-block w-80">
                <ul class="list-unstyled comicul d-flex">
                    
                    <li><img src="img/1.jpg" ></li>
                    <li><img src="img/2.jpg" ></li>
                    <li><img src="img/3.jpg" ></li>
                    <li><img src="img/4.jpg" ></li>
                    <li><img src="img/1.jpg" ></li>
                    <li><img src="img/2.jpg" ></li>
                    <li><img src="img/3.jpg" ></li>
                    <li><img src="img/4.jpg" ></li>
                </ul>

            </div>
            <button>+</button>
            </div>


</div>
<div class="col-lg-4 col-sm-5 bInRight">
    <div class="footer rounded p-1 text-center">
        <span class="p-m">在线人数:1000w | 最新投稿 56000</span>
    </div>
    <div class="mt-4"><p class="p-m border-bottom">直播排行</p>
        <ul class="list-group paihang list-unstyled">
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">1</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">2</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">3</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">4</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">5</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
            <li class="list-group-item pl-1 pr-0"><span class=" p-small p-1 rounded bg_pinkdark">6</span> <img src="img/bil/touxiang.png" class="rounded-circle" alt=""><p class="p-small pl-1 d-inline-block mr-3">哔哩哔哩直播</p><span class="p-small greydark">100w</span></li>
        </ul>

    </div>
    <div class="mt-4"><p class="p-m border-bottom">为你推荐</p>
        <div class="mui-card" v-for="(item,i) of tjlist" :key="i">
				<div class="mui-card-header mui-card-media">
					<img :src="`http://localhost:3000/img/${item.touxiang}`" />
					<div class="mui-media-body">
						<span v-text="`${item.user_name}`"></span>
						<p v-text="`${item.ctime}`"></p>
					</div>
				</div>
                <div class="mui-card-content-inner">
						<span style="color: #333;" v-text="`${item.biaoti}`"></span>
					</div>
				<div class="mui-card-content" >
					<img :src="`http://localhost:3000/img/${item.tj_img}`" alt="" width="100%" />
				</div>
                
				<div class="mui-card-footer">
					<span class="mui-icon-extra mui-icon-extra-like" @click="changed"></span>
					<span class="mui-icon mui-icon-chatbubble"></span>
					<span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
				</div>
			</div>

    </div>

    <div class="position-relative z">
        <table></table>
        <a href="#" class="d-block float-left"><img src="img/bil/wh.png" class="w-100" alt=""></a>
        <a href="#" class="d-block float-left"><img src="img/bil/sp.png" class="w-100" alt=""></a>
    </div>
    <a class="d-block position-relative phototop" href="">
        <img src="img/bil/photo.jpg" class="w-100" alt="">
        <p class="position-absolute photo text-white font-weight-bold">bilibili相簿</p>   
    </a>
</div>




        
    </div>

   
</div>
<my-footer></my-footer>
</div>
</template>
<script>
// @ is an alias to /src'
export default {
  data() {
    return {
      vilist:[],
      n:0,
      tjlist:[],
      tjlisthc:[],
      
    }
  },
  created() {
      this.loadtj();
      this.changed();
  },
  mounted() {
      $(function(){
          $(".item-div .ul>li").children("ul").hide();
$(".item-div .ul>li").on("mouseover", function () {
    $(this).children("ul").slideDown(500);
    $(this).siblings().children("ul").slideUp(500);
});     
        var i=0;
        $(".comic button:first-child").click(function(){
            
            i--;
            if (i<0) {
                i=0;
                return;
            }
            $(".comicul").css("margin-left",-i*232);
            console.log(i)
        })
        $(".comic button:last-child").click(function(){
            i++;
            if (i>$(".comicul li").length-2) {
                i=$(".comicul li").length-2;
                return;
            }
            $(".comicul").css("margin-left",-i*232);
        })
      })
      
  },
  methods:{
      loadtj(){
          var url="http://localhost:3000/vilist";
          this.axios.get(url).then(res=>{
              this.vilist=res.data.data;
              console.log(this.vilist);
              
          })
      },
      changed(){
        //   点击后,更换卡片的内容
        this.n++;
        var url="http://localhost:3000/kplist";
        url+=`?id=${this.n}`;
        this.axios.get(url).then(res=>{
            this.axios.get(url).then(reshc=>{
                // 当读取到最后一行数据时,提示没有更多数据,原卡片框样式继续保留
            this.tjlisthc=reshc.data.data;
            if (this.tjlisthc.length==0) {
                this.$toast("没有更多数据啦!")
                return;
            }else{
                this.tjlist=res.data.data;
            }
            })
            
            console.log(this.tjlist);
        })
      }
  },
  
}
</script>
<style scoped>
    .video-h{
        height:140px;
    }
    .swipe{
        height: 300px;
        width: 100%;
        margin: auto;
    }
     @media screen and (min-width: 992px){
        .mui-card-content img{
            height: 250px;
        }
     }
    @media screen and (max-width: 767px) {
        .mui-card-content img{
            height: 150px;
        }
    }
</style>