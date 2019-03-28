<template>
<div class="download-app">
  <img class="head" src="~@/assets/img/login_img/logo.png"/>
  <p>上海市机动车维修公共服务平台</p>
  <img class="pic" src="/img/download/picture.png"/>
  <img class="button" src="/img/download/button.png" @click="toClick"/>

  <div id="mask" v-show="showMask" @click="showMask= false">
    <img src="/img/download/to-open.png"/>
    <p>请点击“在浏览器打开”</p>
  </div>
</div>
</template>

<script>
import { isWeixn, isIOS } from '~/static/util.js'
export default {
  name: "download-app",
  head () {
    return {
      title: '上海汽修平台app下载',
      meta: [{ hid: 'viewport', name: 'viewport', content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },]
    }
  },
  data(){
    return{
      showMask: false
    }
  },
  methods:{
    toClick(){
      if(isWeixn()) {
        this.showMask= true
      }else{
        if(isIOS()){
          window.location.href= "https://itunes.apple.com/cn/app/id1356038665?mt=8"
        }else{
          window.location.href= "https://download.hoxiuxiu.com/app/qx.apk"
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
  .download-app{
    background: url("/img/download/background.png") no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    position: relative;
    min-height: 100vh;

    #mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #1d1d1d;
      opacity: .7;
      left: 0;
      top: 0;
      text-align: right;
    }
    #mask.on{
      display: block;
    }
    #mask img{
      width: 30%;
    }
    #mask p{
      font-size: 16px;
      color: white;
      margin-top: 20px;
      margin-right: 10px;
      text-align: right;
    }
    .head{
      width: 120px;
      margin-top: 20px;
    }
    p{
      font-size: 18px;
      color: white;
    }
    .pic{
      width: 90%;
      margin-top: 40px;
    }
    .button{
      width: 60%;
      margin-top: 40px;
    }
  }

</style>
