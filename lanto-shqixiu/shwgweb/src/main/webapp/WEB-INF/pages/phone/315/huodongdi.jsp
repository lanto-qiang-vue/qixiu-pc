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
		<span class="wenti">315现场活动会场地址</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine" style="height: 628px;font-size: 16px">
		<p>
			<br>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">主会场：&nbsp;上海市黄浦区南京东路587号 世纪广场 9:00-11:30</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">浦东分会场：上海市浦东新区龙东大道2777号 永达汽车广场 9：00-12:00</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">金山分会场：上海市金山区龙晧路1088号 万达广场 10:00-17:00</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">闵行分会场：上海市闵行区吴中路1504号&nbsp;爱琴海购物公园 10:00-17:00</span>
		</p>
		<p>
			<br>
		</p>
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
