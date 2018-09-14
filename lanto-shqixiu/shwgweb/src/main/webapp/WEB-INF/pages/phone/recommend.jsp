<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>

<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<link rel="stylesheet" href="${btx}/css/phone.css" />

</head>
<body>
<%--<%@ include file="/WEB-INF/pages/common/nav.jsp"%>--%>
<div class="supervision">
	<div class="pro_t">
		<span class="wenti">优质企业推荐</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine">
		<ul class="zhengwu_c" id="dataBody">
			<li><a href="/phone/recommend1">2016年度全市机动车维修企业诚信考核等级AAA级企业</a></li>
			<li><a href="/phone/recommend2">上海市获得2015—2016年度全国汽车维修行业诚信企业</a></li>
			<li><a href="/phone/recommend3">上海名牌企业</a></li>
		</ul>
	</div>
</div>
<%--<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>--%>
</body>
<script type="text/javascript">
$(function () {
//    layui.use('form', function() {
        var form = layui.form;
        form.render();
//    })
})
var speed=40
function Marquee(){
if(expertlist2.offsetTop-expertlist.scrollTop<=0)
	expertlist.scrollTop-=expertlist1.offsetHeight
else{
	expertlist.scrollTop++
}
}
var MyMar;
if($("#expertlist1").children().length > 5){
	expertlist2.innerHTML=expertlist1.innerHTML
	MyMar=setInterval(Marquee,speed);
	expertlist.onmouseover=function() {clearInterval(MyMar)}
	expertlist.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
}
var nums = 11; //每页出现的数据量
</script>
</html>
