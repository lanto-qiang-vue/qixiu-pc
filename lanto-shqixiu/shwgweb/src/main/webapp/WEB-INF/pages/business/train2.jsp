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
	<span class="wenti">相关培训</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
	<div class="examine">
		<p style="text-align: center;">
			<span style="font-size: 24px;">上海市交通学校简介</span>
		</p>
		<p style="text-align: center;">
			<strong><span style="font-size: 24px;font-family: 黑体"><img src="https://static.shanghaiqixiu.org/images/article/train2_1.jpg" title="" alt="demo.jpg"/></span></strong>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">上海市交通学校1960年建校，国家级重点中专，上海市文明单位，上海市首批中高职教育贯通培养试点单位，“上海市职业教育名校长培养基地”第三期主持人单位，2013年4月被教育部批准为第三批“国家中等职业教育改革发展示范学校”建设单位。学校设立汽车运用与维修、物流服务与管理、船舶驾驶三大专业为核心的专业及专业群，其中《汽车运用与维修》、《物流服务与管理》、《船舶驾驶》专业为上海市中等职业学校精品特色专业，且《汽车运用与维修》专业是上海市首批试点“双证融通”的5个专业之一。学校实施校企合作育人，与上海通用、上海大众、日本丰田、美国PPG工业集团等大型企业建立了项目合作制；2007年12月发起建立上海交通物流职业教育集团，已形成“物流类+汽修类+水运类”三大类专业，在师资培训、校企合作开发专业教学标准、中高职衔接等方面实现成员单位资源共享；建有上海唯一培养内河航运紧缺人才的内河船员培训中心。学校近三年毕业生平均就业率达到98%以上，被誉为“培养交通人才的摇篮，学习汽车技术的基地”。</span>
		</p>
		<p style="text-align: center;">
			<strong><span style="font-size: 24px;font-family: 黑体"><span style="font-size: 19px;font-family: 宋体"><img src="https://static.shanghaiqixiu.org/images/article/train2_2.jpg" title="" alt="demo.jpg"/></span></span></strong>
		</p>
		<p style="text-align: center;">
			<strong><span style="font-size: 24px;font-family: 黑体"><span style="font-size: 19px;font-family: 宋体"><img src="https://static.shanghaiqixiu.org/images/article/train2_3.jpg" title="" alt="demo.jpg"/></span></span></strong>
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
