<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/toAnswer.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r">
			<div class="zhengwu_t">
				<span class="sp_zw">回答问题</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>回答问题</span></span>
			</div>
			<input type="hidden" id="expertId" value="${loginInfo.userId }" />
			<div class="biaoge">
				<table class="gridtable">
					<tr>
						<th width="" align="center">问题</th>
						<th style="width:100px;text-align:center;">咨询专家</th>
						<th style="width:100px;text-align:center;">提问时间</th>
						<th style="width:50px;text-align:center;">操作</th>
					</tr>
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
