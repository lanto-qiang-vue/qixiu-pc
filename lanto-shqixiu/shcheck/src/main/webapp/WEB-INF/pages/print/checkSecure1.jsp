<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>上海市机动车维修企业生产安全事故隐患自查表</title>
		<link rel="stylesheet" href="${ctx }/css/print.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="${ctx}/js/jquery.mergetTable.js"></script>
	</head>
	<body>
		<br class="PH" />
		<c:if test="${printType == 'open'}">
			<div class="noprint" style="text-align:center;">
				<font color="red">如左边按钮不可点请在空白处点击鼠标右键菜单中的【打印】或【打印预览】<span class="tip">|</span>IE下【打印设置】中页面布局为【纵向】<span class="tip">|</span>页边距【左、右、上、下】都设成 15 毫米 <span class="tip">|</span>【页眉和页脚】全部置空。</font>
			</div>
			<div class="noprint" style="position:fixed;top:40px;left:10px;width:70px;z-index:10;">
				<a href="javascript:printIe();" id="query_button" class="btn btn-primary" style="margin:7px;width:67px;">
					<i class="icon-print"></i>
					打 印
				</a>
				<br/>
				<a href="javascript:doPrintPreview();" id="query_button" class="btn btn-primary" style="margin:7px;width:67px;">
					<i class="icon-print"></i>
					打印预览
				</a>
				<br/>
				<a href="javascript:ymsz();" id="query_button" class="btn btn-primary" style="margin:7px;width:67px;">
					<i class="icon-cog"></i>
					打印设置
				</a>
				<a href="javascript:window.close();" id="query_button" class="btn btn-primary" style="margin:7px;width:67px;">
					<i class="icon-off"></i>
					关 闭
				</a>
			</div>
		</c:if>
		<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>
		<div style="width:100%;text-align:center;">
			<h2>上海市机动车维修企业生产安全事故隐患自查表</h2>
		</div>
		<div style="width:100%;text-algin:center;">
			<table class="table" align="center" id="printTb">
				<tr>
					<th colspan="2" class="w100">单位名称</th>
					<td>${model.corpName }</td>
					<th class="w100">排查人员<br /></th>
					<td colspan="2">${model.createUser}</td>
				</tr>
				<tr>
					<th colspan="2" class="w100">单位地址</th>
					<td>${model.corpAdd }</td>
					<th class="w100">排查时间</th>
					<td style="border-right:0px;">${time }</td>
					<td class="w70"></td>
				</tr>
				<tr>
					<th colspan="2" class="w100">类别<br /></th>
					<th colspan="3">排查标准</th>
					<th class="w70">排查情况</th>
				</tr>
				<tbody>
				<c:forEach items="${list}" var="li">
					<tr>
						<td class="w30" style="text-align:center">${li.num }</td>
						<td class="w70" style="text-align:center">${li.itemName }</td>
						<td colspan="3">${li.itemDetail }</td>
						<td class="w70">${li.checkResult }</td>
					</tr>
				</c:forEach>
				</tbody>
				<tr>
					<th colspan="2" class="w100">隐患描述<br /><br /><br /></th>
					<td colspan="4">${model.checkMx }</td>

				</tr>
				<tr>
					<th colspan="2" class="w100">整改措施<br /><br /><br /></th>
					<td colspan="4">${model.checkCs }</td>

				</tr>
				<tr>
					<th colspan="2" class="w100">整改责任人</th>
					<td>${model.checkZrr }</td>
					<th class="w100">整改时限</th>
					<td colspan="2">${zgsx}前完成整改</td>
				</tr>
				<tr>
					<th colspan="2" class="w100">是否完成整改</th>
					<td>${iswc}</td>
					<th class="w100">完成整改时间</th>
					<td colspan="2">${wcsj}</td>
				</tr>

				<tr>
					<th colspan="2" class="w100">整改责任人（签名）</th>
					<td colspan="4"></td>
				</tr>
				<tr>
			       <th colspan="2" class="w100">企业负责人意见<br /><br /><br /><br /></th>
					<td>${model.fzrRemark }</td>
					<th class="w100" style="font-weight: normal;" colspan="3">
					<p align="left">&nbsp;<p align="left">企业负责人(签名)：${model.chargePerson}<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					${printDate}</th>

				</tr>
			</table>
		</div>
		<div class="shadow PH"></div>
		<br class="PH" />
<script type="text/javascript">
	jQuery(function($) {
		$.tableSpan.table_rowspan("#printTb",'1');
		$.tableSpan.table_rowspan("#printTb",'2');
		if('${printType}' == 'open'){
			doPrintPreview();
			//window.close();
		}else{
			printPage();
		}
	});

	function printPage() {
		window.print();
	}

	function printIe() {
		printWB.ExecWB(6,1);
	}

	function ymsz() {
		printWB.ExecWB(8,1);
	}

	function ncw() {
		printWB.ExecWB(4,1);
	}

	function doPrintPreview(){
        //打印预览
        printWB.ExecWB(7,1);
    }
</script>
	</body>
</html>
