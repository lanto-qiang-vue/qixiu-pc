<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
	<%@ include file="/WEB-INF/pages/common/head.jsp"%>
	<%--<script src="${btx}/js/front/myOrders.js"></script>--%>
</head>
<body>
<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
<div class="Government archives">
	<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
	<div class="zhengwu_r">
		<div class="zhengwu_t">
			<span class="sp_zw">维修企业数据对接管理</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/manageHome">管理中心</a> > <span>维修企业数据对接管理</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table class="layui-table" lay-size="sm" style="width: 900px">
				<colgroup>
					<col width="200"><col width="200"><col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
				</colgroup>
				<thead>
				<tr>
					<th>维修企业名称</th>
					<th>车辆识别代码</th>
					<th>车牌号码</th>
					<th>送修日期</th>
					<th>送修里程</th>
					<th>结算日期</th>
					<th>结算清单编号</th>
				</tr>
				</thead>
				<tbody>
					<tr>
						<td>上海华邦龙柏汽车服务有限公司</td>
						<td>WP0AA2973DL017067</td>
						<td>沪BGY721</td>
						<td>20171008</td>
						<td>73896</td>
						<td>20171008</td>
						<td>WXhbqx20171000035</td>
					</tr>
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
