<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>机动车维修企业隐患排查治理情况记录表</title>
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
					<div style="text-align:center;margin-bottom:5px;font-size:29px;font-family : 宋体;margin-top:10px;line-height:40px;">
						<b>机动车维修企业隐患排查治理情况记录表</b>
					</div>
					<table class="table p8585" align="center" id="tableid">
						<tr>
							<th colspan="2" class="w100">单位名称</th>
							<td>${model.corpName }</td>
							<th class="w100">排查人员<br /></th>
							<td colspan="2"><div style="min-width:170px;">${model.pcry}</div></td>
						</tr>
						<tr>
							<th colspan="2" class="w100">单位地址</th>
							<td>${model.corpAdd }</td>
							<th class="w100">排查时间</th>
							<td colspan="2">${time }</td>
						</tr>
						<tr>
							<th colspan="2" class="w100">类别<br /></th>
							<th colspan="3">排查标准</th>
							<th class="w130">排查情况</th>
						</tr>
						<tbody>
						<c:forEach items="${list}" var="li">
							<tr>
								<td class="w30" style="text-align:center">${li.num }</td>
								<td class="w70" style="text-align:center">${li.itemName }</td>
								<td colspan="3" style="height:20px;">${li.itemDetail }</td>
								<td class="w70">${li.checkResult }</td>
							</tr>
						</c:forEach>
						</tbody>			
					</table>
					<div style="page-break-before:always;margin-top:10px;margin-bottom:20px;">
						<div class="noprint" style="border-bottom: 2px solid #aaa;color:#aaa;font-size:12px;text-align:center;">些处为分页线，IE用户请使用IE8或IE8以上浏览器打印此页面</div>
					</div>
					<table class="table p8585 text-center" align="center">
						<tr>
							<td  class="w110" style="height:50px;">隐患类别</td>
							<td colspan="2">${model.checkYhlb }</td>
							<td class="w100">隐患分级</td>
							<td><c:if test="${model.checkType != '无需整改'}">${model.checkJb}</c:if></td>
						</tr>
						<tr>
							<td class="w110">隐患描述</td>
							<td colspan="4" style="text-align:left;height:250px;vertical-align:top;">${model.checkMx }</td>
		
						</tr>
						<tr>
							<td rowspan="2" class="w110">整改措施</td>
							<td colspan="4" style="text-align:left;height:250px;vertical-align:top;">${model.checkCs }</td>
			
						</tr>	
						<tr>
							<td  class="w110" style="height:50px;">整改责任人</td>
							<td>${model.checkZrr }</td>
							<td class="w100">整改时限</td>
							<td ><c:if test="${model.checkType != '无需整改'}">${zgsx}前完成整改</c:if></td>
						</tr>
						<tr>
							<td rowspan="2" class="w110">完成整改情况</td>
							<td class="w110" style="height:50px;">是否完成整改</td>
							<td class="w110">${iswc}</td>
							<td class="w110">完成整改时间</td>
							<td><c:if test="${model.checkType != '无需整改'}">${wcsj}</c:if></td>
						</tr>
						<tr>
							<td class="w110" style="height:50px;">整改责任人<br/>（签名）</td>
							<td colspan="3"></td>
						</tr>											
						<tr>
					       <td rowspan="2" class="w110">企业负责人意见</td>
							<td colspan="4" style="height:50px;border-bottom:0px;">${model.fzrRemark }</td>
						</tr>	
						<tr>
							<td class="w110" style="font-weight: normal;height:50px;" colspan="4">
							<p style="text-align:right;margin-right:120px;">
								企业负责人(签名)：${model.chargePerson}<br/>
							</p>
							<p style="text-align:right;margin-right:80px;">${printDate}</p>
							</td>
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
