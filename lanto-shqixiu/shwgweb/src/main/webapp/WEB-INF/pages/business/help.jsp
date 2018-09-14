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
	<span class="wenti">故障救援</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<table width="920" style="width: 828px;">
		<tbody>
		<tr style=";height:40px" class="firstRow">
			<td width="920" colspan="6" style="padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 18px;"><strong><span style="font-family: 宋体;">本市道路清障施救牵引企业名录</span></strong></span>
				</p>
			</td>
		</tr>
		<tr style=";height:40px">
			<td width="25" style="border-width: 1px; border-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">序号</span>
				</p>
			</td>
			<td width="174" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">业户名称</span>
				</p>
			</td>
			<td width="142" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">许可证编号</span>
				</p>
			</td>
			<td width="246" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">经营地址</span>
				</p>
			</td>
			<td width="197" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">服务区域</span>
				</p>
			</td>
			<td width="123" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-top-color: windowtext; border-right-color: windowtext; border-bottom-color: windowtext; border-left: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 15px;font-family: 宋体">联系方式</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">1</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海拯救汽车服务有限公司</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000011756</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海市长宁区迎宾二路59号3楼</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">长宁、徐汇、浦东、闵行、宝山</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">021-62695959</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">2</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海安畅汽车牵引有限公司</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000010984</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海市静安区大宁路1121号</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">市区、奉贤区</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">66117980</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">3</span><span style="font-size: 16px;font-family: 宋体">　</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海保畅汽车牵引服务有限公司</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000010944</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海市宝山区蕴川路3965号</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">市中心区、宝山、浦东新区、嘉定、崇明、</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">24</span><span style="font-size: 16px;font-family: 宋体">小时热线：4001810995</span>
				</p>
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">021-56789609</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">4</span><span style="font-size: 16px;font-family: 宋体">　</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海浦汇车辆牵引有限公司</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000010981</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海浦东新区申嘉湖高速S32桥孔祝桥镇祝西村1390号</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">浦东三林、浦东惠南、浦东临港</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">13916785980</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">5</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海市崇明县中天汽车服务部</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000011154</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">崇明县堡镇大通路212号1幢</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">崇明区</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">59419999</span>
				</p>
			</td>
		</tr>
		<tr style=";height:25px">
			<td width="25" style="border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-right-color: windowtext; border-bottom-color: windowtext; border-left-color: windowtext; border-top: none; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">6</span><span style="font-size: 16px;font-family: 宋体">　</span>
				</p>
			</td>
			<td width="174" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">上海三爱汽车俱乐部有限公司</span>
				</p>
			</td>
			<td width="142" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">沪市310000011112</span>
				</p>
			</td>
			<td width="246" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">浦东新区 S2 沪芦高速老康桥收费站办公楼</span>
				</p>
			</td>
			<td width="197" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">崇明、宝山、浦东新区、青浦、松江、闵行、金山、嘉定</span>
				</p>
			</td>
			<td width="123" style="border-top: none; border-left: none; border-bottom-width: 1px; border-bottom-color: windowtext; border-right-width: 1px; border-right-color: windowtext; padding: 0px 7px;">
				<p style="text-align:center">
					<span style="font-size: 16px;font-family: 宋体">24</span><span style="font-size: 16px;font-family: 宋体">小时热线：021-66857110</span>
				</p>
			</td>
		</tr>
		</tbody>
	</table>
	<p style="text-align:center;background:white">
		<span style="font-size: 15px;font-family: 宋体">&nbsp;</span>
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
