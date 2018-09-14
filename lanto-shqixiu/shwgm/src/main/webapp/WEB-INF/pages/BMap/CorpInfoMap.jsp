<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
	body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
	#panorama {width:100%; height: 100%; overflow: hidden;}
	</style>
	<script src="${ctx}/styles/js/jquery-ui-1.8.4.custom/js/jquery.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=krRiXrZUxDU0m7bCDRsn77rm"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
	<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
	<script src="${ctx}/js/BMap/CorpInfoMap.js" type="text/javascript"></script>
	<title>企业地图</title>
	<script type="text/javascript">
	 function test(){
	 	alert(1);
	 }
	</script>
</head>
<body>
	<input type="hidden" id="longitude" name="longitude" value="${model.longitude }"/>
	<input type="hidden" id="latitude" name="latitude" value="${model.latitude }"/>
	<input type="hidden" id="isview" name="isview" value="${isview }"/>
	<input type="hidden" id="corpName" name="corpName" value="${model.corpName }"/>
	<div id="allmap"></div>
	<div id="panorama" style="display:none;"></div>
	<span id="svInfoText" style="position:absolute;right:5px;top:5px;background-color:#000000;color:#ffffff;display:none;filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6; "></span>
	<div id="editText" style="position:absolute;right:100px;top:5px;background-color:#000000;color:#ffffff;display:none;filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6; "><div style="" id="editText_ch"></div></div>
	<div id="search_panel" style="position: absolute;left: 330px;bottom: 10px;overflow: hidden;">
		<div style="position: relative;float: left;border-radius: 2px 0 0 2px;background: #fff;width: 368px;">
			<input id="sole-input" class="searchbox-content-common" type="text" name="word" autocomplete="off" maxlength="256" placeholder="请输入地址搜索..." value=""
			 style="border: 0; width: 330px;   padding: 0px 0;border-left: 10px solid transparent;border-right: 27px solid transparent;
    		line-height: 20px;
    		font-size: 16px;
    		height: 38px;
    		line-height:38px;
    		color: #333;
    		position: relative;
    		border-radius: 2px 0 0 2px;"/>
		</div>
		<button id="search-button" data-title="搜索" data-tooltip="2" style="
    			background: url(http://webmap0.map.bdstatic.com/wolfman/static/common/images/new/searchbox_f175577.png) no-repeat 0 -76px #3385ff;
    			width: 57px;
    			height: 38px;
    			float: left;
    			border: 0;
    			padding: 0;
    			cursor: pointer;
    			border-radius: 0 2px 2px 0;
    			box-shadow: 1px 2px 1px rgba(0,0,0,.15);"></button>
	</div>
</body>
</html>
