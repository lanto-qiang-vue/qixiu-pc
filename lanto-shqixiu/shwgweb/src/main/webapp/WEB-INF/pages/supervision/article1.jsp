<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<%--<script src="${btx}/js/kindeditor/kindeditor-all-min.js"></script>--%>
<%--<script src="${btx}/js/kindeditor/lang/zh_CN.js"></script>--%>
<%--<script src="${btx}/js/front/expert.js"></script>--%>
<%--<script src="${btx}/js/front/cdf.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="supervision">
<div class="pro_t">
	<span class="wenti">满意度调查</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" style="font-size: 16px">
	<p style="line-height: 2em;">
		<span style="font-family: 微软雅黑;"><br/></span>
	</p>
	<p style="line-height: 2em; text-align: center;">
		<span style="font-family: 微软雅黑; font-size: 24px;">2016年汽修行业服务质量顾客满意度结果公布</span>
	</p>
	<p style="line-height: 2em;">
		<span style="font-family: 微软雅黑;"><br/></span>
	</p>
	<p style="text-indent: 2em; line-height: 2em;">
		<span style="font-family: 微软雅黑;font-size: 16px;">市运输管理处委托第三方机构对汽车维修行业的服务质量顾客满意度开展测评，在双方的共同努力和密切配合下，2016年测评工作基本完成。2016年上海市汽车维修行业的服务质量顾客满意度为85.26，处于较满意状态，较上一年的84.64相比稍有上升。</span>
	</p>
	<p style="text-indent: 2em; line-height: 2em;">
		<span style="font-family: 微软雅黑;font-size: 16px;">测评结果显示，2016年度上海市汽车维修服务质量各大类指标的满意度中，“规范经营”方面的满意度明显处于较高水平；而“维修质量”和“环境整洁”的满意度相对较低。与2015年比较，各项大类指标中，除了“规范经营”的满意度较2015年出现了一定幅度的下降，其他各大类指标的满意度均有不同幅度的上升。</span>
	</p>
	<p style="text-indent: 2em; line-height: 2em;">
		<span style="font-family: 微软雅黑;font-size: 16px;">通过测评，不仅可以帮助发现维修企业存在的不足之处，不断地完善和提高维修企业管理水平。同时也有利于各级道路运输管理机构明确下一步的工作重点和监管方向，进一步提升行业客户满意度。</span>
	</p>
	<p style="line-height: 2em;">
		<span style="font-family: 微软雅黑;">&nbsp;</span>
	</p>
	<p>
		<br/>
	</p>
</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
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
