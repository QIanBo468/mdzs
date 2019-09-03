<template>
  <div class="content">
    <van-nav-bar class="back_jiantou" left-arrow @click-left="onClickleft" />
    <div class="backname_box">
      <img src="../../assets/img/zhuanpan_title.png" alt />
    </div>
    <div class="back_box">
      <div class="choujiang">
        <div class="box">
          <div class="pointer" @click="chou()">
            <img src="../../assets/img/zhen.png" alt />
            <p>GO</p>
          </div>
          <div class="boxbg" :style="{transform:rotate_angle,transition:rotate_transition}">
            <div class="turn">
              <div :class="{'wheel-bg6':true}">
                <div class="prize-list">
                  <ul class="ulOne" :class="{'win':indexa===0&&prize_list.length==3}">
                    <li
                      v-for="(item,index) in arrOne"
                      :key="index"
                      :class="{'win':index===indexa}"
                      :style="{ zIndex: item.zIndex,transform: item.deg }"
                    ></li>
                  </ul>
                  <ul class="ulTwo" :class="{'win':indexa===arrOne.length-1}">
                    <li
                      v-for="(item,index) in arrTwo"
                      :key="index"
                      :class="{'win':index===indexb}"
                      :style="{ zIndex: item.zIndex,transform: item.deg }"
                    ></li>
                    <li
                      v-if="prize_list.length==3"
                      :class="{'win':indexb===0}"
                      style="border:none;z-index:4; transform: rotate(329deg)"
                    ></li>
                  </ul>
                </div>
                <div class="prize-list">
                  <div
                    class="prize-item"
                    v-for="(item,index) in prize_list"
                    :key="index"
                    :style="{transform:item.troter,width:item.width}"
                  >
                    <div class="prize-name"></div>
                    <div class="prize-pic">{{item.prizeName}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="intrudces">
      <div class="intrudec">
        <img src="../../assets/img/left.png" alt />
        <span>游戏说明</span>
        <img src="../../assets/img/right.png" alt />
      </div>
      <div class="intrudce">{{instruction}}</div>
    </div>

    <van-dialog
      v-model="show"
      title="中奖说明"
      show-cancel-button
      :before-close="confirms"
      cancel-button-text="再玩一次"
    >
      <span>{{user}}</span>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      winnum: '0', // 中奖的下标
      indexa: '', // 中奖的下标在第一个ul下li的index下标，背景变深颜色
      indexb: '', // 中奖的下标在第二个ul下li的index下标，背景变深颜色
      toast_control: false, // 抽奖结果和活动规则弹出框控制器
      click_flag: true, // 是否可以旋转抽奖
      start_rotating_degree: 0, // 转盘初始旋转角度
      rotate_angle: 0, // 转盘将要旋转的角度
      start_rotating_degree_pointer: 0, // 指针初始旋转角度
      rotate_angle_pointer: 0, // 指针将要旋转的度数
      rotate_transition: '', // 初始化选中的过度属性控制
      rotate_transition_pointer: 'transform 12s ease-in-out', // 初始化指针过度属性控制
      prize_list: [
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品1',
          prizeName: '一等奖',
          id: '1' // 奖品id
        },
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品2',
          prizeName: '二等奖',
          id: '2' // 奖品id
        },
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品3',
          prizeName: '三等奖',
          id: '3' // 奖品id
        },
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品4',
          prizeName: '一等奖',
          id: '4' // 奖品id
        },
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品5',
          prizeName: '二等奖',
          id: '5' // 奖品id
        },
        {
          prizeType: 1, // 是否是奖品
          prizeIndex: '奖品6',
          prizeName: '三等奖',
          id: '6' // 奖品id
        }
      ],
      // 奖品列表
      arrOne: [],
      arrTwo: [],
      member_prize_list: [], // 中奖信息
      index_id: '',
      user: '',
      show: false,
      instruction: '' // 游戏说明
    }
  },
  created () {
    let _this = this
    _this.get_list()
    _this.setSan()
  },
  methods: {
    //   返回
    onClickleft () {
      this.$router.go(-1)
    },
    // 奖品
    get_list () {
      let _this = this
      _this.$axios
        .fetchPost('/portal', {
          interface: '1000',
          module: 'LuckDraw',
          source: 'web',
          version: 'v1'
        })
        .then(res => {
          console.log('游戏说明', res)
          this.index_id = res.data.logId
          this.instruction = res.data.instruction
        })
    },
    chou () {
      let _this = this
      if (_this.click_flag) {
        _this.$axios
          .fetchPost('/portal', {
            interface: '1001',
            module: 'LuckDraw',
            source: 'web',
            version: 'v1',
            data: {
              logId: this.index_id
            }
          })
          .then(res => {
            console.log('结束', res)
            if (res.code == 0) {
              _this.winnum = Number(res.data.status) - Number(1)
              console.log('结束', _this.winnum)
              if (_this.click_flag && _this.winnum) {
                _this.indexa = ''
                _this.indexb = ''
                _this.rotating(_this.winnum)
              }
            } else {
              this.$toast(res.message)
            }
          })
      }
    },
    confirms (action, done) {
      if (action == 'confirm') {
        done()
        this.click_flag = true
      } else {
        this.click_flag = true
        this.get_list()
        done()
      }
    },
    setSan () {
      let _this = this
      _this.arrOne = []
      _this.arrTwo = []
      _this.rotate_angle =
        'rotate(' +
        Math.floor((-360 * 100) / _this.prize_list.length) / 200 +
        'deg)'
      _this.start_rotating_degree =
        Math.floor((-360 * 100) / _this.prize_list.length) / 200

      for (var i = 0; i < _this.prize_list.length; i++) {
        _this.prize_list[i].troter =
          'rotate(' +
          (Math.floor((360 * 100) / _this.prize_list.length) / 100) *
            (0.5 + Number(i)) +
          'deg) translateX(-50%)'
        _this.prize_list[i].width =
          //   Math.floor((3.14 * 5.6) / _this.prize_list.length) + 'px'
          _this.prize_list[i].width = '80px'
        var item = {
          value: _this.prize_list[i].name,
          zIndex: Number(i) + 1,
          deg:
            'rotate(' +
            (Math.floor((360 * 100) / _this.prize_list.length) * i) / 100 +
            'deg)',
          degnum: i
        }
        if (i < _this.prize_list.length / 2) {
          _this.arrOne.push(item)
        } else {
          _this.arrTwo.push(item)
        }
      }
    },
    rotating (index) {
      // 转盘转动函数，index值为中奖的下标，后台会返回中奖的id，这边会首先for循环判断中奖的下标
      let _this = this
      _this.rotate_transition = 'transform 6s cubic-bezier(0.25,0.1,0.01,1)'
      var type = 0 // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5 // 默认为1s
      var result_index = index // 最终要旋转到哪一块，对应prize_list的下标
      var rand_circle = 6 // 附加多转几圈，2-3
      _this.click_flag = false // 旋转结束前，不允许再次触发
      if (type == 0) {
        if (_this.start_rotating_degree < 0) {
          _this.start_rotating_degree = 0
        } else {
          _this.start_rotating_degree =
            _this.start_rotating_degree +
            Math.floor((360 * 100) / _this.prize_list.length) / 200
        }
        var rotate_angle =
          _this.start_rotating_degree +
          360 * 10 +
          Math.floor((-360 * 100) / _this.prize_list.length) / 200 -
          (Math.floor((360 * 100) / _this.prize_list.length) * result_index) /
            100
        _this.start_rotating_degree = rotate_angle
        _this.rotate_angle = 'rotate(' + rotate_angle + 'deg)'
        // 旋转结束后，允许再次触发
        setTimeout(function () {
          if (_this.winnum < _this.prize_list.length / 2) {
            _this.indexb = ''
            _this.indexa = _this.winnum
          } else {
            _this.indexa = ''
            _this.indexb = _this.winnum - _this.arrOne.length
          }
          setTimeout(function () {
            _this.game_over()
          }, 100)
        }, during_time * 1000 + 1500) // 延时，保证转盘转完
      }
    },
    game_over () {
      let _this = this
      this.user =
        _this.prize_list[_this.winnum].prizeType == 1
          ? '恭喜您，获得' + _this.prize_list[_this.winnum].prizeName
          : _this.prize_list[_this.winnum].prizeName
      this.show = true
      //   this.$dialog
      //     .confirm({
      //       message: this.user
      //     })
      //     .then(() => {
      //       // on close
      //       console.log('确定')
      //       //   _this.set_over()
      //       _this.winnum = ''
      //       _this.click_flag = true
      //     })
    }
  }
}
</script>
<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(
    180deg,
    rgba(253, 89, 102, 1) 0%,
    rgba(244, 45, 61, 1) 100%
  );
  padding-bottom: 50px;
}
.van-nav-bar {
  background: none;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.backname_box {
  box-sizing: border-box;
  width: 80%;
  height: 120px;
  margin: 0 auto;
  background: url("../../assets/img/11.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 40px;
}
.backname_box > img {
  width: 100%;
  height: 100%;
}
.back_box {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  padding: 0 40px;
}
.choujiang {
  box-sizing: border-box;
  width: 300px;
  height: 300px;
}
.box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.pointer {
  box-sizing: border-box;
  position: relative;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -55%);
}
.pointer img {
  width: 100px;
  height: 100px;
}
.pointer > p {
  position: absolute;
  top: 52%;
  left: 50%;
  margin: 0;
  font-size: 30px;
  color: #ff6600;
  transform: translate(-50%, -55%);
}
.boxbg {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 14px;
  background: url("../../assets/img/pan.png") no-repeat;
  background-size: 296px 296px;
  background-position: 50% 50%;
}
.turn {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.wheel-bg6 {
  width: 100%;
  height: 100%;
  position: relative;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: absolute;
}

.prize-list ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.prize-list ul li {
  position: absolute;
  top: 0px;
  left: 50%;
  width: 50%;
  height: 50%;
  transform-origin: 0 100%;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  border-left: 1px solid #ffd8ae;
}

.prize-list .ulOne li:nth-child(odd),
.prize-list .ulTwo li:nth-child(even) {
  background: #ffa400;
}
.prize-list .ulTwo li:nth-child(odd),
.prize-list .ulOne li:nth-child(even) {
  background: #ffcb00;
}
.prize-list ul .win {
  background: red !important;
}
.ulTwo {
  clip: rect(0, 140px, 280px, 0);
}

.prize-item {
  position: absolute;
  text-align: center;
  top: 0;
  z-index: 12;
  height: 130px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: 0 100%;
}
.prize-pic {
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
  font-size: 16px;
  color: #ffffff;
}

.prize-name {
  box-sizing: border-box;
  padding-top: 8px;
  font-size: 16px;
  color: #ffffff;
}
.van-dialog__content > span {
  color: #000;
  font-size: 15px;
  font-weight: 300;
  margin-left: 15px;
  padding: 15px;
}
.intrudec {
  display: flex;
  justify-content: center;
  align-items: center;
}
.intrudec > img {
  margin: 0 10px;
}
.intrudec > span {
  font-size: 18px;
  color: #fff;
}
.intrudce {
  margin: auto;
  width: 100%;
  padding: 15px 60px;
  color: #fff;
  font-size: 14px;
}
.intrudces{
    padding: 30px;
}

</style>
