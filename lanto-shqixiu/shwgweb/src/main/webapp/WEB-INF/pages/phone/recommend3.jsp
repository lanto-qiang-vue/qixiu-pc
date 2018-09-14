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
		<div class="detailpage">


			<p>
				<br>
			</p>
			<p style="line-height: 2em; text-align: center; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 24px;">上海名牌企业</span>
			</p>
			<p>
				<br>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">1、上海永达汽车经营服务有限公司</span>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">2、上海万兴汽车实业有限公司</span>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">3、上海幼狮高级轿车修理有限公司</span>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">4、上海永达汽车浦东销售有限公司</span>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">5、上海东昌汽车服务有限公司</span>
			</p>
			<p style="line-height: 2em; text-indent: 2em;">
				<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">6、上海冠松汽车服务有限公司</span>
			</p>
			<p>
				<br>
			</p>
			<p>
				<br>
			</p>
			<p>
				<br>
			</p>
			<p>
				<br>
			</p><br>
			<p>
				<br>
			</p>
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
