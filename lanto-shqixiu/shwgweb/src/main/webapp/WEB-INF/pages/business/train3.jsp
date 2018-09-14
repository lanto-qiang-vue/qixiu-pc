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
			<span style="font-size: 24px;">上海公用职业技术培训学校简介</span>
		</p>
		<p>
			<span style="font-size: 24px;"><br/></span>
		</p>
		<p style="text-align: center;">
			<span style="font-size: 24px;"><img src="https://static.shanghaiqixiu.org/images/article/train3_1.jpg" title="" alt="demo.jpg"/></span>
		</p>
		<p style="text-indent:37px">
			<span style="font-size:19px"><br/></span>
		</p>
		<p style="text-indent:37px">
			<span style="font-size:19px"><br/></span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">上海公用职业技术培训学校（以下简称：公用培训学校）是隶属上海市交通委的社会力量办学机构，主要从事汽车维修相关专业的培训和考核，是目前上海唯一开展汽修工程师培训的学校。自2000年成立以来，公用培训学校及其下属上海市第33国家职业技能鉴定所和交通行业特有工种职业技能鉴定站，在市交通委、市汽车维修行业协会和市公用事业学校的大力支持帮助下，先后投资近400余万建设了近1000平方米的专用实训教室和计算机房，由本校和外聘的一流教师团队担任理论和操作授课，各项培训的及格率始终名列全国前茅。</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">公用培训学校始终秉承“证书+能力提高”的办班宗旨，拥有一支专业教学团队，精心打造，全程实施规范教学，使学员在获得证书的同时，能系统学习专业知识，大幅度提高专业工作能力，培养学员成为汽车维修行业技术骨干和未来的“上海工匠”。</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">目前培训的项目有：汽车维修工（初级、中级、高级、技师）、汽车电器维修工（初级、中级、高级）、汽车涂装修复工（初级、中级、高级）、汽车车身整形修复工（初级、中级、高级）、机动车检测维修工程师、行业专项培训等，年培训量在5000人次左右，培训合格率在90%以上，等级工培训项目可享受80%以上的政府培训补贴。&nbsp; </span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">欢迎您报名参加培训。</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">报名时间： 周一～周六&nbsp;&nbsp;&nbsp; 9:00～15:00</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">报名地址：上海市徐汇区凯旋路2050号1号楼112室</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;">（交通：地铁.3、4、9、10号线到虹桥路站或宜山路站下；26、44、72、76、113、548、572、754、836、911）咨询电话：64163776&nbsp;&nbsp;&nbsp; 井老师&nbsp; 缪老师</span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;"><br/></span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;"><br/></span>
		</p>
		<p style="text-indent: 2em; text-align: center;">
			<span style="font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/article/train3_2.jpg" title="" alt="demo.jpg"/></span>
		</p>
		<p style="text-indent: 2em;">
			<span style="font-size: 16px;"><br/></span>
		</p>
		<p style="text-indent: 2em; text-align: center;">
			<span style="font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/article/train3_3.jpg" title="" alt="demo.jpg"/></span>
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
