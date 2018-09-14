<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>上海市综合性能检测站日常监督检查表</title>
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
		<div class="page A4_Vertical">
			<div class="printMargins">
				<div class="pageContent">
					<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>
					<div style="width:100%;text-align:center;line-height:100px;">
						<h2>上海市综合性能检测站日常监督检查表</h2>
					</div>
					<div style="width:99%;text-align:right;">日期：${time }</div>
					<div style="width:100%;text-algin:center;line-height:30px;">
						<table class="table" align="center" id="printTb">
							<tr class="h30">
								<th colspan="2" class="w100">检测站名称</th>
								<td>${model.stationName }</td>
								<th class="w100">检测站地址</th>
								<td>${model.corpAdd }</td>
							</tr>
							<tr class="h30">
								<th colspan="2" class="w100">检查类别</th>
								<th colspan="2">检查项目</th>
								<th class="w200">检查情况</th>
							</tr>
							<tbody>
							<c:forEach items="${list}" var="li">
								<tr class="h30">
									<td class="w30" style="text-align:center">${li.num }</td>
									<td class="w70" style="text-align:center">${li.itemName }</td>
									<td colspan="2">${li.itemDetail }</td>
									<td class="w70">${li.checkResult }</td>
								</tr>
							</c:forEach>
							</tbody>
							<tr class="h30">
								<th colspan="2" class="w100">检查成员签名</th>
								<td></td>
								<th class="w100">检测站负责人签名</th>
								<td></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="shadow PH"></div>
		</div>
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
