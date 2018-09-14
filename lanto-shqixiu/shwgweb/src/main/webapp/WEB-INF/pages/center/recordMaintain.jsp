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
			<span class="sp_zw">维修记录</span> <span class="sp_wz">您所在位置：<a
				href="#" onClick="javascript :history.go(-1);">汽车档案</a> > <span>维修记录</span></span>
		</div>
		<div class="biaoge" style="overflow: auto">

		</div>
	</div>
</div>
<%@ include file="/WEB-INF/pages/common/bottom.jsp"%>
</body>
<script type="text/javascript">
    $(function(){
        var param={
            accessToken: localStorage.getItem('ACCESSTOKEN'),
            repairbasicinfoId: getUrlParam('id')
        }
        accessPost(baseu+ '/vehicle/carfile/queryDetail', JSON.stringify(param), function (res) {
			handleIfUserNeedToLoginIn(res, '${ctx}', '${memberUri}');
            console.log(res)
        })
    })

</script>
</html>
