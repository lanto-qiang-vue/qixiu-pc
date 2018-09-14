<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<%@ include file="/WEB-INF/pages/common/head.jsp"%>
<script src="${btx}/js/front/myQuestions.js"></script>
</head>
<body>
	<%@ include file="/WEB-INF/pages/common/nav.jsp"%>
	<div class="Government archives">
		<%@ include file="/WEB-INF/pages/center/leftMenus.jsp"%>
		<div class="zhengwu_r">
			<div class="zhengwu_t">
				<span class="sp_zw">我的咨询</span> <span class="sp_wz">您所在位置：<a
					href="${ctx}/center/userInfo">车主中心</a> > <span>我的咨询</span></span>
			</div>
			<div class="biaoge">
				<table class="gridtable">
					<tr>
						<th width="10%" align="center">问题分类</th>
						<th width="30%" align="center">问题内容</th>
						<th width="15%" style="width:80px;text-align:center;">咨询专家</th>
						<th width="15%" style="width:80px;text-align:center;">提问时间</th>
						<th width="15%" style="width:70px;text-align:center;">问题状态</th>
						<th width="25%" style="width:70px;text-align:center;">操作</th>
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
