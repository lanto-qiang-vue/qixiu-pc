<template>
<div style="position: relative;">
  <Button type="primary" @click="fullscreen" style="position: absolute;right: 10px;top: -36px;">全屏</Button>
  <div class="map-body">
    <div class="hxxlogo">
      <img class="hxx-logo" src="/img/hotmap/logo.png"/>
      <img class="logostar" src="/img/hotmap/logostar.png"/>
    </div>
    <img class="mark" src="/img/hotmap/mark.png"/>
    <img class="slogan" src="/img/hotmap/slogan.png"/>

    <img class="shanghai" src="/img/hotmap/shanghai.png"/>

    <div class="total mnypjt">
      <label ><span id="corptotal">test-54321</span></label>
      <label class="hasbg"><span id="join">test-54321</span></label>
      <label class="hasbg"><span id="using">test-54321</span></label>
    </div>


    <div class="hotmap">
      <img class="mainmap" src="/img/hotmap/map.png" />
      <img class="star" src="/img/hotmap/star1.png" />
      <img class="star2" src="/img/hotmap/star2.png" />
      <img class="line" src="/img/hotmap/line.png" />
      <div class="times">
        <img src="/img/hotmap/weixiu.png"/>
        <span class="lq">56,789</span>
        <img src="/img/hotmap/liangci.png"/>
      </div>


      <div class="area area-310114" area-name="嘉定区" style="left: 29%;top: 26%;width: 13%;height: 10%;"></div>
      <div class="area area-310113" area-name="宝山区" style="left: 43%;top: 27%;width: 10%;height: 7%;"></div>
      <div class="area area-310000" area-name="市区" style="left: 43%;top: 35%;width: 12%;height: 8%;"></div>
      <div class="area area-310118-1" area-name="青浦区" style="left: 22%;top: 36%;width: 15%;height: 9%;"></div>
      <div class="area area-310118-2" area-name="青浦区" style="left: 6%;top: 45%;width: 14%;height: 11%;"></div>
      <div class="area area-310115-1" area-name="浦东区" style="left: 56%;top: 37%;width: 16%;height: 9%;"></div>
      <div class="area area-310115-2" area-name="浦东区-南汇" style="left: 62%;top: 45%;width: 22%;height: 12%;"></div>
      <div class="area area-310115-3" area-name="浦东区-南汇" style="left: 84%;top: 57%;width: 11%;height: 14%;"></div>
      <div class="area area-310117" area-name="松江区" style="left: 22%;top: 48%;width: 21%;height: 16%;"></div>
      <div class="area area-310112" area-name="闵行区" style="left: 44%;top: 47%;width: 17%;height: 9%;"></div>
      <div class="area area-310116-1" area-name="金山区" style="left: 8%;top: 65%;width: 14%;height: 8%;"></div>
      <div class="area area-310116-2" area-name="金山区" style="left: 20%;top: 66%;width: 26%;height: 14%;"></div>
      <div class="area area-310116-3" area-name="金山区" style="left: 32%;top: 80%;width: 13%;height: 9%;"></div>
      <div class="area area-310120" area-name="奉贤区" style="left: 45%;top: 58%;width: 35%;height: 15%;"></div>
      <div class="area area-310130-1" area-name="崇明区" style="left: 36%;top: 10%;width: 12%;height: 5%;"></div>
      <div class="area area-310130-2" area-name="崇明区" style="left: 48%;top: 15%;width: 11%;height: 5%;"></div>
      <div class="area area-310130-3" area-name="崇明区" style="left: 60%;top: 19%;width: 12%;height: 5%;"></div>
      <div class="area area-310130-4" area-name="崇明区" style="left: 72%;top: 20%;width: 7%;height: 7%;"></div>

      <!--<div class="block">-->
      <!--<div class="card on">-->
      <!--<img class="car" src="/img/hotmap/car.png"/>-->
      <!--<span class="lq">沪A88888</span>-->
      <!--<img class="carpoint" src="/img/hotmap/point.png"/>-->
      <!--</div>-->
      <!--<div class="point">-->
      <!--<div class="dot"></div>-->
      <!--<div class="pulse"></div>-->
      <!--</div>-->
      <!--</div>-->

    </div>
  </div>
</div>
</template>

<script>
import config from '~/config.js'
import Mixin from '~/center/hotmap/hotmap-mixin.js'
export default {
  name: "operator-home",
  mixins: [Mixin],
  data(){
    return{
      areaKeys: ['310000','310112','310113','310114','310115','310116','310117','310118','310120','310130'],
      areaNum: {
        '310118': 2,
        '310115': 3,
        '310116': 3,
        '310130': 4,
      }
    }
  },

  methods:{
    connect() {
      let socket = new SockJS(config.socketUrl);//连接SockJs的endpoint
      this.stompClient = Stomp.over(socket)//使用STOMP子协议的WebSocket客户端
      this.stompClient.connect({}, (frame)=> {
        //console.log("Connected:"+frame);
        this.stompClient.subscribe("/topic/repair/count", (response)=> {
          let obj=JSON.parse(response.body);
          let usehxx= parseInt(obj.origin)==1? true: false
          let total=parseInt(obj.total).toLocaleString('en-US')
          $(".times span").html( '<span>'+total.slice(0, -2)+'</span><span class="underline">'+total.substr(-2,2)+'</span>')
          if(obj.vehicle) this.setPoint(obj.vehicle , usehxx, obj.locateCode)
        });
        this.stompClient.subscribe("/topic/corp/count", (response)=> {
          let obj=JSON.parse(response.body);
          let usehxx= parseInt(obj.origin)==1? true: false
          $("#corptotal").text(obj.total);
          $("#join").text(obj.join);
          // $("#join").text(obj.total);
          $("#using").text(obj.using);
          if(obj.locateCode) this.setPoint(false , usehxx, obj.locateCode)
        });
      }, (error)=> {
        console.log('Socket-error:',error)
        if(this.stompClient) this.stompClient.disconnect();
        setTimeout( ()=> {
          this.connect()
        },60000)
      });
    },
  },

}
</script>

<style lang="less" scoped>
  .hotmap{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    width: 60%;
    left: 30%;
  }
  .hotmap .line{
    width: 50%;
    position: absolute;
    top: 30%;
    left: -30%;
  }
  .hotmap .times{
    width: 60%;
    position: absolute;
    left: -40%;
    top:27.5%;
    text-align: center;
  }
  .hxxlogo{
    position: absolute;
    left: 3%;
    top:3%;
    width: 15%;
  }
  .hxxlogo .hxx-logo{
    width: 100%;
  }
  .hxxlogo .logostar{
    position: absolute;
    opacity: .5;
    width: 30%;
    right: -7%;
    bottom: -14%;
  }
  .mark{
    position: absolute;
    top:5%;
    right: 3%;
    width: 15%;
  }
  .slogan{
    position: absolute;
    bottom: 3%;
    right: 3%;
    width: 20%;
  }

  .shanghai{
    width: 20%;
    position: absolute;
    left: 25%;
    top: 6%;
  }

  .total{
    position: absolute;
    left: 5%;
    bottom: 10%;
    color: #00c0ff;
    font-size: 1.9vw;
    width: 23%;
    letter-spacing: .1vw
  }
  .total label{
    display: block;
    width: 100%;
    margin-bottom: 15%;
  }
  .total label:first-child{
    margin-bottom: 10%;
  }
  .total label.hasbg{
    /*background: url("/img/hotmap/kuang.png") no-repeat left center;*/
    /*background-size: 105% 100%;*/
    background: url("/img/hotmap/kuang.png") no-repeat -.3vw center;
    background-size: cover;
  }
  .total label span{
    width: 100%;
    height: 4vw;
    line-height: 4vw;
    padding-left: 55%;
    display: block;
  }
  .total label:nth-child(1) span{
    background: url("/img/hotmap/label1.png") no-repeat left center;
    background-size: 45% auto;
  }
  .total label:nth-child(2) span{
    background: url("/img/hotmap/label2.png") no-repeat 1.5vw center;
    background-size: 45% auto;
  }
  .total label:nth-child(3) span{
    background: url("/img/hotmap/label3.png") no-repeat 1.5vw center;
    background-size: 50% auto;
    padding-left: 60%;
  }
</style>
<style lang="less">
  @import '../hotmap/hotmap.less';
</style>
