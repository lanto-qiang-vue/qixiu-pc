<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/myOrders.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r">
			<div class="zhengwu_t">
				<span class="sp_zw">我的预约服务</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>我的预约服务</span></span>
				<input type="text" id="ctx" name="ctx" style="display:none;" value="${ctx}"/>
			</div>
			<div class="biaoge">
				<table class="gridtable">
					<colgroup>
						<col width="150">
						<col width="150">
						<col width="80">
						<col width="80">
						<col width="80">
						<col width="50">
						<col width="50">
					</colgroup>
					<thead>
						<tr>
							<th align="center">服务内容</th>
							<th align="center">预约公司</th>
							<th align="center">联系人</th>
							<th align="center">联系方式</th>
							<th align="center">预约时间</th>
							<th align="center">状态</th>
							<th align="center">操作</th>
						</tr>
					</thead>
					<tbody id="tablebody">
						
					</tbody>
				</table>
				<div id="pagebar" style="text-align:center;margin-top:5px;"></div>
			</div>
		</div>
	</div>
	<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
	
</script>
</html>
