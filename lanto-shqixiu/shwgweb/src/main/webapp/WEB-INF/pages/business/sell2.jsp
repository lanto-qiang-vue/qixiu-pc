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
	<span class="wenti">汽车销售</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<p style="text-align: center;">
		<span style="font-size: 24px;">上海万兴汽车实业有限公司简介</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;</span>
	</p>
	<p style="text-align: center;">
		<span style="font-size: 16px;">&nbsp;&nbsp;<img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511873612808.png" title="" alt="demo.jpg"/></span>
	</p>
	<p>
		<span style="font-size: 16px;">　　上海万兴汽车实业有限公司成立于1992年9月，注册资金210万美元，是一类汽车维修企业。厂区占地面积9000㎡、建筑面积2.5万㎡、生产场地4300 ㎡，维修工位101个。目前是上海通用汽车、美国通用欧宝汽车的特约售后服务中心。公司基盘客户近3万，年维修车辆近65000台次、营业额达8000万元，在上海通用范围内长期排名前列。</span>
	</p>
	<p>
		<span style="font-size: 16px;">公司现有员工165人，其中大中专文化程度以上的员工有100余人，另有高级工程师1名、工程师2名，高级技师6名、技师8名、高级工23名，专业维修技术力量过硬。</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司秉承“团结、务实、勤奋、创新、团结” 和“精细化管理，精品化服务”的精神，本着“诚实、守信、以客户满意为中心”的经营理念，始终保持“热情、主动、专业、高效”的工作作风，打造了具有万兴特色的服务品牌。</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司先后荣获：连续二次“上海名牌服务企业”、连续二次“上海市精神文明单位”、连续四次上海市交港局“AAA诚信服务企业”、“连续八次上海通用五星级特约售后服务中心”、中国汽车维修行业协会“全国汽车维修行业诚信企业”等一系列重要荣誉称号。</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上海市虹口区周家嘴路3055号&nbsp; 邮政编码：200093&nbsp; 电话65706076&nbsp;</span>
	</p>
	<p style="text-align: center;">
		<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511873646110.png" title="" alt="demo.jpg"/></span>
	</p>
	<p style="text-align: center;">
		<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/article/sell2_3.jpg" title="" alt="demo.jpg"/></span>
	</p>
	<p style="text-align: center;">
		<span style="font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511873698559.png" title="" alt="demo.jpg"/>&nbsp;</span>
	</p>
	<p style="text-align: center;">
		<br/>
	</p>
	<p style="text-align: center;">
		<br/>
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
