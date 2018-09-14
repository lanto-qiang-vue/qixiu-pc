<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/pages/common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>${info.title }</title>
		<%@ include file="/WEB-INF/pages/common/icon.jsp"%>
		<%@ include file="/WEB-INF/pages/phone/common/head.jsp"%>
	</head>

	<body>
		<div class="title-header">
			<h1>
				${info.title }
			</h1>
			<div style="color:#999;font-size:12px;text-align:center">${time }  |  来源：${info.dataFrom }</div>
		</div>
		<div class="content htx">
			${info.content }
		</div>
	</body>

<script type="text/javascript">
$(function(){	
	//var maxWidth = $(window).width() - 25;
	$(".content img").each(function(){
		//console.log($(this).width() + ':' + $(window).width());
		//if($(this).width() > maxWidth){
			$(this).css('max-width','100%');
			$(this).css('height','100%');
			$(this).attr("data-preview-src","");
			$(this).attr("data-preview-group","1");
		//}
	});
	mui.previewImage();
});
</script>
</html>

