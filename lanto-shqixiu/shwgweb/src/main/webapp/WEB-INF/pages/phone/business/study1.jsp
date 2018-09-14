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
		<span class="wenti">推荐服务</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine">
		<p style="line-height: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br></span>
		</p>
		<p style="line-height: 2em; text-align: center;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 24px;">上海云之驾科技股份有限公司</span>
		</p>
		<p style="line-height: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br></span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">2013年12月18日，<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>的第一家连锁驾校：<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">上海云之驾科技股份有限公司</span>（简称<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>）迎来了第一批学员。</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>采用“先学后付，计时收费，一人一车，四个自主”的<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>模式。</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>是您我共同圆梦的地方，让我们一起携手把“<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; text-align: center;">云之驾</span>品牌”创建的更加美好！</span>
		</p>
		<p style="text-align: center;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><img src="https://static.shanghaiqixiu.org/images/2017/10/29/pic_1511937756850.jpg" title="" alt="demo.jpg"></span>
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
