<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>机动车维修企业安全生产基础信息</title>
		<link rel="stylesheet" href="${ctx }/css/font-awesome.min3.2.1.css" />
		<!--[if lte IE 7]>
		<link rel="stylesheet" href="css/font-awesome-ie7.min.css" />
		<![endif]-->
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
		<div class="page_autoH A4_Vertical_autoH">
			<div class="printMargins">
				<div class="pageContent">
					<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>  
					<div style="text-align:center;margin-bottom:5px;font-size:29px;font-family : 宋体;margin-top:10px;line-height:35px;">
						<b>机动车维修企业风险源分级评定表</b>
					</div>
					<div style="text-align:center;margin-bottom:5px;font-size:15px;font-family : 宋体;margin-top:0px;line-height:16px;">
						&lt; ${model.CORP_NAME } &gt;
					</div>
					<table id="tableid" class="table" style="font-family : 宋体;">
						<tr>
							<th style="width:6%;"><b>序号</b></th>
							<th style="width:12%;"><b>一级指标</b></th>
							<th style="width:35%;"><b>二级指标</b></th>
							<th style="width:14%;"><b>分值设定(分)</b></th>
							<th style="width:11%;"><b>得分(分)</b></th>
							<th style="width:22%;"><b>评定说明</b></th>
						</tr>
						<c:forEach items="${items}" var="item" varStatus="status">
							<c:forEach items="${item.DETAILS}" var="detail" varStatus="ds">
								<c:choose>
									<c:when test="${ds.index == 0}">
										<tr>
											<td style="text-align:center;">${detail.ITEM_INDEX}</td>
											<td style="text-align:center;">${detail.ITEM_NAME }</td>
											<td style="color:${detail.COLOR };"><i class="icon-${detail.IS_CHECK == 1?'check':'check-empty' }" style="color:#000;"></i> ${detail.BZ_NAME }</td>
											<td style="text-align:center;">${detail.BZ_SCORE }</td>
											<td style="text-align:center;" rowspan="${item.ROWS }">${item.DF}</td>
											<td>${detail.ITEM_CONTENT }</td>
										</tr>
									</c:when>
									<c:otherwise>
										<tr>
											<td style="text-align:center;">${detail.ITEM_INDEX}</td>
											<td style="text-align:center;">${detail.ITEM_NAME }</td>
											<td style="color:${detail.COLOR };"><i class="icon-${detail.IS_CHECK == 1?'check':'check-empty' }" style="color:#000;"></i> ${detail.BZ_NAME }</td>
											<td style="text-align:center;">${detail.BZ_SCORE }</td>
											<td style="text-align:center;display:none;" rowspan="0">${item.DF}</td>
											<td>${detail.ITEM_CONTENT }</td>
										</tr>
									</c:otherwise>
								</c:choose>
							</c:forEach>
						</c:forEach>
						<tr>
							<td colspan="2" style="text-align:center;">综合得分</td>
							<td style="text-align:center;">${totalScore }</td>
							<td colspan="2" style="text-align:center;">风险等级</td>
							<td style="text-align:center;">${rating }</td>
						</tr>
						<tr>
							<td colspan="6" style="line-height:18px;">注：完好率＝设备完好台数/设备总台数*100%；若二级指标得分值之和，大于一级指标分值，则取一级指标分值上限。评估标准：总分等于1－5项指标得分之和。</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="shadow PH"></div>
		</div>
		<br class="PH" />
<script type="text/javascript">
	jQuery(function($) {
		$.tableSpan.table_rowspan("#tableid",1);
		$.tableSpan.table_rowspan("#tableid",2);
		$.tableSpan.table_rowspan("#tableid",6);
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
