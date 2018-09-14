<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%--<%@ include file="/WEB-INF/pages/common/icon.jsp"%>--%>
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="format-detection" content="telephone=no">
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<link rel="stylesheet" href="${btx}/css/phone.css" />
<%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
<%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
<%--<script src="${btx}/js/front/expert.js"></script>--%>
<%--<script src="${btx}/js/front/cdf.js"></script>--%>
</head>
<body>
<%--<%@ include file="/WEB-INF/pages/common/nav.jsp"%>--%>
<div class="about">
	<%--<img class="bg" src="/statics/images/about_bg.jpg">--%>
	<div class="msg" style="width: 100%">
		<img src="/statics/images/about_msg.jpg" style="width: 90%">
	</div>
	<div class="msg" style="height: auto;width: 100%">
		<div class="">
			<p>请使用以下方式联系我们：</p>
			<i></i>
			<p>服务热线：400-663-8210 </p>
			<p>邮箱：contact@lantoev.com</p>
		</div>
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
