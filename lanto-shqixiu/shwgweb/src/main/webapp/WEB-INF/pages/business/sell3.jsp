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
		<span style="font-size: 24px;">上海东昌汽车服务有限公司简介</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img src="https://static.shanghaiqixiu.org/images/article/sell3_1.jpg" title="" alt="demo.jpg"/></span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 上海东昌汽车服务有限公司坐落于上海市浦东新区浦建路1281-1285号，是上海通用汽车有限公司首批授权的销售中心与授权特约售后服务中心，经营别克全系列品牌。隶属于全国汽车服务业首获国家工商总局认定的中国驰名商标、上海市著名商标、上海名牌、全国十佳经销商“东昌汽车”。多年来连续被上海通用授予“五星级销售”、“五星级售后服务中心”称号。</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;凭借东昌汽车拥有的全国呼叫中心“96800汽车服务万事通”、“汽车救援与知识服务公共平台”的强大影响力，公司向全社会公开承诺提供“诚信、规范、专业”的服务。</span>
	</p>
	<p>
		<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司进行严格、科学的管理，2011年荣获上海市质量管理奖。公司严格遵守上海市汽车维修行业的相关规定，严格执行上海通用关于维修业务的DOS4.0操作流程，公司具有一类汽车维修资质，维修设施先进、齐全，并拥有多名通用车系的国内顶尖维修技术大师。公司大力推广以“做好每件事，努力每一天”为精髓的企业文化，秉承“让顾客满意”的宗旨，一切从客户的需要和利益出发，热忱接待、精心修理，以满腔热情的态度和精湛纯熟的技艺做出一流的修理品质，让客户实现物超所值的期望。</span>
	</p>
	<p style="text-align: center;">
		<span style="font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511871431865.png" title="" alt="demo.jpg"/></span>
	</p>
	<p style="text-align: center;">
		<span style="font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511871464520.png" title="" alt="demo.jpg"/></span>
	</p>
	<p style="text-align: center;">
		<span style="font-size: 16px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511871505330.png" title="" alt="demo.jpg"/></span>
	</p>
	<p style="text-align: center;">
		<span style="font-size: 16px;">企业注册商标图案&nbsp;</span>
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
