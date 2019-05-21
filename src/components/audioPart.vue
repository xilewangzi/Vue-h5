<template>
  <div>
    <div class="video-style">
      <div class="flex align">
        <span>{{start}}</span>
        <div class="progress" @click="progressJump" ref="progress">
          <div class="progress-val" :style="{width:progress_V+'%'}"></div>
          <div class="sign"></div>
        </div>
        <span>{{finish}}</span>
      </div>
      <div class="video-control">
        <div class="vd-left" @click="prev"></div>
        <div class="vd-center" :class="status?'pause':'play'" @click="controlAudio"></div>
        <div class="vd-right" @click="next"></div>
      </div>
    </div>
    <audio :src="audio.url" ref="audioPart" @ended="ended"></audio>
  </div>
</template>
<script>
import { _debounce,_throttle } from "../utils/fdjl";
export default {
  props: {
    audio: {
      default() {
        return {
          url: "",
          step: 10
        };
      }
    }
  },
  data() {
    return {
      status: false,
      start: "00:00",
      finish: "--",
      startVal: 0, //数值
      finishVal: 0,
      timer: "",
      progress_V: 0,
    };
  },
  mounted() {
    let that = this;
   
    this.$refs.audioPart.oncanplay = function() {
      that.finishVal = Math.floor(that.$refs.audioPart.duration);
      that.finish = that.s_to_hs(Math.floor(that.$refs.audioPart.duration));
    };
  },
  methods: {
    controlAudio(sign) {
      if (!this.status) {
        this.playTimecalcu();
        this.$refs.audioPart.play();
      } else {
        this.$refs.audioPart.pause();
        this.clearTimer();
      }
      this.status = !this.status;
    },
    playTimecalcu() {
      this.timer = setInterval(() => {
        this.startVal = Math.floor(this.$refs.audioPart.currentTime);
        this.start = this.s_to_hs(Math.floor(this.$refs.audioPart.currentTime));
        this.progress_V =
          (this.$refs.audioPart.currentTime / this.$refs.audioPart.duration) *
          100;
      }, 1000);
    },
    s_to_hs(s) {
      //计算分钟
      //算法：将秒数除以60，然后下舍入，既得到分钟数
      var h;
      h = Math.floor(s / 60);
      //计算秒
      //算法：取得秒%60的余数，既得到秒数
      s = s % 60;
      //将变量转换为字符串
      h += "";
      s += "";
      //如果只有一位数，前面增加一个0
      h = h.length == 1 ? "0" + h : h;
      s = s.length == 1 ? "0" + s : s;
      return h + ":" + s;
    },
    /**
     * 清除定时器
     */
    clearTimer() {
      clearInterval(this.timer);
    },
    /**
     * 播放结束后触发
     */
    ended() {
      this.clearTimer();
      this.status = false;
      this.$refs.audioPart.pause();
      this.progress_V=0;
      this.$refs.audioPart.currentTime=0;
      this.start='00:00'
    },
    /**
     * 后退按钮
     */
    prev:_debounce(function(){
      if (this.startVal > 0 && this.startVal < this.finishVal) {
        if (this.startVal - this.audio.step > 0) {
          this.startVal -= this.audio.step;
        } else {
          this.startVal = 0;
        }
      }
      this.$refs.audioPart.currentTime = this.startVal;
         this.progress_V =
          (this.$refs.audioPart.currentTime / this.$refs.audioPart.duration) *
          100;
    },500),
    /**
     * 快进按钮
     */
    next: _debounce(function(){
      if (
        this.startVal >= 0 &&
        this.startVal + this.audio.step < this.finishVal
      ) {
        this.startVal += this.audio.step;
      } else {
        this.startVal = this.finishVal;
      }
      this.$refs.audioPart.currentTime = this.startVal;
         this.progress_V =
          (this.$refs.audioPart.currentTime / this.$refs.audioPart.duration) *
          100;
    },500),
    progressJump(e) {
      this.$refs.audioPart.currentTime =
          (e.offsetX /this.$refs.progress.clientWidth) * this.finishVal;
            this.progress_V =
          (this.$refs.audioPart.currentTime / this.$refs.audioPart.duration) *
          100;
      }
  }
};
</script>
<style lang="scss" scoped>
.video-style {
  width: 100%;
  .progress {
    width: 100%;
    height: 2px;
    background: #C9C9C9;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .progress-val {
    width: 0%;
    background-color: #3ecff5;
    height: 2px;
  }
}
.sign {
  width: 15px;
  height: 15px;
  background-image: url("../assets/images/audioSign-1.png");
  background-size: 100% 100%;
  background-position: 0 0;
  margin-left: -1px;
}
.video-control {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  .vd-left {
    width: 10px;
    height: 13px;
    background-image: url("../assets/images/audioSign-2.png");
    background-size: 100% 100%;
    background-position: 0 0;
    cursor: pointer;
  }
  .vd-center {
    width: 32px;
    height: 32px;
    margin: 0 38px;
    cursor: pointer;
  }
  .play {
    // background-image: url("../assets/images/audioSign-4.png");
    background-size: 100% 100%;
    background-position: 0 0;
  }
  .pause {
    // background-image: url("../assets/images/audioSign-5.png");
    background-size: 100% 100%;
    background-position: 0 0;
  }
  .vd-right {
    width: 10px;
    height: 13px;
    // background-image: url("../assets/images/audioSign-3.png");
    background-size: 100% 100%;
    background-position: 0 0;
    cursor: pointer;
  }
}
.align {
  align-items: center;
  span {
    margin: 0 10px;
  }
}
</style>
