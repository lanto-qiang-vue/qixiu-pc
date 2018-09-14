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
		<span class="wenti">二手车市场</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine">
		<p style="text-align: center;">
			<span style="font-size: 24px;">上海永达汽车浦东销售服务有限公司介绍&nbsp;&nbsp;</span>
		</p>
		<p>
			<span style="font-size: 24px;"><br></span>
		</p>
		<p style="text-align: center;">
			<span style="font-size: 24px;"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511874138725.png" title="" alt="demo.jpg"></span>
		</p>
		<p>
			<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为一汽—大众特许经销商，永达奥迪汽车销售服务中心是按照德国奥迪全球统一标准设计建造的，地处繁华的陆家嘴金融贸易区，总占地面积11400平方米，是集销售、维修、纯正零部件及信息管理“四位一体”的销售服务中心，并通过ISO9001：2000版质量管理体系认证。</span>
		</p>
		<p>
			<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作为奥迪特约维修站的我们，将诚信服务理念深入贯彻到我们日常工作的每一处细节、每一个环节中去。首先，我们有一流的硬件设施，维修车间占地2000多平方米，可承担每月千台以上的维修量，是上海地区最大的奥迪汽车维修站之一；车间各项设备配置齐全，具备世界先进的汽保、检测设备；专业的维修工程师、标准化的维修操作规程，全天候施救抢修服务，高效的网络管理机制，严格科学的管理手段，全力打造一流的奥迪服务品牌。这些保证了我们能够给用户提供一流的服务，给用户车辆提供全天候的悉心呵护！</span>
		</p>
		<p>
			<span style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们维修开展四季服务活动，提供车辆免费检测活动，让车主在长假期间放心出行。在此期间所有车辆都享受免费检测的优惠，免费添加各种油液。除此之外，还有精美的纪念品赠送用户，让用户真正得到实惠，这也是我们真情回馈广大用户的支持所做的一些事情。夏天的空调杀菌及除臭活动、冬天的防冻液免费添加，每一次我们都走在了前面，替用户着想，让用户满意是我们不断追求的目标。&nbsp; &nbsp;</span>
		</p>
		<p style="text-align: center;">
			<img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511874165837.png" title="" alt="demo.jpg">
		</p>
		<p style="text-align: center;">
			<img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511874184517.png" title="" alt="demo.jpg">
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
