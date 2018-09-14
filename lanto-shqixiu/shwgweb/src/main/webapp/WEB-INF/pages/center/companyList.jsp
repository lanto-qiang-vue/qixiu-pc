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
			<span class="sp_zw">汽车健康档案</span> <span class="sp_wz">您所在位置：<a
				href="${ctx}/center/userInfo">企业中心</a> > <span>汽车健康档案</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">
			<table class="layui-table" lay-size="sm" style="width: 1200px">
				<colgroup>
					<col width="200"><col width="100"><col width="200"><col width="100"><col width="100">
					<col width="100"><col width="200">
				</colgroup>
				<thead>
				<tr>
					<th>企业名</th>
					<th>维修车牌</th>
					<th>车辆识别代码</th>
					<th>维修日期</th>
					<th>行驶里程</th>
					<th>解决日期</th>
					<th>费用单码</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>上海XX汽车销售服务有限公司</td>
					<td>浙AKL282</td>
					<td>WVWHP59C28M559191</td>
					<td>20171010</td>
					<td>65626</td>
					<td>20171012</td>
					<td>WX000120171010006</td>
				</tr>
				<tr>
					<td>上海XX汽车销售服务有限公司</td>
					<td>沪LS5978</td>
					<td>WVGEH35N6AW530424</td>
					<td>20171011</td>
					<td>177514</td>
					<td>20171012</td>
					<td>WX000120171011001</td>
				</tr>
				<tr>
					<td>上海XX汽车销售服务有限公司</td>
					<td>沪GQ6792</td>
					<td>WVWCJ57N0FV004585</td>
					<td>20171009</td>
					<td>67124</td>
					<td>20171012</td>
					<td>WX000120171009033</td>
				</tr>
				<tr>
					<td>上海XX汽车销售服务有限公司</td>
					<td>沪LL1701</td>
					<td>WVGEH35N4AW504419</td>
					<td>20171012</td>
					<td>75662</td>
					<td>20171012</td>
					<td>WX000120171012003</td>
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
