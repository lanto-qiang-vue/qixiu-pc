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
	<p class="p1" style="text-align: center;">
		<span style="font-size: 24px;"><br/></span>
	</p>
	<p class="p1" style="text-align: center;">
		<span style="font-size: 24px;">汽修行业2017年服务质量顾客满意度评价公布</span>
	</p>
	<p style="text-indent: 2em;">
		<span style="font-size: 16px;"><br/></span>
	</p>
	<p style="text-indent: 2em; line-height: 2em;">
		<span style="font-size: 16px;">近日，由市运输管理处委托第三方机构开展的2017年本市汽车维修行业服务质量顾客满意度评价出炉。2017年全市汽修行业服务质量顾客满意度为88.62，处于较满意状态。与2016年相比，各项大类指标的满意度均有不同幅度的上升。</span>
	</p>
	<p style="text-indent: 2em; line-height: 2em;">
		<span style="text-indent: 2em;">测评分“规范经营”、“环境整洁”、“维修质量”和“服务质量”四项大类指标，若干个具体指标。四项大类指标中，“规范经营”方面的满意度明显处于较高水平，而“维修质量”满意度评价最低。在2016年测评中满意度较低的“环境整洁”指标在2017年的测评中有大幅上升。从指标结果来看，保持了上升的趋势，但仍存在改进空间。因此，各汽修企业仍需在加快转型发展的同时，转变服务理念，以质量为第一服务为宗旨，为顾客营造良好的消费环境。</span>
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
