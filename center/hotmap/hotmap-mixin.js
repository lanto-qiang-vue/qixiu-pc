export default {
  data(){
    return{
      stompClient: null
    }
  },
  mounted(){
    $('body').addClass('hot-map')

    window.onresize = ()=> {
        if (!this.checkFull()) {
          document.querySelector('.map-body').classList.remove("allscreen")
        }
    }

    $.getScript('/libs/websocket/sockjs.min.js',()=>{
      $.getScript('/libs/websocket/stomp.min.js',()=>{
        this.connect()
      })
    })

    // setInterval( ()=> {
    //    var card= parseInt(100*Math.random())>40?'沪A88888':''
    //    var usehxx= parseInt(100*Math.random())>60?true:false
    //    var area= ''
    //    this.setPoint(card, usehxx, area)
    // },2000)
    // this.setPoint('沪A88888', true, '310116')
  },
  methods:{
    getArea(key) {
      let className='', num= this.areaNum;
      for( let i in num){
        if(key==i){
          className='.area-'+key+'-'+ Math.floor(Math.random()*num[i]+ 1)
        }
      }
      if(!className) className='.area-'+key

      return className
    },
    setPoint(vehicle, usehxx, areaKey, showTime) {
      let id ='id-'+ this.makeid(5), area= areaKey || this.areaKeys[ Math.floor(Math.random()*10+ 1)];
      let html='<div class="block" id="'+ id+'" style="'+this.getLoc()+'">' +
        (vehicle?('            <div class="card">' +
          '                <img class="car" src="/img/hotmap/car.png"/>' +
          '                <span class="lq">'+vehicle+'</span>' +
          '                <img class="carpoint" src="/img/hotmap/point.png"/>' +
          '            </div>'):'') +
        '            <div class="point '+(usehxx?'yellow':'')+'">' +
        '                <div class="dot"></div>' +
        '                <div class="pulse"></div>' +
        '            </div>' +
        '        </div>';

      $(this.getArea(area)).append(html)

      setTimeout(function () {
        $("#"+id+ ' .card').addClass('on')
        setTimeout(function () {
          $("#"+id+ ' .card').removeClass('on')
          $("#"+id).addClass('disappear')
          setTimeout(function () {
            $("#"+id).remove()
          },1000)
        },showTime||3000)
      },50)
    },

    getLoc() {
      let top=parseInt(100*Math.random()),left=parseInt(100*Math.random()), style=''
      style= 'left: '+left+'%;top: '+top+'%;'
      return style
    },
    makeid(length) {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( let i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
    fullscreen() {
      document.querySelector('.map-body').classList.add("allscreen")
      let docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    checkFull() {
      return document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullScreenElement ||
        document.msFullScreenElement ||
        false;
    }
  },
  beforeRouteLeave (to, from, next) {
    $('body').removeClass('hot-map')
    if(this.stompClient) this.stompClient.disconnect()
    next()
  }
}
