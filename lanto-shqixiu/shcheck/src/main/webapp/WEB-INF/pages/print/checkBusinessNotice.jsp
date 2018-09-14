<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>责令改正通知书</title>
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
					<div style="width:98%;text-align:center;margin-top:20px;margin-bottom:10px;font-size:29px;font-family : 宋体;">
						<b>责令改正通知书</b>
					</div>
					<div style="text-align:right;font-size:21px;font-family : 仿宋_GB2312;line-height:40px;">
						${model.printNoa }〔${model.printNob }〕<span style="border-bottom:1px #000 solid;width:50px;"> ${model.printNoc } </span>号
					</div>
					<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:35px;margin-top:20px;">
						    <span style="border-bottom:1px #000 solid;line-height:25px;display:inline-block;">&nbsp;${model.corpName }&nbsp;</span>：
					</div>
					<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:35px;">
						    &nbsp;&nbsp;经调查，你单位存在下列情况：
					</div>
					<c:forEach items="${quest}" var="qu">
						<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:32px;border-bottom:1px #000 solid;">
						    ${qu }
						</div>
					</c:forEach>
					<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:35px;margin-top:5px;">
						    &nbsp;&nbsp;根据<span style="border-bottom:1px #000 solid;"> 机动车维修行业管理 </span>的有关规定，现责令你（单位）对上述问题立即改正，有关问题于<span style="border-bottom:1px #000 solid;"> ${beforeYear } </span> 年<span style="border-bottom:1px #000 solid;"> ${beforeMonth } </span>月<span style="border-bottom:1px #000 solid;"> ${beforeDay } </span>日前整改完毕，并将整改情况书面报<span style="border-bottom:1px #000 solid;"> ${model.applyTo } </span>。
					</div>
					<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:35px;">
						    &nbsp;&nbsp;改正内容和要求如下：
					</div>
					<c:forEach items="${checkbz}" var="bz">
						<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:32px;border-bottom:1px #000 solid;">
						    ${bz }
						</div>
					</c:forEach>
					<div style="font-size:21px;font-family : 仿宋_GB2312;line-height:35px;margin-top:10px;height:70px;">
						<div style="width:40%;float:left;">被责令改正人签名及时间</div>
						<div style="width:40%;float:right;text-align:center;">检查执法人员签名</div>
						<div style="width:40%;float:left;border-bottom:1px #000 solid;hegiht:35px;">&nbsp;</div>
						<div style="width:40%;float:right;text-align:center;border-bottom:1px #000 solid;hegiht:35px;">&nbsp;</div>
					</div>
					<div style="text-align:right;font-size:21px;font-family:仿宋_GB2312;line-height:40px;margin-top:30px;width:100%;" id="wgpt">
						${model.applyTo }
					</div>
					<div style="text-align:right;font-size:21px;font-family:仿宋_GB2312;line-height:40px;width:100%;padding-right:40px;">
						  &nbsp;<span style="border-bottom:1px #000 solid;"> ${checkYear } </span> 年<span style="border-bottom:1px #000 solid;"> ${checkMonth } </span>月<span style="border-bottom:1px #000 solid;"> ${checkDay } </span>日&nbsp;
					</div>
				<!-- 	<img src="${ctx }/images/stamp.png" alt="" style="position:absolute;top:500px;" id="stamp" width="188px" height="188px"/>  -->
				</div>
			</div>
			<div class="shadow PH"></div>
		</div>
		<br class="PH" />
<script type="text/javascript">
	jQuery(function($) {
//		$("#stamp").css("top", $('#wgpt').offset().top - 160);
//		$("#stamp").css("left", 350);
		if('${printType}' == 'open'){
			doPrintPreview();
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
