<template>
  <div class="container">
      <header>
      <div class="head-nav"></div>
      <div class="header-left">
        <img src="../assets/images/logo.png" alt="" class="logo" />
        <span class="logo-detail">微幼趣</span>
      </div>
      <div class="header-right">
        <span>在App中打开</span>
        </div>
    </header>
    <div class="w-main">
      <div class="clearfix">
        <div class="w-main-left">
          <img  :src="storyFile.cover" alt="" class="img-cover" />
          <div class="play-video pause"></div>
        </div>
        <div class="w-main-right">
          <h5 class="cover-title" >{{storyFile.title}}</h5>
          <p class="cover-direct">
            <span>录讲人：</span><span class="cover-direct-person">{{storyFile.userName}}</span>
          </p>
        </div>
      </div>
      <div class="mp3-video">
            <div class="flex align">
                    <!-- <span class="audio-start">00:00</span> -->
                    <!-- <div class="progress">
                      <div class="progress-val"></div>
                      <div class="sign"></div>
                    </div> -->
                    <span class="audio-end">{{storyFile.time}}</span>
                     <!-- <audioPart  v-model="storyFile"  :audio="{url:storyFile.url,step:10}"></audioPart> -->
            </div>
         
      </div>
    </div>
    <div class="w-resoure">
        <p>此音频文件来源于《<span class="w-school">{{storyFile.schoolName}}</span>》</p>
        <p>详细地址为：<span class="w-adress">xxxxx</span></p>
        <p>欢迎各位家长来园内咨询</p>
    </div>
    <div class="w-skill">
        <p>技术支持：河北微幼趣教育科技有限公司</p>
        <p>APP名称：《微幼趣园所端》</p>
        <p class="w-tel">平台电话：<a href="tel:0311-85343508">0311-85343508</a></p>
        <p>平台官网：</p>
        <p>入住平台的幼儿园可使用该App,欢迎各大幼儿园来电咨询</p> 
    </div>

  </div>
</template>

<script>
import instance from '@/utils/request'
import rem from '@/utils/rem'
import audioPart from "./audioPart";
  export default {
    name: "page1",
    data(){
      return{
        storyFile:{
          time:''

        }
      }

    },
     components: {
    audioPart
  },
    mounted(){
      this.getStory()
    },
    methods:{
      getStory(){
      instance.get(`/nurse/tourist/share/audio/${38}`).then((response) => {
      this.storyFile = response.data.data
      console.log(this.storyFile)
})
    },
    }
  }
</script>

<style scoped lang="less">
  .container {
    background: #F7F9F9;
    width: 100vw;
  }

  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
    height: 100%;
  }
  a,
  input,
  button {
    /* 清除按下时的阴影 */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  input,
  button {
    /* 清除按钮的圆角 */
    -webkit-appearance: none;
    border-radius: 0;
  }
  body {
    margin: 0;
    -webkit-user-select: none;
  }
  body * {
    -webkit-user-select: none;
    font-family:PingFangSC-Regular;
  }
  body {
    -webkit-text-size-adjust: 100%;
    background: #F7F9F9;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  h1,
  div,
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .clearfix{
    zoom: 1;
  }



  header{
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      padding: 0 .48rem;
      align-items: center;
      overflow: hidden;
  }
  .header-left{
    height: 1rem;
    line-height: 1rem;
    display: flex;
    align-items: center;
  }
  .logo{
      width:.62rem;
      vertical-align: middle;
      margin-right: .16rem;
  }
  .logo-detail{
    font-size: .28rem;
    color: #262829;
  }
  .w-main{
    width: 100%;
    padding: .4rem .24rem;
    background: #fff;
  }
  .w-main-left{
    width: 1.4rem;
    position: relative;
    float: left;
    margin-right: .3rem;
  }
  .img-cover{
    height:1.5rem;
    width: 100%;
    display: block;
  }
  .w-main-right{
    float: left;
  }
  .cover-title{
    font-size: .32rem;
    color: #1F2122;
  }
  .cover-direct{
    color: #535353;
    font-size: .26rem;
    margin-top: .3rem;
  }
  .audioPart{
    height: 0;
    width: 0;
  }
  .mp3-video{
    margin-top: .26rem;
  }
  .flex{
    display: flex;
  }
  .align{
    align-items: center;
  }
  .progress {
    width: 100%;
    height: 2px;
    background: #F5F6F6;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .progress-val {
    width: 0%;
    background-color: #3ecff5;
    height: 2px;
  }
  .sign {
    width: 15px;
    height: 15px;
    background-image: url("../assets/images/audioSign-1.png");
    background-size: 100% 100%;
    background-position: 0 0;
    margin-left: -1px;
    position: relative;
    z-index: 20;
  }
  .audio-start,.audio-end{
    font-size:.24rem;
    color: #BABDC2;
    
  }
  .audio-start{
    margin-right: .4rem;
  }
  .audio-end{
    margin-left: .4rem;
  }
  .w-resoure{
    margin-top: .2rem;
    background-color: #fff;
    padding:.48rem .24rem;
    font-size: .28rem;
  }
  .w-skill{
    color: #535353;
    font-size: .26rem;
    margin-top: .38rem;
    padding: 0 .24rem;
  }
  .w-resoure p:not(:last-child), .w-skill p:not(:last-child){
    margin-bottom: .3rem;
  }
  .play-video{
    width: .64rem;
    height: .64rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: auto
  }
  .pause{
    background-image: url('../assets/images/pause.png');

  }
  .play{
    background-image: url('../assets/images/play.png');
  }
  .w-tel a{
    color: #3ecff5;
  }
  .header-right{
    width:1.72rem;
    height:.52rem;
    background:rgba(62,207,245,1);
    border-radius:.26rem;
    color: #fff;
    line-height: .52rem;
    text-align: center;
    font-size: .24rem;
  }
</style>
