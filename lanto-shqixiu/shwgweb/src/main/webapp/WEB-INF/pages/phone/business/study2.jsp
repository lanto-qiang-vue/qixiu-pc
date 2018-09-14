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
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br></span>
		</p>
		<p style="line-height: 2em; text-align: center; text-indent: 0em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 24px;">安亭驾校简介</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;"><br></span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海安亭机动车驾驶员培训有限公司（简称安亭驾校）成立于2013年7月是经上海市公安局交警总队、上海市交通港口局批准并经上海市工商局正式注册的专业机动车驾驶员培训学校。安亭驾校由通略驾校、通永驾校、东仁驾校三方合资共同创办，借鉴了国外先进服务理念并结合上海驾培行业现状，成功打造出全国领先的“计时教学考试模式”，受到学员们的广泛的青睐与关注，得到了上级政府的大力支持与肯定。</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">企业规模</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海安亭机动车驾驶员培训有限公司成立于2013年7月，场地占地面积150亩，师资人员100余名。</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">企业宗旨</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">&nbsp;&nbsp;安亭驾校始终秉承“学员至上，诚信为本”的企业宗旨，想学员之所想，急学员之所急，努力为学员提供优质的教学服务，起到机动车驾驶员计时培训模式扩大试点的基础模范作用。</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">企业特色</span>
		</p>
		<p style="line-height: 2em; text-indent: 2em;">
			<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">安亭驾校凭借“一人一车，轻松学车、计时收费，先学后付、规范教学，诚信服务、以人为本，求实创新”独具特色的经营理念和多种多样的服务项目走在了国内驾校的最前沿，是驾培行业的风向标。</span>
		</p>
		<p style="text-align: center;">
			<img src="https://static.shanghaiqixiu.org/images/2017/10/29/pic_1511937257159.jpg" title="" alt="demo.jpg">
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
