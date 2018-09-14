<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>上海市机动车维修公共服务平台--维修端</title>
<script>
	var loginTag = '${trans}';
	basePath = '/' + (window.location + '').split('/')[3] + '/'; //全局basePath

	if (!window.console) {
		var names = [ "log", "debug", "info", "warn", "error", "assert", "dir",
				"dirxml", "group", "groupEnd", "time", "timeEnd", "count",
				"trace", "profile", "profileEnd" ];

		window.console = {};
		for (var i = 0; i < names.length; ++i)
			window.console[names[i]] = function() {
			}
	}
</script>
<style>
.x-form-file-input {
	border: 0;
	position: absolute;
	cursor: pointer;
	top: -2px;
	right: -2px;
	filter: alpha(opacity = 0);
	opacity: 0;
	font-size: 20px
}

#appOverlay {
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 99999 !important;
	display: none;
	overflow: hidden;
	display: block;
	transition: visibility 0s 0.5s, opacity 0.5s linear;
}

#appOverlay #overlay-content {
	color: #fff;
	height: 100%;
	background: #fff;
	text-align: center;
	line-height: 200px;
	font-size: 1.5em;
}

#appOverlay #overlay-content img {
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>
</head>
<body>
	<div id="appOverlay" class="hidden">
		<div id="overlay-content">
			<img src="${btx}/images/loading_index.gif">
		</div>
	</div>
	<link rel="stylesheet" href="${btx}/css/accordion.css" type="text/css" />
	<link rel="stylesheet" href="${btx}/css/font-awesome.min3.2.1.css" />
	<!--[if lte IE 7]>
	<link rel="stylesheet" href="${btx}/css/font-awesome-ie7.min.css" />
	<![endif]-->
	<script src="${btx}/js/ext/include-ext.js"></script>
	<link rel="stylesheet" href="${btx}/css/icon.css" type="text/css" />
	<link rel="stylesheet" href="${btx}/css/c.css" type="text/css" />
	<link rel="stylesheet" href="${btx}/css/login.css" type="text/css" />
	<link rel="stylesheet" href="${btx}/css/ext-patch.css" type="text/css" />
	<!--[if IE]>
		<link rel="stylesheet" href="${btx}/css/notIe.css" type="text/css"/>
	<![endif]-->
</body>
</html>