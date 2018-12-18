<template>
  <div style="position: relative;">
    <Button type="primary" @click="fullscreen" style="position: absolute;right: 10px;top: -36px;">全屏</Button>
    <div class="map-body">
      <div class="hxxlogo">
        <img class="hxx-logo" src="/img/hotmap/shandong/logo.png"/>
        <img class="logostar" src="/img/hotmap/logostar.png"/>
      </div>
      <img class="mark" src="/img/hotmap/shandong/mark.png"/>
      <img class="slogan" src="/img/hotmap/shandong/slogan.png"/>

      <img class="shandong" src="/img/hotmap/shandong/shandong.png"/>

      <div class="total mnypjt">
        <label><span id="corptotal">test-54321</span></label>
        <label class="hasbg"><span id="join">test-54321</span></label>
        <!--<label class="hasbg"><span id="using">test-54321</span></label>-->
      </div>


      <div class="hotmap">
        <img class="mainmap" src="/img/hotmap/shandong/map.png" />
        <img class="star" src="/img/hotmap/shandong/star1.png" />
        <img class="star2" src="/img/hotmap/shandong/star2.png" />
        <img class="line" src="/img/hotmap/shandong/line.png" />
        <div class="times">
          <img src="/img/hotmap/weixiu.png"/>
          <span class="lq">56,789</span>
          <img src="/img/hotmap/liangci.png"/>
        </div>


        <div class="area area-371500" area-name="聊城市" style="left: 10%;top: 38%;width: 11%;height: 17%;"></div>
        <div class="area area-371400" area-name="德州市" style="left: 20%;top: 22%;width: 10%;height: 20%;"></div>
        <div class="area area-371600" area-name="滨州市" style="left: 35%;top: 14%;width: 10%;height: 16%;"></div>
        <div class="area area-370500" area-name="东营市" style="left: 44%;top: 13%;width: 9%;height: 22%;"></div>
        <div class="area area-370700" area-name="潍坊市" style="left: 47%;top: 33%;width: 15%;height: 22%;"></div>
        <div class="area area-370600-1" area-name="烟台市" style="left: 68%;top: 21%;width: 16%;height: 12%;"></div>
        <div class="area area-370600-2" area-name="烟台市" style="left: 73%;top: 33%;width: 10%;height: 10%;"></div>
        <div class="area area-371000" area-name="威海市" style="left: 86%;top: 26%;width: 11%;height: 12%;"></div>
        <div class="area area-370100" area-name="济南市" style="left: 28%;top: 27%;width: 6%;height: 23%;"></div>
        <div class="area area-371200" area-name="莱芜市" style="left: 33%;top: 46%;width: 8%;height: 9%;"></div>
        <div class="area area-370300" area-name="淄博市" style="left: 38%;top: 30%;width: 7%;height: 27%;"></div>
        <div class="area area-370200-1" area-name="青岛市" style="left: 61%;top: 34%;width: 13%;height: 12%;"></div>
        <div class="area area-370200-2" area-name="青岛市" style="left: 65%;top: 44%;width: 10%;height: 12%;"></div>
        <div class="area area-370900" area-name="泰安市" style="left: 23%;top: 52%;width: 15%;height: 10%;"></div>
        <div class="area area-371700" area-name="菏泽市" style="left: 6%;top: 61%;width: 13%;height: 26%;"></div>
        <div class="area area-370800" area-name="济宁市" style="left: 18%;top: 61%;width: 15%;height: 18%;"></div>
        <div class="area area-370400" area-name="枣庄市" style="left: 30%;top: 73%;width: 8%;height: 16%;"></div>
        <div class="area area-371300" area-name="临沂市" style="left: 38%;top: 59%;width: 13%;height: 28%;"></div>
        <div class="area area-371100" area-name="日照市" style="left: 50%;top: 59%;width: 10%;height: 13%;"></div>

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
  name: "shandong-hotmap",
  mixins: [Mixin],
  data(){
    return{
      areaKeys: ['370100','370200','370300','370400','370500','370600','370800','371100','371200','371300','371600','371700', '371000'],
      areaNum: {
        '370600': 2,
        '370200': 2,
      }
    }
  },
  methods:{
    connect() {
      let socket = new SockJS(config.shandongSocket);//连接SockJs的endpoint
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
    width: 80%;
    left: 13%;
  }
  .hotmap .line{
    width: 42%;
    position: absolute;
    top: 10%;
    left: 53%;
  }
  .hotmap .times{
    width: 50%;
    position: absolute;
    left: 53%;
    top: 7%;
    text-align: center;
  }
  .hotmap .star, .hotmap .star2{
    left: -3%;
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
    top: 25%;
    left: 3%;
    width: 15%;
  }
  .slogan{
    position: absolute;
    bottom: 1%;
    left: 3%;
    width: 20%;
  }

  .shandong{
    width: 15%;
    position: absolute;
    right: 3%;
    top: 50%;
  }

  .total{
    position: absolute;
    right: 3%;
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
    margin-bottom: 5%;
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
