<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<head>
    <%@ include file="/WEB-INF/pages/common/icon.jsp"%>
    <%@ include file="/WEB-INF/pages/common/head.jsp"%>
    <script src="${btx}/js/front/login.js"></script>
<style>
    *{margin:0;padding:0;box-sizing: border-box;}
    li{list-style:none}
    a{color: inherit;text-decoration: none;}
    input{border:0;outline:none;}

    html, body {
        min-width: 900px;
        min-height: 100%;
    }
    body{
        background: url(${btx}/images/315/315iconbg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
        height: 850px;
    }
    .img{
        width: 900px;
        position: relative;
        display: inline-block;
    }
    .img img{
        width: 100%;
    }
    .img .huiming{
        width: 130px;
        height: 60px;
        /*border: 1px solid black;*/
        position: absolute;
        right: 200px;
        bottom: 5px;
        display: block;
    }

    .buttons{
        width: 360px;
        display: inline-block;
        position: relative;
        top:100px;
    }
    .block{
        width: 60px;
        height: 104px;
        background-color: #cfa94f;
        position: relative;
        display: inline-block;
        text-align: center;
    }
    .block:before{
        content: "";
        border-right: 30px solid #cfa94f;
        border-top: 52px solid transparent;
        border-bottom: 52px solid transparent;
        position: absolute;
        left: -30px;
    }
    .block:after{
        content: "";
        border-left: 30px solid #cfa94f;
        border-top: 52px solid transparent;
        border-bottom: 52px solid transparent;
        position: absolute;
        right: -30px;
        z-index: -1;
    }
    .block:hover{
        background-color: #e4d171;
    }
    .block:hover:before{
        border-right-color: #e4d171;
    }
    .block:hover:after{
        border-left-color: #e4d171;
    }

    .block.relate{
        background-color: #baa75d;
    }
    .block.relate:before{
        border-right: 30px solid #BAA75D;
    }
    .block.relate:after{
        border-left: 30px solid #BAA75D;
    }

    .block img{
        width: 40px;
        position: absolute;
        left: 10px;
        top: 15px;
    }
    .block p{
        position: absolute;
        color: #b7392e;
        left: -20px;
        bottom: 30px;
        font-size: 16px;
        width: 100px;
        text-align: center;
    }
    .block p:nth-child(3){
        bottom: 10px;
    }
    .refer{
        top: 107px;
        left: -64px;
    }
    .site{
        top: -53px;
        left: -36px;
    }
    .parts{
        top: 54px;
        left: -100px;
    }
    .chair{
        top: 161px;
        left: -164px;
    }
    .learn{
        top: -107px;
        left: 183px;
    }
    .relate{
        /*top: 108px;*/
        left: 119px;
    }
    .pull{
        top: -161px;
        left: 147px;
    }
    .train{
        top: -53px;
        left: 84px;
    }
    .insure{
        top: 54px;
        left: 20px;
    }
</style>
</head>
<body>
<div class="img">
    <img src="${btx}/images/315/315icon.png">
    <a class="huiming" href="/315/youhui"></a>
</div>
<br/>

<div class="buttons">
    <a href="/315/comlist">
        <div class="block com">
            <img src="${btx}/images/315/诚信企业.png"/>
            <p>维修企业</p>
            <p>优惠活动</p>
        </div>
    </a>
    <a href="/cdf" target="_blank">
        <div class="block refer">
            <img src="${btx}/images/315/咨询专家.png" style="width: 25px;left: 17px;"/>
            <p>专家咨询</p>
        </div>
    </a>
    <a href="/315/huodongdi">
    <div class="block site">
        <img src="${btx}/images/315/315活动地.png"/>
        <p>315</p>
        <p>活动地</p>
    </div>
    </a>
    <a href="/business/train" target="_blank">
    <div class="block parts">
        <img src="${btx}/images/315/配件真假.png"/>
        <p>人才培训</p>
    </div>
    </a>
    <a href="/315/weiquan" target="_blank">
    <div class="block chair">
        <img src="${btx}/images/315/维权讲座.png" style="width: 25px;left: 17px;"/>
        <p>维权讲座</p>
    </div>
    </a>
    <a href="/business/study4" target="_blank">
    <div class="block learn">
        <img src="${btx}/images/315/学驾优惠.png"/>
        <p>学驾优惠</p>
    </div>
    </a>

    <div class="block relate">
        <img src="${btx}/images/315/315相关产业活动.png"/>
        <p>315相关</p>
        <p>产业活动</p>
    </div>

    <a href="/maintain?flag=qcjy" target="_blank">
    <div class="block pull">
        <img src="${btx}/images/315/牵引服务.png"/>
        <p>牵引服务</p>
    </div>
    </a>
    <a href="/business/equip" target="_blank">
    <div class="block train">
        <img src="${btx}/images/315/汽保设备培训.png"/>
        <p>汽保设备</p>
    </div>
    </a>
    <a href="/business/insure" target="_blank">
    <div class="block insure">
        <img src="${btx}/images/315/保险.png" style="width: 25px;left: 17px;"/>
        <p>保险</p>
        <p>定损</p>
    </div>
    </a>
</div>

<script>
$(function () {
    $(".select>li, .sub").hover(function () {
        $(this).children(".sub").show()
    })

    $(".select>li, .sub").mouseleave(function () {
        $(".sub").hide()
    })
})
</script>
</body>
</html>
