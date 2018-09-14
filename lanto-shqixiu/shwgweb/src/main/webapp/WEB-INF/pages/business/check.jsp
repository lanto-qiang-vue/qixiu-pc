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
	<span class="wenti">车辆年检</span>
	<%--<span class="weizhi">我所在的位置：<a href="${ctx}/index">首页</a> > <span>在线商务</span> > <span>投诉举报</span></span>--%>
</div>
<div class="examine" >
	<table style="">
		<colgroup>
			<col width="124"/>
			<col width="654"/>
			<col width="566"/>
			<col width="216"/>
			<col width="316"/>
		</colgroup>
		<tbody>
		<tr class="firstRow">
			<td class="et3" colspan="5" width="780" style="font-size: 24pt; text-align: center; vertical-align: middle; border-bottom-width: 0.5pt; border-bottom-color: rgb(0, 0, 0); word-break: break-all;">
				<span style="font-size: 24px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">车辆年检检测企业</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">序号</span>
			</td>
			<td class="et4" width="490" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">业户名称</span>
			</td>
			<td class="et4" width="424" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">经营地址</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">邮编</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">联系电话</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">1</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海松东机动车安全检测有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">松东路337号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201613</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">57745051</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">2</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle; word-break: break-all;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海东方机动车综合性能检测有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">川沙路1188号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201209</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">58569630</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">3</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海闵行机动车检测服务有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">老沪闵路2388号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201108</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">64584070</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">4</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海南汇交通实业有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">沪南路9845号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201300</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">68014319</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">5</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海金洙机动车检测有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">朱泾镇亭枫公路3238号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201500</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">57332997</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle; word-break: break-all;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">6</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海通韵汽车检测服务有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">关港路2号1幢一层</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">200231</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">52212875</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">7</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海中集宝检汽车检测修理有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">宝山区水产路1699号(兰岗路276号)</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201900</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">33792589</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">8</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海三十八安全机动车检测站</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">宝山区富锦路5001号</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201908</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">66017222</span>
			</td>
		</tr>
		<tr>
			<td class="et4" width="93" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">9</span>
			</td>
			<td class="et5" width="490" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海乐欣机动车检测服务有限公司</span>
			</td>
			<td class="et5" width="424" style="font-size: 16pt; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">上海市宝山区富联二路189号14幢</span>
			</td>
			<td class="et4" width="162" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">201906</span>
			</td>
			<td class="et4" width="148" style="font-size: 16pt; text-align: center; vertical-align: middle;">
				<span style="font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;;">56152231*804</span>
			</td>
		</tr>
		</tbody>
	</table>
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
