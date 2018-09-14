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
					<div style="text-align:center;margin-bottom:5px;font-size:29px;font-family : 宋体;margin-top:10px;line-height:40px;">
						<b>机动车维修企业安全生产基础信息</b>
					</div>
					<table class="table" style="font-family : 宋体;">
						<tr>
							<th colspan="2">企业名称</th>
							<td colspan="4"><div style="line-height:16px;">${model.CORP_NAME }</div></td>
							<th colspan="2">所属辖区</th>
							<td colspan="4">${model.AREA_NAME }</td>
						</tr>
						<tr>
							<th colspan="2">企业地址</th>
							<td colspan="4"><div style="line-height:16px;">${model.CORP_ADD }</div></td>
							<th colspan="2">经营范围</th>
							<td colspan="4">${corpType }</td>
						</tr>
						<tr>
							<th colspan="2">法定代表</th>
							<th colspan="2"><div style="min-width:80px;">${model.LEGAL_PERSON }</div></th>
							<th colspan="2">联系电话</th>
							<th colspan="2"> ${model.COPR_TEL } </th>
							<th colspan="2"><div style="min-width:95px;">从业人数(人)</div></th>
							<th colspan="2"><div style="min-width:60px;">${model.EMPLOYEE_COUNT }</div></th>
						</tr>
						<tr>
							<th colspan="4">道路经营许可证有效期</th>
							<th colspan="8">${model.CERT_VALID_TIME }</th>
						</tr>
						<tr>
							<th colspan="12">一、安全生产管理机构</th>
						</tr>
						<tr>
							<th colspan="1" style="width:50px;"><div style="min-width:30px;">序号</div></th>
							<th colspan="3">机构名称</th>
							<th colspan="6">机 构 成  员</th>
							<th colspan="2"><div style="line-height:16px;">上传机构设置文件</div></th>
						</tr>
						<c:forEach items="${orgs}" var="item" varStatus="status">
							<tr>
								<th colspan="1" style="width:6%;">${status.index + 1}</th>
								<th colspan="3"><div style="line-height:16px;">${item.ORG_NAME }</div></th>
								<th colspan="6"><div style="line-height:16px;">${item.ORG_MEMBER }</div></th>
								<th colspan="2"><i class="icon-${(item.FILE_NAME != null && item.FILE_NAME != '')?'ok':'remove' }"></i></th>
							</tr>
						</c:forEach>
						<tr>
							<th colspan="12">二、安全生产责任人及管理人员</th>
						</tr>
						<tr>
							<th colspan="1" style="">序号</th>
							<th colspan="2"><div style="line-height:16px;min-width:120px;">责任区分</div></th>
							<th colspan="2">姓 名</th>
							<th colspan="2">职务</th>
							<th colspan="1"><div style="min-width:70px;">联系电话</div></th>
							<th colspan="2"><div style="line-height:16px;min-width:98px;">是否持有安全生产培训合格证书</div></th>
							<th colspan="2">上传任命文件</th>
						</tr>
						<c:forEach items="${zrrs}" var="item" varStatus="status">
							<tr>
								<th colspan="1" style="">${status.index + 1}</th>
								<th colspan="2"><div style="line-height:16px;min-width:120px;">${item.ZR_TYPE }<br/>${item.ZR_DESC }</div></th>
								<th colspan="2"><div style="line-height:16px;">${item.NAME }</div></th>
								<th colspan="2"><div style="line-height:16px;">${item.ZW }</div></th>
								<th colspan="1"><div style="line-height:16px;">${item.PHONE }</div></th>
								<th colspan="2">${item.IS_CERT == '10041001'?'是':'否' }</th>
								<th colspan="2"><i class="icon-${(item.FILE_NAME != null && item.FILE_NAME != '')?'ok':'remove' }"></i></th>
							</tr>
						</c:forEach>
						<tr>
							<th colspan="12">三、特种作业人员（ <i class="icon-${(model.HAVE_TZRY=='on' || model.HAVE_TZRY=='true')?'check':'check-empty' }"></i>有    &nbsp;&nbsp; <i class="icon-${(model.HAVE_TZRY=='on' || model.HAVE_TZRY=='true')?'check-empty':'check' }"></i>无 ）</th>
						</tr>
						<tr>
							<th colspan="1" style="">序号</th>
							<th colspan="1">姓 名</th>
							<th colspan="3">特种作业岗位</th>
							<th colspan="2"><div style="line-height:16px;min-width:115px;">持有的特种作<br/>业操作证名称</div></th>
							<th colspan="1">证书编号</th>
							<th colspan="2">证书有效期</th>
							<th colspan="2">上传证书文件</th>
						</tr>
						<c:if test="${model.HAVE_TZRY=='on' || model.HAVE_TZRY=='true'}" >
							<c:forEach items="${tzrys}" var="item" varStatus="status">
								<tr>
									<th colspan="1" style="width:6%;">${status.index + 1}</th>
									<th colspan="1"><div style="line-height:16px;min-width:60px;">${item.NAME }</div></th>
									<th colspan="3"><div style="line-height:16px;max-width:140px;">${item.GW }</div></th>
									<th colspan="2"><div style="line-height:16px;">${item.CERT_NAME }</div></th>
									<th colspan="1"><div style="line-height:16px;max-width: 80px;word-wrap: break-word;">${item.CERT_CODE }</div></th>
									<th colspan="2">${item.CERT_END_DATE }</th>
									<th colspan="2"><i class="icon-${(item.FILE_NAME != null && item.FILE_NAME != '')?'ok':'remove' }"></i></th>
								</tr>
							</c:forEach>
						</c:if>
						<tr>
							<th colspan="12">四、安全生产管理制度、操作规程、应急预案</th>
						</tr>
						<tr>
							<th colspan="1" style="width:6%;">序号</th>
							<th colspan="4">制度文件名称</th>
							<th colspan="5">文件内容要求</th>
							<th colspan="2">上传文件</th>
						</tr>
						<c:forEach items="${insts}" var="item" varStatus="status">
							<tr>
								<th colspan="1" style="width:6%;">${status.index + 1}</th>
								<th colspan="4"><div style="line-height:16px;">${item.INST_NAME }</div></th>
								<th colspan="5"><div style="line-height:16px;">${(item.INST_CONTENT == null || item.INST_CONTENT == '')?'<font color="red">*</font>':item.INST_CONTENT}</div></th>
								<th colspan="2"><i class="icon-${(item.FILE_NAME != null && item.FILE_NAME != '')?'ok':'remove' }"></i></th>
							</tr>
						</c:forEach>
						<tr>
							<th colspan="12">五、安全生产标准化建设信息</th>
						</tr>
						<tr>
							<th colspan="2">是否达标</th>
							<th colspan="2"><div style="min-width:60px;">评定等级</div></th>
							<th colspan="1"><div style="min-width:60px;">是否发证</div></th>
							<th colspan="2"><div style="min-width:60px;">发证单位</div></th>
							<th colspan="4">证书有效期</th>
							<th colspan="1">上传证书文件</th>
						</tr>
						<c:forEach items="${normals}" var="item" varStatus="status">
							<tr>
								<th colspan="2">${item.IS_OK == '10041001'?'是':'否' }</th>
								<th colspan="2"><div style="min-width:60px;">${item.RANKING }</div></th>
								<th colspan="1"><div style="min-width:60px;">${(item.IS_CERT==null||item.IS_CERT=='')?'':item.IS_CERT=='10041001'?'是':'否' }</div></th>
								<th colspan="2"><div style="min-width:60px;">${item.CERT_UNIT }</div></th>
								<th colspan="4"><div style="line-height:16px;">${item.VALID_TIME }</div></th>
								<th colspan="1"><i class="icon-${(item.FILE_NAME != null && item.FILE_NAME != '')?'ok':'remove' }"></i></th>
							</tr>
						</c:forEach>
						<tr>
							<th colspan="12">六、风险源信息</th>
						</tr>
						<tr>
							<th colspan="4" >风险源类型</th>
							<th colspan="4">企业自评风险等级</th>
							<th colspan="4">管理部门核定等级</th>
						</tr>
						<c:forEach items="${dangers}" var="item" varStatus="status">
							<tr>
								<th colspan="4" >${item.DANGER_TYPE }</th>
								<th colspan="4">${item.SELF_GRADE }</th>
								<th colspan="4">${(item.CHEK_GRADE == null || item.CHEK_GRADE == '')?'<font color="red">*</font>':item.CHEK_GRADE}</th>
							</tr>
						</c:forEach>
					</table>
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
