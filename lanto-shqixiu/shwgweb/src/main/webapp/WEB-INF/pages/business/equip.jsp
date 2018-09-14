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
		<span class="wenti">汽保设备</span>
		<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
	</div>
	<div class="examine" >
		<%--<img src="https://static.shanghaiqixiu.org/images/2017/10/29/pic_1511959897722.jpg" />--%>
		<%--<img src="https://static.shanghaiqixiu.org/images/2017/10/29/pic_1511959923162.jpg" />--%>
		<img src="https://static.shanghaiqixiu.org/images/article/euip1.jpg"/>

			<p>
				<br/>
			</p>
			<p style="text-indent: 2em;">
				<span style="font-size: 16px;">上海中仕汽车设备有限公司坐落于国际金融城市上海市，是中大集团、中一汽保集团在上海的唯一授权经销商，专业从事汽车喷漆烤漆房、维修检测设备、工业涂装设备和工业集成气路等销售、安装和服务工作。公司经过多年的经营，对参与汽车制造厂、汽车4S店、机械制造企业设备规划和服务积累了丰富的经验，受到众多新老客户的好评。公司秉承“诚信为本”的经营理念，一直带领团队脚踏实地、深耕厚植，已经成长为汽保行业的佼佼者。</span>
			</p>
			<p style="text-indent: 2em;">
				<span style="font-size: 16px;">其生产厂中一汽保集团，是集科研、制造、贸易、投资于一体的高科技、多元化、国际化综合性企业集团。中一汽保集团以全新的产业发展模式，依托中国国际汽车后市场产业园基地，用全球一体化战略打造产业集群新龙头，以联合共赢新思维开创汽保行业新纪元。旗下拥有中一汽保、中大汽保、中仕汽保、仕通科技四大品牌，涵盖汽车喷漆烤漆房、汽车举升设备、汽车整形设备、自动洗车设备、轮胎拆装检测设备、汽车整厂配套等系列产品，目前已形成完善的市场网络，并和奔驰、宝马、大众、奥迪、通用、福特、本田、丰田等国内外著名汽车制造企业建立了良好的合作关系，产品远销美国、日本、德国、法国、俄罗斯、阿联酋等80多个国家，在国际市场上产生了广泛的影响，奠定了中一汽保在全球举足轻重的地位，以绝对的核心竞争力和崭新的形象引领着世界汽保行业。</span>
			</p>
			<p style="text-indent: 2em;">
				<span style="font-size: 16px;">联系方式：上海市静安区晋城路9号</span>
			</p>
			<p style="text-indent: 2em;">
				<span style="font-size: 16px;">联系人：庄先生，021-63062729,15021993638。</span>
			</p>

		<img src="https://static.shanghaiqixiu.org/images/2018/2/11/pic_1520760293927.jpg"/>
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
