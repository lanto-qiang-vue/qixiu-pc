<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
	<link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/layui.css" type="text/css">
	<%--<link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">--%>
	<script src="${btx}/js/jquery-1.10.2.min.js"></script>
	<script src="${btx}/js/layui-v2.1.6/layui/layui.all.js"></script>
	<%--<script src="${btx}/js/lib/swipeslider.min.js"></script>--%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<link rel="stylesheet" href="${btx}/css/phone.css" />
</head>
<style>

	.img {
		width: 100%;
	}
	.img .huiming{
		width: 45px;
		height: 20px;
		/*border: 1px solid black;*/
		position: absolute;
		right: 65px;
		bottom: 0;
		display: block;
	}

	.buttons{
		width: 200px;
		display: inline-block;
		position: relative;
		top: 75px;
		left: -25px;
	}

	.block{
		width: 40px;
		height: 64px;
		background-color: #cfa94f;
		position: relative;
		display: inline-block;
		text-align: center;
	}
	.block:before{
		content: "";
		border-right: 20px solid #cfa94f;
		border-top: 32px solid transparent;
		border-bottom: 32px solid transparent;
		position: absolute;
		left: -20px;
	}
	.block:after{
		content: "";
		border-left: 20px solid #cfa94f;
		border-top: 32px solid transparent;
		border-bottom: 32px solid transparent;
		position: absolute;
		right: -20px;
		z-index: -1;
	}
	.block.relate{
		background-color: #baa75d;
	}
	.block.relate:before{
		border-right: 20px solid #BAA75D;
	}
	.block.relate:after{
		border-left: 20px solid #BAA75D;
	}

	.block img{
		width: 30px;
		position: absolute;
		left: 5px;
		top: 10px;
	}
	.block p{
		position: absolute;
		color: #b7392e;
		left: -10px;
		bottom: 13px;
		font-size: 12px;
		width: 60px;
		text-align: center;
	}
	.block p:nth-child(3){
		bottom: 1px;
	}
	.refer{
		top: 66px;
		left: -44px;
	}
	.site{
		top: -33px;
		left: -26px;
	}
	.parts{
		left: -70px;
		top: 33px;
	}
	.chair{
		top: 32px;
		left: 61px;
	}
	.learn{
		top: -67px;
		left: 80px;
	}
	.relate{
		left: 35px;
	}
	.pull{
		top: -101px;
		left: 53px;
	}
	.train{
		top: -101px;
		left: 141px;
	}
	.insure{
		top: -35px;
		left: 98px;
	}
</style>
<body>

<div class="supervision">
	<div class="pro_t">
		<span class="wenti">汽修平台操作指南</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine">
		<img class="img" src="${btx}/images/czzninfo.jpg"/>
	</div>
</div>


<script type="text/javascript">
$(function () {

    var userAgent= navigator.userAgent
    var android= userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1

    $(".refer").click(function () {
        if(android)
            window.JSInterface.gotoCdf()//android 方法
        else
            gotoCdf()

    })

})

</script>
</body>

</html>
