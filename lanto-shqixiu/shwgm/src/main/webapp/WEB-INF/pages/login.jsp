<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>上海市汽车电子健康档案系统--管理端</title>
<link rel="stylesheet" href="${btx}/js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" href="${btx}/css/icon.css" type="text/css" />
<script src="${btx}/js/ext/ext-all.js"></script>
<script src="${btx}/js/ext/locale/ext-lang-zh_CN.js"></script>
<script src="${btx}/app/utils/CommonUtil.js"></script>
<script src="${btx}/js/login.js"></script>
<style type="text/css">
body {
	background-image: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0%, #f3f6fc),
		color-stop(100%, #cbdaf0));
	background-image: -webkit-linear-gradient(top, #f3f6fc, #cbdaf0);
	background-image: -moz-linear-gradient(top, #f3f6fc, #cbdaf0);
	background-image: -o-linear-gradient(top, #f3f6fc, #cbdaf0);
	background-image: linear-gradient(top, #f3f6fc, #cbdaf0);
	border-bottom: 1px solid #a3bde5;
}
</style>
</head>
<body>
	<script language="javascript" type="text/javascript">
		var loginTag = '${trans}';
	</script>
</body>
</html>
