<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<%--<%@ include file="/WEB-INF/pages/common/head.jsp"%>--%>
	<link rel="stylesheet" href="${btx}/js/layui-v2.1.6/layui/css/layui.css" type="text/css">
	<link rel="stylesheet" href="${btx}/js/lib/swipeslider.css">
	<script src="${btx}/js/jquery-1.10.2.min.js"></script>
	<script src="${btx}/js/layui-v2.1.6/layui/layui.all.js"></script>
	<script src="${btx}/js/lib/swipeslider.min.js"></script>
</head>
<style>

</style>
<body>
<div id="banner" class="swipslider">
	<ul class="sw-slides">
		<li class="sw-slide">
			<img  src="${btx}/img/temp/315banner-2.jpg" style="width: 100%;height: 100%">
			<a href="/phone/315/index" target="_blank" style="position: absolute;left: 60%;bottom: 20px;display: block;height: 30px;line-height:30px;padding: 0 10px;border: 1px solid white;color: white;font-size: 14px;text-align: center;font-weight: 100;">马上参与活动</a>
		</li>
		<li class="sw-slide">
			<img  src="${btx}/img/temp/315banner-3.jpg" style="width: 100%;height: 100%">
			<a href="/phone/315/wash" target="_blank" style="position: absolute;left: 60%;bottom: 20px;display: block;height: 30px;line-height:30px;padding: 0 10px;border: 1px solid white;color: white;font-size: 14px;text-align: center;font-weight: 100;">马上参与活动</a>
		</li>
	</ul>
</div>

<script type="text/javascript">
    $(function () {
        $('#banner').swipeslider({
            transitionDuration: 600,
            autoPlayTimeout: 8000,
            sliderHeight: '130px',
            autoPlay: true,
            prevNextButtons: false,
//            bullets: false
        });
    })

</script>
</body>

</html>
