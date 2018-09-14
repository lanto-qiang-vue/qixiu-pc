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
		<span class="wenti">洗车抵用券使用说明</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine" style="font-size: 16px">
		<p>
			<br/>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">使用说明：</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;"><br/></span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">1)&nbsp;&nbsp;&nbsp;&nbsp; 到店后向商家出示洗车优惠券（打开App（或者微信），点击“我的优惠券”功能后便能查看到洗车优惠券）。</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">2)&nbsp;&nbsp;&nbsp;&nbsp; 7座及以下小型轿车可享受优惠洗车。</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">3)&nbsp;&nbsp;&nbsp;&nbsp; 本券只限洗车服务，不可抵用其他服务。</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">4)&nbsp;&nbsp;&nbsp;&nbsp; 每张洗车优惠券可抵用20元洗车费。</span>
		</p>
		<p style="text-indent: 2em; line-height: 1.5em;">
			<span style="font-size: 16px;">5)&nbsp;&nbsp;&nbsp;&nbsp; 一张洗车优惠券只能洗一辆车，并且在洗车优惠券有效期当天可使用，&nbsp;注：客服电话：400-663-8210。</span>
		</p>
		<p>
			<span class="layui-layer-setwin"></span><br/>
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
