<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=10,Chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>机动车维修竣工合格证</title>
		<link rel="stylesheet" href="${ctx }/css/font-awesome.min3.2.1.css" />
		<!--[if lte IE 7]>
		<link rel="stylesheet" href="${ctx }/css/font-awesome-ie7.min.css" />
		<![endif]-->
		<link rel="stylesheet" href="${ctx }/css/print.css" type="text/css" />
		<script type="text/javascript" src="${ctx}/js/jquery-1.10.2.min.js"></script>
	</head>
	<body>
		<br class="PH" />
		<c:if test="${printType == 'open'}">
			<div class="noprint" style="text-align:center;">
				<font color="red">如左边按钮不可点请在空白处点击鼠标右键菜单中的【打印】或【打印预览】<span class="tip">|</span>IE下【打印设置】中页面布局为【横向】<span class="tip">|</span>页边距【左、右、上、下】都设成 15 毫米 <span class="tip">|</span>【页眉和页脚】全部置空。</font>
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
		<div class="page A4_Horizontal">
			<div class="printMargins">
				<div class="pageContent">
					<object id="printWB" style="dispaly:none" classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"></object>  
					<div style="width:auto; height:650px;border:1px solid #000;">
						<div style="width:315px;height:630px;border-right:2px dashed #000;float:left;text-align:center;padding:10px;">
							<div style="font-size:20px;line-height:30px;">机动车维修竣工出厂合格证</div>
							<div style="font-size:16px;line-height:30px;margin-bottom:10px;">NO.${data.certSn }</div>
							<div style="line-height:20px;font-size:13px;margin-bottom:10px;margin-top:20px;">副&nbsp;&nbsp;联<br/>维修单位保存</div>
							<div style="line-height:30px;font-size:13px;text-align:left;padding:20px;">
								托修方:<span style="border-bottom:1px #000 solid;width:230px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.delegateName }</span><br/>
								车牌号码（含车牌颜色）<span style="border-bottom:1px #000 solid;width:130px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.plateNumColor }</span><br/>
								车辆类型：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.vehicleType }</span><br/>
								承修方：<span style="border-bottom:1px #000 solid;width:220px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.corpName }</span><br/>
								企业联系电话：<span style="border-bottom:1px #000 solid;width:183px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.hotLine }</span><br/>
								维修类别：<div style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:18px;font-size:12px;">${data.repiarType }&nbsp;</div><br/>
								<!--维修费用：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.costSum }&nbsp;(元)</span><br/> -->
								出厂日期：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.leaveDate }</span><br/>
								出厂里程表示值：<span style="border-bottom:1px #000 solid;width:170px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.leaveMileage }&nbsp;(公里)</span><br/>
								<div style="line-height:25px;padding:20px;">&nbsp;&nbsp;&nbsp;&nbsp;该车按维修协议维修，经检验合格，准予出厂。</div>
								<div style="padding:0 20px;line-height:35px;">
									质量检验员（签章）：<div style="border-bottom:1px #000 solid;width:100px;display:-moz-inline-box;display:inline-block;line-height:25px;">${data.examiner }</div><br/>
									承修单位：（盖章）<span style="width:100px;display:-moz-inline-box;display:inline-block;line-height:30px;">&nbsp;</span><br/>
									托修方接车人：<span style="border-bottom:1px #000 solid;width:140px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;</span><br/>
								</div>
							</div>
						</div>
						<div style="width:560px;height:630px;float:left;text-align:center;">
							<div style="margin-top:10px;hgight:80px;border-bottom:1px #ccc solid;">
								<div style="font-size:20px;line-height:30px;">机动车维修竣工出厂合格证</div>
								<div style="font-size:16px;line-height:30px;">NO.${data.certSn }</div>
							</div>
							<div style="width:315px;height:580px;border-right:1px #ccc solid;float:left;text-align:center;">
								<div style="line-height:20px;font-size:13px;margin-bottom:10px;margin-top:15px;">正&nbsp;&nbsp;联<br/>车属单位（个人）保存</div>
								<div style="line-height:30px;font-size:13px;text-align:left;padding:20px;">
									托修方:<span style="border-bottom:1px #000 solid;width:230px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.delegateName }</span><br/>
									车牌号码（含车牌颜色）<span style="border-bottom:1px #000 solid;width:130px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.plateNumColor }</span><br/>
									车辆类型：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.vehicleType }</span><br/>
									承修方：<span style="border-bottom:1px #000 solid;width:220px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.corpName }</span><br/>
									企业联系电话：<span style="border-bottom:1px #000 solid;width:183px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.hotLine }</span><br/>
									维修类别：<div style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:18px;font-size:12px;">${data.repiarType }&nbsp;</div><br/>
								<!--	维修费用：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.costSum }&nbsp;(元)</span><br/> -->
									出厂日期：<span style="border-bottom:1px #000 solid;width:210px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.leaveDate }</span><br/>
									出厂里程表示值：<span style="border-bottom:1px #000 solid;width:170px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;${data.leaveMileage }&nbsp;(公里)</span><br/>
									<div style="line-height:25px;padding:20px;">&nbsp;&nbsp;&nbsp;&nbsp;该车按维修协议维修，经检验合格，准予出厂。</div>
									<div style="padding:0 20px;line-height:35px;">
										质量检验员（签章）：<div style="border-bottom:1px #000 solid;width:100px;display:-moz-inline-box;display:inline-block;line-height:25px;">${data.examiner }</div><br/>
										承修单位：（盖章）<span style="width:100px;display:-moz-inline-box;display:inline-block;line-height:30px;">&nbsp;</span><br/>
										托修方接车人：<span style="border-bottom:1px #000 solid;width:140px;display:-moz-inline-box;display:inline-block;line-height:25px;">&nbsp;</span><br/>
									</div>
								</div>
							</div>
							<div style="width:235px;float:right;padding:2px;">
								<div style="margin-top:10px;font-size:16px;line-height:25px;">质量保证卡</div>
								<p style="text-align:left;font-size:12px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该车按维修协议进行维修，本厂对维修竣工的汽车实行质量保证。按照《机动车维修管理规定》最低质量保证期：自出厂之日起，整车修理或总成修理100天内或行驶20000公里内；二级维护30天内或行驶5000公里内；一级维护、小修及专项修理(零件修理)10天内或2000公里内；排气污染维修以具体的维修内容参照规定的质量保证期。本厂承诺此次维修质量保证期为
								<span style="border-bottom:1px red solid;width:50px;display:-moz-inline-box;display:inline-block;line-height:18px;text-align:center;">${data.p1 }</span>天内或
								<span style="border-bottom:1px red solid;width:70px;display:-moz-inline-box;display:inline-block;line-height:18px;text-align:center;">${data.p2 }</span>行驶公里内(行驶里程和日期以先到者为准)，在托修单位（个人）严格执行走合期规定、合理使用、正常维护的情况下，出现的维修质量问题，凭此卡随竣工出厂合格证，由本厂负责保修，免返修工料费，在原维修类别期限内修复竣工后交托修方。</p>
								<div style="text-align:left;margin-top:10px;">
									<div style="font-size:14px;color:red;margin-bottom:0px;">欢迎您对本次维修保养服务进行评价</div>
									<div style="line-height:20px;font-size:12px;paddint-left:0px;">
										<div style="width:230px;"><i class="icon-circle"></i> 电脑登录评价：</div>
										<div style="width:230px;float:left;height:55px;">${cpurlDP }</div>
										<div><i class="icon-circle"></i> 手机扫描评价：<img src="${ctx }/manage/repair/gene/qrCode/for_${geneId}" style="width:100px;height:100px;float:right;margin-right:20px;"/></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="shadow PH"></div>
		</div>
		<br class="PH" />
<script type="text/javascript">
	jQuery(function($) {
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
