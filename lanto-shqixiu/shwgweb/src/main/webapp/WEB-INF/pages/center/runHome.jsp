<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <link rel="stylesheet" href="/statics/css/hotmap.css">
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
<div class="zhengwu_r">
<div class="zhengwu_t">
<span class="sp_zw">运营商中心首页</span>
<div class="layui-btn layui-btn-normal" style="margin-left: 10px" onclick="fullscreen()">全屏</div>
<span class="sp_wz">您所在位置：<a href="/center/runHome">运营商中心</a> > <span>首页</span></span>
</div>
<div class="biaoge">

    <div class="hxxlogo">
        <img class="hxx-logo" src="/statics/img/hotmap/logo.png"/>
        <img class="logostar" src="/statics/img/hotmap/logostar.png"/>
    </div>
    <img class="mark" src="/statics/img/hotmap/mark.png"/>
    <img class="slogan" src="/statics/img/hotmap/slogan.png"/>

    <img class="shanghai" src="/statics/img/hotmap/shanghai.png"/>

    <div class="total mnypjt">
        <label><span id="corptotal">54321</span></label>
        <label class="hasbg"><span id="join">54321</span></label>
        <label class="hasbg"><span id="using">54321</span></label>
    </div>


    <div class="hotmap">
        <img class="mainmap" src="/statics/img/hotmap/map.png" />
        <img class="star" src="/statics/img/hotmap/star1.png" />
        <img class="star2" src="/statics/img/hotmap/star2.png" />
        <img class="line" src="/statics/img/hotmap/line.png" />
        <div class="times">
            <img src="/statics/img/hotmap/weixiu.png"/>
            <span class="lq">56,789</span>
            <img src="/statics/img/hotmap/liangci.png"/>
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

        <%--<div class="block">--%>
            <%--<div class="card on">--%>
                <%--<img class="car" src="/statics/img/hotmap/car.png"/>--%>
                <%--<span class="lq">沪A88888</span>--%>
                <%--<img class="carpoint" src="/statics/img/hotmap/point.png"/>--%>
            <%--</div>--%>
            <%--<div class="point">--%>
                <%--<div class="dot"></div>--%>
                <%--<div class="pulse"></div>--%>
            <%--</div>--%>
        <%--</div>--%>

    </div>
</div>
</div>
</div>


<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
<script src="/statics/js/websocket/sockjs.min.js"></script>
<script src="/statics/js/websocket/stomp.min.js"></script>
</body>
<script type="text/javascript">
    var areaKeys=['310000','310112','310113','310114','310115','310116','310117','310118','310120','310130']
    var stompClient = null;
$(function () {

//    setInterval(function () {
//        var card= parseInt(100*Math.random())>40?'沪A88888':''
//        var usehxx= parseInt(100*Math.random())>60?true:false
//        var area= ''
//        setPoint(card, usehxx, area)
//    },2000)
//    setPoint('沪A88888', true, '310116')
    connect()

})
function connect() {
    var socket = new SockJS(socketu);//连接SockJs的endpoint
    stompClient = Stomp.over(socket)//使用STOMP子协议的WebSocket客户端
    stompClient.connect({},function (frame) {
        //console.log("Connected:"+frame);
        stompClient.subscribe("/topic/repair/count",function (response) {
            var obj=JSON.parse(response.body);
            var usehxx= parseInt(obj.origin)==1? true: false
            var total=parseInt(obj.total).toLocaleString('en-US')
            $(".times span").html( '<span>'+total.slice(0, -2)+'</span><span class="underline">'+total.substr(-2,2)+'</span>')
            if(obj.vehicle) setPoint(obj.vehicle , usehxx, obj.locateCode)
        });
        stompClient.subscribe("/topic/corp/count",function (response) {
            var obj=JSON.parse(response.body);
            var usehxx= parseInt(obj.origin)==1? true: false
            $("#corptotal").text(obj.total);
            $("#join").text(obj.join);
            $("#using").text(obj.using);
            if(obj.locateCode) setPoint(false , usehxx, obj.locateCode)
        });
    },function (error) {
        console.log('Socket-error:',error)
        if(stompClient) stompClient.disconnect();
        setTimeout(function () {
            connect()
        },60000)
    });
}

function setPoint(vehicle, usehxx, areaKey, showTime) {
    var id ='id-'+ makeid(5), area= areaKey || areaKeys[ Math.floor(Math.random()*10+ 1)];
    html='<div class="block" id="'+ id+'" style="'+getLoc()+'">' +
        (vehicle?('            <div class="card">' +
        '                <img class="car" src="/statics/img/hotmap/car.png"/>' +
        '                <span class="lq">'+vehicle+'</span>' +
        '                <img class="carpoint" src="/statics/img/hotmap/point.png"/>' +
        '            </div>'):'') +
        '            <div class="point '+(usehxx?'yellow':'')+'">' +
        '                <div class="dot"></div>' +
        '                <div class="pulse"></div>' +
        '            </div>' +
        '        </div>';

    $(getArea(area)).append(html)

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
}

function getArea(key) {
    var className='', num={
        '310118': 2,
        '310115': 3,
        '310116': 3,
        '310130': 4,
    };
    for( var i in num){
        if(key==i){
            className='.area-'+key+'-'+ Math.floor(Math.random()*num[i]+ 1)
        }
    }
    if(!className) className='.area-'+key

    return className
}
function getLoc() {
    var top=parseInt(100*Math.random()),left=parseInt(100*Math.random()), style=''
    style= 'left: '+left+'%;top: '+top+'%;'
    return style
}

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function fullscreen() {
    document.querySelector('.biaoge').classList.add("allscreen")
    var docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}
window.onresize = function() {
    if (!checkFull()) {
        document.querySelector('.biaoge').classList.remove("allscreen")
    }
}
function checkFull() {
    var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
    //to fix : false || undefined == undefined
    if (isFull === undefined) {isFull = false;}
    return isFull;
}
</script>
</html>
