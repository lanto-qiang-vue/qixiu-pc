<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>上海市机动车维修行业安全生产监督检查记录</title>
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
					<div style="width:98%;text-align:center;margin-bottom:20px;font-size:29px;font-family : 仿宋_GB2312;margin-top:10px;line-height:40px;">
						上海市机动车维修行业安全生产监督检查记录
					</div>
					<div style="text-align:right;font-size:21px;font-family : 宋体;">
						编 号：${model.orderNo }
					</div>
					<div style="text-align:center;border-top: 4px solid #000;"></div>
					<div style="text-align:center;border-top: 1px solid #000;margin-top:2px;"></div>
					<div style="font-size:13px;">
						<div style="width:49%;float:left;border-bottom: 1px dashed #000;line-height:35px;padding-left:10px;padding-top:2px;font-family : 仿宋_GB2312;">检查时间：${time }</div>
						<div style="width:49%;float:left;border-bottom: 1px dashed #000;line-height:35px;height:35px;padding-top:2px;font-family : 仿宋_GB2312;">被检查单位：<span style="width:230px;display:-moz-inline-box;display:inline-block;line-height:15px;font-family : 仿宋_GB2312;">${model.corpName }</span></div>
						<div style="width:49%;float:left;border-bottom: 1px dashed #000;padding-left:10px;padding-top:2px;line-height:35px;height:35px;font-family : 仿宋_GB2312;">组织检查单位：<span style="width:230px;display:-moz-inline-box;display:inline-block;line-height:15px;font-family : 仿宋_GB2312;">${model.checkUnit }</span></div>
						<div style="width:49%;float:left;border-bottom: 1px dashed #000;line-height:35px;height:35px;padding-top:2px;font-family : 仿宋_GB2312;">&nbsp; 检查人员：<span style="width: 230px; display: inline-block; line-height: 15px; font-family: 仿宋_GB2312;">${model.checkPerson }</span></div>
					</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">检查主要内容：</div>
					<div style="font-size:13px;padding-left:36px;border-bottom: 1px dashed #000;line-height:25px;font-family : 仿宋_GB2312;">${model.checkContent }</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">检查主要情况：</div>
					<div style="font-size:13px;padding-left:36px;border-bottom: 1px dashed #000;line-height:25px;font-family : 仿宋_GB2312;">${model.checkDetail }</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">发现的问题（隐患）：</div>
					<div style="font-size:13px;padding-left:36px;border-bottom: 1px dashed #000;line-height:25px;font-family : 仿宋_GB2312;">${model.rectResult }</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">下一步工作建议或要求：</div>
					<div style="font-size:13px;padding-left:36px;border-bottom: 1px dashed #000;line-height:25px;font-family : 仿宋_GB2312;">${model.nextWork }</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">&nbsp;</div>
					<div style="font-size:13px;padding-left:36px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">
						此次检查发现的问题（隐患）必须于 <span style="font-size:13px;border-bottom: 1px solid #000;line-height:35px;font-family : 仿宋_GB2312;">${beforeTime }</span> 前完成整改，
						并将有关整改完成情况
					</div>
					<div style="font-size:13px;padding-left:10px;border-bottom: 1px dashed #000;line-height:35px;font-family : 仿宋_GB2312;">
						报 <span style="font-size:13px;border-bottom: 1px solid #000;line-height:35px;">${model.applyTo }</span>
						。整改期内要采取切实有效的安全防范措施，确保生产安全。
					</div>
					<div style="font-size:13px;">
						<div style="width:49%;float:left;border-bottom: 1px dashed #000;line-height:35px;height:35px;padding-left:10px;font-family : 仿宋_GB2312;">
							<span>
							责任单位负责人签名：
							<c:if test="${model.imgSign != null && model.imgSign != ''}">
								<img src="/attach/appimg/${model.imgSign }" height="30px" style="padding:0px;margin:0px;"/>
							</c:if>
							</span>
						</div>
						<div style="width:47%;float:right;border-bottom: 1px dashed #000;line-height:35px;text-align:right;padding-right:10px;font-family : 仿宋_GB2312;"><span style="width:30px;display:-moz-inline-box;display:inline-block;text-align:center;">${checkYear }</span>年 <span style="width:30px;display:-moz-inline-box;display:inline-block;text-align:center;">${checkMonth }</span>月 <span style="width:30px;display:-moz-inline-box;display:inline-block;text-align:center;">${checkDay }</span>日</div>
					</div>
					<div style="text-align:center;border-top: 1px solid #000;margin-top:100px;"></div>
					<div style="text-align:center;border-top: 4px solid #000;margin-top:2px;"></div>
					<div style="font-size:13px;padding-left:10px;line-height:35px;font-family : 仿宋_GB2312;">记录员：${model.createUser }</div>
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
